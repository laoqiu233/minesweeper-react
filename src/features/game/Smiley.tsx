import { MouseEvent } from "react";
import styles from './Game.module.css';

type SmileyProps = {
    state: 'NORMAL' | 'SCARED' | 'WIN' | 'LOSE';
    onClick: (e: MouseEvent) => void
};

const stateToClassName: {[index in SmileyProps['state']]: string} = {
    'NORMAL': '',
    'LOSE': styles['lose'],
    'SCARED': styles['scared'],
    'WIN': styles['win']
}

function Smiley({state, onClick}: SmileyProps) {
    const className = `${styles['smiley']} ${stateToClassName[state]}`;

    return <div className={className} onClick={onClick}/>
}

export default Smiley;