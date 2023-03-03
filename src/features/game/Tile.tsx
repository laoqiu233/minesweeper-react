import { MouseEvent, useEffect, useMemo, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { Coordinates, incrementTileState, makeSelectTileMineCount, revealTile, Tile as TileType, TileState } from "./gameSlice"
import styles from './Game.module.css';

type TileProps = {
    coordinates: Coordinates;
    tile: TileType;
    gameEnded: boolean;
    onMouseDown: (e: MouseEvent) => void,
    onMouseUp: (e: MouseEvent) => void
};

const mineCountToClassName = [
    styles['empty'],
    styles['one'],
    styles['two'],
    styles['three'],
    styles['four'],
    styles['five'],
    styles['six'],
    styles['seven'],
    styles['eight']
];

function Tile({coordinates, tile, gameEnded, onMouseDown, onMouseUp}: TileProps) {
    const dispatch = useAppDispatch();
    const selectTileMineCount = useMemo(() => makeSelectTileMineCount(), []);
    const tileMineCount = useAppSelector(state => selectTileMineCount(state, coordinates));
    const [causedGameEnd, setCausedGameEnd] = useState(false);

    useEffect(() => {
        if (!gameEnded) setCausedGameEnd(false);
    }, [gameEnded]);

    const handleClick = (e: MouseEvent) => {
        dispatch(revealTile(coordinates));
        if (tile.isMine) setCausedGameEnd(true);
    };

    const handleContextMenu = (e: MouseEvent) => {
        e.preventDefault();
        dispatch(incrementTileState(coordinates));
    }

    let className = styles['tile'];
    if (tile.isMine) className += ` ${styles['mine']}`;
    else className += ` ${mineCountToClassName[tileMineCount]}`;

    if (tile.state === 'REVEALED') {
        className += ` ${styles['revealed']}`;
        if (causedGameEnd) className += ` ${styles['caused-game-end']}`;
        return <div className={className}></div>
    } else {
        if (tile.state === 'FLAGGED') className += ` ${styles['flagged']}`;
        if (tile.state === 'QUESTION') className += ` ${styles['question']}`;
        if (gameEnded && tile.isMine) className += ` ${styles['revealed']}`;
        return <div className={className} 
                    onMouseDown={onMouseDown}
                    onMouseUp={onMouseUp}
                    onClick={(e) => gameEnded || handleClick(e)} 
                    onContextMenu={(e) => gameEnded || handleContextMenu(e)}
                />
    }
}

export default Tile;