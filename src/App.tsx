import React from 'react';
import Game from './features/game/Game';
import styles from './app.module.css';

function App() {
    return (
        <div className={styles['app']}>
            <div className={styles['game']}>
                <Game settings={{height:16, width: 16, minesCount: 40}}/>
            </div>
        </div>
    );
}

export default App;
