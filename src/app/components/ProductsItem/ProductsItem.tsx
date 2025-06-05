import styles from "@/app/components/ProductsItem/ProductsItem.module.scss";
import {Button} from "@/app/components/Button/Button";
import {OrderItemData} from "@/app/components/Basket/Basket";

export type ID = number

type ProductsItem = {
    description: string,
    id: ID,
    image_url: string,
    price: number,
    title: string,
}

interface ProductsItemProps {
    product: ProductsItem;
    orderItem: OrderItemData | null | undefined;
    onChangeOrderItem: (id: ID, quantity: number) => void;
    onAddOrderItem: (id: ID) => void;
    onDeleteOrderItem: (id: ID) => void;
}


export const ProductsItem = ({
                                 product,
                                 orderItem,
                                 onAddOrderItem,
                                 onChangeOrderItem,
                                 onDeleteOrderItem
                             }: ProductsItemProps) => {
    const {title, id, price, image_url, description} = product

    const handleDecreaseClick = (id: ID, quantity: number) => {
        if (quantity < 1) return onDeleteOrderItem(id)

        onChangeOrderItem(id, quantity)
    }


    return (
        <li className={styles.product_item}>
            <article className={styles.product_content}>
                <img alt={title} src={image_url} width={200} height={200}/>
                <h4>{title}</h4>
                <p className={styles.description}>{description}</p>
                <p className={styles.price}> ЦЕНА: {price}₽</p>
                <div className={styles.button_group}>
                    {orderItem && orderItem?.quantity ?
                        (<>
                            <Button text='-' className={styles.button_change}
                                    onClick={() => handleDecreaseClick(orderItem.id, orderItem.quantity - 1)}/>
                            <input className={styles.input} value={orderItem.quantity}
                                   onChange={(e) => onChangeOrderItem(orderItem.id, Number(e?.target?.value))}/>
                            <Button text='+' className={styles.button_change}
                                    onClick={() => onChangeOrderItem(orderItem.id, orderItem.quantity + 1)}/></>) :
                        <Button text='КУПИТЬ' onClick={() => onAddOrderItem(product.id)} className={styles.button_buy}/>
                    }
                </div>

            </article>
        </li>
    )
}