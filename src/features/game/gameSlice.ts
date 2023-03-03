import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

export type TileState = 'HIDDEN' | 'FLAGGED' | 'QUESTION' | 'REVEALED';

export type Tile = {
    state: TileState;
    isMine: boolean;
};

export type GameState = {
    grid: Tile[][];
    
};

export type GameSettings = {
    width: number;
    height: number;
    minesCount: number;
};

type GenerateGridPayloadAction = PayloadAction<GameSettings>;

export type Coordinates = {
    x: number;
    y: number;
}

const initialState: GameState = {
    grid: [],
};

export const slice = createSlice({
    name: 'game',
    initialState,
    reducers: {
        generateGrid: (state, {payload: {width, height, minesCount}}: GenerateGridPayloadAction) => {            
            state.grid = [];
            
            let tiles = [] as Coordinates[];
            for (let y = 0; y < height; y++) {
                state.grid.push([]);
                for (let x = 0; x < width; x++) {
                    tiles.push({x, y});
                    state.grid[y].push({state: 'HIDDEN', isMine: false});
                }
            }

            for (let i = 0; i < minesCount; i++) {
                const j = Math.floor(Math.random() * tiles.length)
                const {x, y} = tiles[j];
                state.grid[y][x].isMine = true;
                tiles = [...tiles.slice(0, j), ...tiles.slice(j+1)];
            }
        },
        revealTile: (state, {payload: startingCoords}: PayloadAction<Coordinates>) => {
            const stack = [startingCoords] as Coordinates[];

            while (stack.length) {
                const {x, y} = stack.pop() as Coordinates;

                if (y < 0 || y >= state.grid.length) continue;
                if (x < 0 || x >= state.grid[0].length) continue;
                const tile = state.grid[y][x];
                if (tile.state === 'REVEALED') continue;

                const mineCount = calculateMineCount(state.grid, {x, y});
                
                state.grid[y][x].state = 'REVEALED';

                if (!tile.isMine && mineCount === 0) {
                    for (let dy = -1; dy <= 1; dy++) {
                        for (let dx = -1; dx <= 1; dx++) {
                            if (dx === 0 && dy === 0) continue;
                            stack.push({x:x+dx, y:y+dy});
                        }
                    }
                }
            }
        },
        incrementTileState: (state, {payload: {x, y}}: PayloadAction<Coordinates>) => {
            const states = ['HIDDEN', 'FLAGGED', 'QUESTION'] as TileState[];
            const currState = states.indexOf(state.grid[y][x].state);

            if (currState >= 0) {
                const newState = states[(currState + 1) % states.length];
                state.grid[y][x].state = newState;
            }
        }
    }
});

export const selectGrid = (state: RootState) => state.game.grid;

export const selectTile = (state: RootState, coords: Coordinates) => state.game.grid[coords.y][coords.x];

const calculateMineCount = (grid: Tile[][], coords: Coordinates) => {
    const {x, y} = coords;
    let count = 0;
    for (let dy = -1; dy <= 1; dy++) {
        for (let dx = -1; dx <= 1; dx++) {
            if (dy === 0 && dx === 0) continue;

            const newX = x + dx;
            const newY = y + dy;

            if (
                newY >= 0 && newY < grid.length && 
                newX >= 0 && newX < grid[0].length && 
                grid[newY][newX].isMine) count++;
        }
    }
    return count;
};

export const makeSelectTileMineCount = () => {
    return createSelector(
        [
            (state: RootState) => state.game.grid,
            (state: RootState, coords: Coordinates) => coords
        ],
        calculateMineCount
    );
};

export const selectFlagCount = createSelector(
    [
        (state: RootState) => state.game.grid
    ],
    (grid) => grid.flat().filter(x => x.state === 'FLAGGED').length
)

export const selectUnflaggedMineCount = createSelector(
    [
        (state: RootState) => state.game.grid
    ],
    (grid) => grid.flat().filter(x => x.state !== 'FLAGGED' && x.isMine).length
)

export const selectUnrevealedCount = createSelector(
    [
        (state: RootState) => state.game.grid
    ],
    (grid) => grid.flat().filter(x => x.state !== 'REVEALED') 
)

export const { generateGrid, revealTile, incrementTileState } = slice.actions;
export default slice.reducer;