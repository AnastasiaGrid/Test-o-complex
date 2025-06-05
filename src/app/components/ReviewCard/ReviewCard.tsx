import styles from './ReviewCard.module.scss'
import parse from 'html-react-parser';

type ReviewCardData = {
    id: number;
    text: string;
}

type ReviewCardProps = {
    reviewContent: ReviewCardData;
}

export const ReviewCard =({reviewContent}: ReviewCardProps) => {

    return(
        <li className={styles.card}>
            {parse(reviewContent.text)}
        </li>
    )
}