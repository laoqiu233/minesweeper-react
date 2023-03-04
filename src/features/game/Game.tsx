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
    const [mouseDownOnTile, setMouseDownOnTile] = useState(false);
    const [timerStarted, setTimerStarted] = useState(-1);
    const [timeToDisplay, setTimeToDisplay] = useState(0);

    function restartGame() {
        dispatch(generateGrid(settings));
        setTimeToDisplay(0);
        setTimerStarted(-1);
    }

    useEffect(restartGame, [settings]);

    useEffect(() => {
        if (timerStarted >= 0) {
            const interval = setInterval(() => {
                setTimeToDisplay(Math.floor((Date.now() - timerStarted) / 1000))
            }, 1000);

            return () => clearInterval(interval);
        }
    }, [timerStarted]);

    useEffect(() => {
        if (revealedCount > 0 && timerStarted < 0) setTimerStarted(Date.now());
    }, [revealedCount]);

    const win = unflaggedMineCount === 0 &&
                flagCount === settings.minesCount && 
                revealedCount + settings.minesCount === settings.height * settings.width;
    const gameEnded = win || bombRevealed;

    useEffect(() => {
        if (gameEnded) {
            setTimerStarted(-1);
        }
    }, [gameEnded]);

    return (
    <div className={`${styles['game']} ${styles['outer-border']}`}>
            <div className={`${styles['game-status']} ${styles['inner-border']}`}>
                <DigitsDisplay digits={3} value={settings.minesCount - flagCount}/>
                <Smiley 
                    state={gameEnded ? (win ? 'WIN' : 'LOSE') : (mouseDownOnTile ? 'SCARED' : 'NORMAL')}
                    onClick={restartGame}
                />
                <DigitsDisplay digits={3} value={timeToDisplay}/>
            </div>
            <div className={styles['inner-border']}>
                {
                    grid.map((v, y) => (
                        <div key={`row-${y}`} className={styles['row']}>
                            {
                                v.map((tile, x) => <Tile 
                                    tile={tile}
                                    coordinates={{x, y}}
                                    key={`${y}-${x}`}
                                    gameEnded={gameEnded}
                                    onMouseDown={(e) => e.button === 0 && setMouseDownOnTile(true)}
                                    onMouseUp={(e) => e.button === 0 && setMouseDownOnTile(false)}
                                />)
                            }
                        </div>
                    ))
                }
            </div>
        </div>
    );
}

export default Game;