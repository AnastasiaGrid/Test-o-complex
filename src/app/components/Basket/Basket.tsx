import styles from './Basket.module.scss'
import {Button} from "@/app/components/Button/Button";
import {OrderItem} from "@/app/components/Basket/OrderItem/OrderItem";
import {InputMask} from "@react-input/mask";
import {ProductItem} from "@/app/page";
import {ID} from "@/app/components/Products/ProductsItem/ProductsItem";
import {useState} from "react";

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
    products: ProductItem[];
    onChangePhone: (value: string) => void,
}
export const Basket = ({order, onChangePhone, products}: BasketProps) => {
    const [isModalOpen, setModalOpen] = useState(false);
    const handleOrderClick = () => {
        fetch('http://o-complex.com:1337/order', {
            method: "POST",
            body: JSON.stringify({...order, phone: order.phone.replace(/[^0-9]/g, '')}),
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(res => {
                if (res.status === 422) {
                    alert('Введите номер телефона полностью')
                }
                if (res.status === 200) {
                    alert('Заказ успешно оформлен!')
                    localStorage.clear();
                }

            })
            .catch(err => {
                console.log(err)
            });
    }

    const productsMapping = products.reduce<Record<ID, ProductItem>>((acc, cur) => ({...acc, [cur.id]: cur}), {})

    const orderList = order?.cart?.map((orderItem: OrderItemData) => ({
        id: orderItem.id,
        orderItem,
        productItem: productsMapping[orderItem.id]
    }))

    return (
        <div className={styles.basket}>
            <h2 className={styles.title}>
                {BASKET_TEXT.TITLE}
            </h2>
            <ul className={styles.orderItems}>
                {orderList.map((item) =>
                    <OrderItem key={item.id} orderItem={item.orderItem} productItem={item.productItem}/>)}
            </ul>
            <div className={styles.total}>
                <p> Сумма заказа </p>
                <p>{orderList.reduce((acc, cur) => (acc + (cur?.productItem?.price * cur?.orderItem?.quantity)), 0)} ₽
                </p>
            </div>

            <div className={styles.button_wrapper}>
                <InputMask mask="+7 (___) ___-__-__" replacement={{_: /\d/}} showMask={true} separate={false}
                           className={styles.mask_input_number}
                           onChange={(e) => onChangePhone(e.target.value)} defaultValue={order.phone}/>
                <Button text={BASKET_TEXT.BUTTON_TEXT} className={styles.button} onClick={handleOrderClick}/>
            </div>
        </div>
    )
}