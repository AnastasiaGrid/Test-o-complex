import {ProductsItem} from "@/app/page";
import styles from "./OrderItem.module.scss";
import {OrderItemData} from "@/app/components/Basket/Basket";

interface OrderItemProps {
    productItem: ProductsItem;
    orderItem: OrderItemData;
}

export const OrderItem = ({productItem, orderItem}: OrderItemProps) => {
    return (
        <>
            <li className={styles.orderItem}>
                <p className={styles.name}>{productItem.title}</p>
                <p className={styles.quantity}>{orderItem.quantity}</p>
                <p className={styles.price}>{productItem.price * orderItem.quantity}</p>
            </li>
            {/*<li className={styles.orderItem}>*/}
            {/*    <p>dede</p>*/}
            {/*    <p>x3737</p>*/}
            {/*    <p>336378</p>*/}
            {/*</li>*/}
            {/*<li className={styles.orderItem}>*/}
            {/*    <p>dede</p>*/}
            {/*    <p>x3737</p>*/}
            {/*    <p>336378</p>*/}
            {/*</li>*/}
            {/*<li className={styles.orderItem}>*/}
            {/*    <p>dede</p>*/}
            {/*    <p>x3737</p>*/}
            {/*    <p>336378</p>*/}
            {/*</li>*/}
            {/*<li className={styles.orderItem}>*/}
            {/*    <p>dede</p>*/}
            {/*    <p>x3737</p>*/}
            {/*    <p>336378</p>*/}
            {/*</li>*/}
            {/*<li className={styles.orderItem}>*/}
            {/*    <p>dede</p>*/}
            {/*    <p>x3737</p>*/}
            {/*    <p>336378</p>*/}
            {/*</li>*/}
            {/*<li className={styles.orderItem}>*/}
            {/*    <p>dede</p>*/}
            {/*    <p>x3737</p>*/}
            {/*    <p>336378</p>*/}
            {/*</li>*/}
            {/*<li className={styles.orderItem}>*/}
            {/*    <p>dede</p>*/}
            {/*    <p>x3737</p>*/}
            {/*    <p>336378</p>*/}
            {/*</li>*/}
            {/*<li className={styles.orderItem}>*/}
            {/*    <p>dede</p>*/}
            {/*    <p>x3737</p>*/}
            {/*    <p>336378</p>*/}
            {/*</li>*/}
            {/*<li className={styles.orderItem}>*/}
            {/*    <p>dede</p>*/}
            {/*    <p>x3737</p>*/}
            {/*    <p>336378</p>*/}
            {/*</li>*/}
            {/*<li className={styles.orderItem}>*/}
            {/*    <p>dede</p>*/}
            {/*    <p>x3737</p>*/}
            {/*    <p>336378</p>*/}
            {/*</li>*/}
            {/*<li className={styles.orderItem}>*/}
            {/*    <p>dede</p>*/}
            {/*    <p>x3737</p>*/}
            {/*    <p>336378</p>*/}
            {/*</li>*/}
            {/*<li className={styles.orderItem}>*/}
            {/*    <p>dede</p>*/}
            {/*    <p>x3737</p>*/}
            {/*    <p>336378</p>*/}
            {/*</li>*/}
            {/*<li className={styles.orderItem}>*/}
            {/*    <p>dede</p>*/}
            {/*    <p>x3737</p>*/}
            {/*    <p>336378</p>*/}
            {/*</li>*/}
            {/*<li className={styles.orderItem}>*/}
            {/*    <p>dede</p>*/}
            {/*    <p>x3737</p>*/}
            {/*    <p>336378</p>*/}
            {/*</li>*/}
            {/*<li className={styles.orderItem}>*/}
            {/*    <p>dede</p>*/}
            {/*    <p>x3737</p>*/}
            {/*    <p>336378</p>*/}
            {/*</li>*/}
        </>

    )
}
