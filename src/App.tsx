import React from 'react';
import Game from './features/game/Game';
import styles from './app.module.css';
import myComputerIcon from './sprites/my_computer_icon.png';
import minesweeperIcon from './sprites/minesweeper_icon.png';
import ieIcon from './sprites/ie_icon.png';

function App() {
    return (
        <div className={styles['app']}>
            <div className={styles['programs']}>
                <div className={styles['program']}>
                    <img src={myComputerIcon} alt="About page" className={styles['program-icon']}></img>
                    <p className={styles['program-name']}>About me</p>
                </div>
                <a href="https://github.com/laoqiu233" target="_blank" rel="noopener noreferrer">
                <div className={styles['program']}>
                    <img src={ieIcon} alt="About page" className={styles['program-icon']}></img>
                    <p className={styles['program-name']}>GitHub</p>
                </div>
                </a>
                <div className={styles['program']}>
                    <img src={minesweeperIcon} alt="Game" className={styles['program-icon']}></img>
                    <p className={styles['program-name']}>Minesweeper</p>
                </div>
            </div>
            
            <div className={`${styles['window']}`}>
                <div className={styles['title']}>Minesweeper</div>
                <Game settings={{height:16, width: 16, minesCount: 40}}/>
            </div>
        </div>
    );
}

export default App;
