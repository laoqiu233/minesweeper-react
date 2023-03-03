import { MouseEvent, useMemo } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { Coordinates, incrementTileState, makeSelectTileMineCount, revealTile, Tile as TileType, TileState } from "./gameSlice"
import styles from './Game.module.css';

type TileProps = {
    coordinates: Coordinates;
    tile: TileType;
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

    let className = styles['tile'];
    if (tile.isMine) className += ` ${styles['mine']}`;
    else className += ` ${mineCountToClassName[tileMineCount]}`;

    if (tile.state === 'REVEALED') {
        className += ` ${styles['revealed']}`;
        return <div className={className}></div>
    } else {
        if (tile.state === 'FLAGGED') className += ` ${styles['flagged']}`;
        if (tile.state === 'QUESTION') className += ` ${styles['question']}`;
        return <div className={className} 
                    onClick={handleClick} 
                    onContextMenu={handleContextMenu}
                />
    }
}

export default Tile;