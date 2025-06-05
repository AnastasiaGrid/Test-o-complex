import styles from './Button.module.scss'
import clsx from "clsx";

type ButtonProps = {
    text: string;
    className?: string;
    onClick?: () => void;
}

export const Button = ({text, onClick, className}: ButtonProps) => {
    return (
        <button type='button' className={clsx(styles.button, className)} onClick={onClick}>{text}</button>
    )
}