import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { GameSettings, generateGrid, selectGrid } from "./gameSlice";
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

    useEffect(() => {
        dispatch(generateGrid(settings))
    }, []);

    return (
        <div>
            <div>
                <Smiley state='NORMAL' onClick={() => dispatch(generateGrid(settings))}/>
                <DigitsDisplay digits={3} value={15}/>
            </div>
            {
                grid.map((v, y) => (
                    <div key={`row-${y}`} className={styles['row']}>
                        {
                            v.map((tile, x) => <Tile  tile={tile} coordinates={{x, y}} key={`${y}-${x}`}/>)
                        }
                    </div>
                ))
            }
        </div>
    );
}

export default Game;