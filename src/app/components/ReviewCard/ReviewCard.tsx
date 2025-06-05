import styles from './ReviewCard.module.scss'
import parse from 'html-react-parser';
import {ReviewCardProps} from "@/app/components/ReviewCard/types";

export const ReviewCard = ({reviewContent}: ReviewCardProps) => {

    return (
        <li className={styles.card}>
            {parse(reviewContent.text)}
        </li>
    )
}