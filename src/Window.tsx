import { Link } from 'react-router-dom';
import styles from './app.module.css';

type WindowProps = {
    title: string;
    children: React.ReactNode;
};

function Window({title, children}: WindowProps) {
    return (
        <div className={`${styles['window']}`}>
            <div className={styles['title']}>
                {title}
                <Link to="/">
                    <div className={styles['close-window-button']}/>
                </Link>
            </div>
            {children}
        </div>
    )
}

export default Window;