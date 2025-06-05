import styles from "./OrderItem.module.scss";
import {OrderItemProps} from "@/app/components/Basket/OrderItem/types";

export const OrderItem = ({productItem, orderItem}: OrderItemProps) => {
    return (
        <>
            <li className={styles.orderItem}>
                <p className={styles.name}>{productItem?.title}</p>
                <p className={styles.quantity}>{orderItem?.quantity}</p>
                <p className={styles.price}>{productItem?.price * orderItem?.quantity} ₽</p>
            </li>
        </>

    )
}
