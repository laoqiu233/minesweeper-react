import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { GameSettings, generateGrid, selectBombRevealed, selectFlagCount, selectGrid, selectRevealedCount, selectUnflaggedMineCount } from "./gameSlice";
import styles from './Game.module.css';
import Tile from "./Tile";
import DigitsDisplay from "./DigitsDisplay";
import Smiley from "./Smiley";

type GameProps = {
    settings: GameSettings
};

function Game({settings} : GameProps) {
    const dispatch = useAppDispatch();
    const grid = useAppSelector(selectGrid);
    const revealedCount = useAppSelector(selectRevealedCount);
    const unflaggedMineCount = useAppSelector(selectUnflaggedMineCount);
    const flagCount = useAppSelector(selectFlagCount);
    const bombRevealed = useAppSelector(selectBombRevealed);

    useEffect(() => {
        dispatch(generateGrid(settings))
    }, []);

    const win = unflaggedMineCount === 0 &&
                flagCount === settings.minesCount && 
                revealedCount + settings.minesCount === settings.height * settings.width;
    const gameEnded = win || bombRevealed;

    return (
        <div>
            <div>
                <Smiley 
                    state={gameEnded ? 'LOSE' : 'NORMAL'}
                    onClick={() => dispatch(generateGrid(settings))}
                />
                <DigitsDisplay digits={3} value={settings.minesCount - flagCount}/>
            </div>
            {
                grid.map((v, y) => (
                    <div key={`row-${y}`} className={styles['row']}>
                        {
                            v.map((tile, x) => <Tile tile={tile} coordinates={{x, y}} key={`${y}-${x}`} gameEnded={gameEnded}/>)
                        }
                    </div>
                ))
            }
        </div>
    );
}

export default Game;