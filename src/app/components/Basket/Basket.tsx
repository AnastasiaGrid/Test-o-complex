import styles from './Basket.module.scss'
import {Button} from "@/app/components/Button/Button";
import {OrderItem} from "@/app/components/Basket/OrderItem/OrderItem";
import {InputMask} from "@react-input/mask";
import {ProductsItem} from "@/app/page";
import {ID} from "@/app/components/ProductsItem/ProductsItem";

const BASKET_TEXT = {
    TITLE: 'Добавленные товары',
    BUTTON_TEXT: 'ЗАКАЗАТЬ'
}


export interface Order {
    phone: string,
    cart: OrderItemData[]
}

export type OrderItemData = {
    id: number,
    quantity: number
}

type BasketProps = {
    order: Order,
    products: ProductsItem[];
    onChangePhone: (value: string) => void,
}
export const Basket = ({order, onChangePhone, products}: BasketProps) => {

    const handleOrderClick = (formData: Order) => {
        fetch('http://o-complex.com:1337/order', {
            method: "POST",
            body: formData,
            headers: {

                'Content-Type': 'application/json',
            },
        })
            .then(res => res.json())
            .catch(err => console.log(err));
    }

    const productsMapping = products.reduce<Record<ID, ProductsItem>>((acc, cur) => ({...acc, [cur.id]: cur}), {})

    const orderList = order.cart.map((orderItem: OrderItemData) => ({
        id: orderItem.id,
        orderItem,
        productItem: productsMapping[orderItem.id]
    }))


    return (
        <form className={styles.basket} onSubmit={handleOrderClick}>
            <h2 className={styles.title}>
                {BASKET_TEXT.TITLE}
            </h2>
            <ol className={styles.orderItems}>
                {orderList.map((item) =>
                    <OrderItem key={item.id} orderItem={item.orderItem} productItem={item.productItem}/>)}
            </ol>
            TOTAL {orderList.reduce((acc, cur) => (acc + (cur.productItem.price * cur.orderItem.quantity)), 0)}
            <div className={styles.button_wrapper}>
                <InputMask mask="+7 (___) ___-__-__" replacement={{_: /\d/}} showMask={true}
                           className={styles.mask_input_number}
                           onChange={(e) => onChangePhone(e.target.value)}/>
                <Button text={BASKET_TEXT.BUTTON_TEXT} className={styles.button}/>
            </div>
        </form>
    )
}