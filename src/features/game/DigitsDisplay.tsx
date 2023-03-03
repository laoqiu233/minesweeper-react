import styles from './Game.module.css';

type DigitsDisplayProps = {
    digits: number;
    value: number;
};

const valueToClassName = [
    styles['zero'],
    styles['one'],
    styles['two'],
    styles['three'],
    styles['four'],
    styles['five'],
    styles['six'],
    styles['seven'],
    styles['eight'],
    styles['nine']
];

function DigitsDisplay({digits, value}: DigitsDisplayProps) {
    value = Math.min(Math.pow(10, digits) - 1, Math.max(0, value));
    let els = [];

    for (let i = 0; i < digits; i++) {
        els.push(<div key={i} className={`${styles['digits']} ${valueToClassName[value % 10]}`}></div>);
        value = Math.floor(value / 10);
    }

    els.reverse();

    return (
        <div className={styles['digits-display']}>
            {els}
        </div>
    )
}

export default DigitsDisplay;