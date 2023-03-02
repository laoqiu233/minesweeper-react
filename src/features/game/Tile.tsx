import { MouseEvent, useMemo } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { Coordinates, incrementTileState, makeSelectTileMineCount, revealTile, Tile as TileType, TileState } from "./gameSlice"
import styles from './Game.module.css';

type TileProps = {
    coordinates: Coordinates;
    tile: TileType;
};

type TileStateToText = {
    [index in Exclude<TileState, 'REVEALED'>]: string
}

const text: TileStateToText = {
    'HIDDEN': '⬛',
    'FLAGGED': '🚩',
    'QUESTION': '❔',
};

function Tile({coordinates, tile}: TileProps) {
    const dispatch = useAppDispatch();
    const selectTileMineCount = useMemo(() => makeSelectTileMineCount(), []);
    const tileMineCount = useAppSelector(state => selectTileMineCount(state, coordinates));

    const handleClick = (e: MouseEvent) => {
        dispatch(revealTile(coordinates));
    };

    const handleContextMenu = (e: MouseEvent) => {
        e.preventDefault();
        dispatch(incrementTileState(coordinates));
    }

    if (tile.state === 'REVEALED') {
        return <button className={styles['tile']}>{tile.isMine ? '💣' : tileMineCount}</button>
    } else {
        return <button className={styles['tile']} onClick={handleClick} onContextMenu={handleContextMenu}>{text[tile.state]}</button>
    }
}

export default Tile;