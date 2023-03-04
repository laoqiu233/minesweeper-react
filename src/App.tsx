import Game from './features/game/Game';
import styles from './app.module.css';
import myComputerIcon from './sprites/my_computer_icon.png';
import minesweeperIcon from './sprites/minesweeper_icon.png';
import ieIcon from './sprites/ie_icon.png';
import { Link, Outlet } from 'react-router-dom';

function App() {
    return (
        <div className={styles['app']}>
            <div className={styles['programs']}>
                <Link to="/about">
                    <div className={styles['program']}>
                        <img src={myComputerIcon} alt="About page" className={styles['program-icon']}></img>
                        <p className={styles['program-name']}>About me</p>
                    </div>
                </Link>
                <a href="https://github.com/laoqiu233" target="_blank" rel="noopener noreferrer">
                    <div className={styles['program']}>
                        <img src={ieIcon} alt="Github Link" className={styles['program-icon']}></img>
                        <p className={styles['program-name']}>GitHub</p>
                    </div>
                </a>
                <Link to="/minesweeper">
                    <div className={styles['program']}>
                        <img src={minesweeperIcon} alt="Game" className={styles['program-icon']}></img>
                        <p className={styles['program-name']}>Minesweeper</p>
                    </div>
                </Link>
            </div>
        
            <Outlet />
        </div>
    );
}

export default App;
