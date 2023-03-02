import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { GameSettings, generateGrid, selectGrid } from "./gameSlice";
import Tile from "./Tile";

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
            {
                grid.map((v, y) => (
                    <div key={`row-${y}`}>
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