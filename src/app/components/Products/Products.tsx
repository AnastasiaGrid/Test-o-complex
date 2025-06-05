import styles from "@/app/page.module.scss";
import {ProductItem, ProductsData} from "@/app/page";
import {ID, ProductsItem} from "@/app/components/Products/ProductsItem/ProductsItem";
import {Order, OrderItemData} from "@/app/components/Basket/Basket";

type ProductsProps = {
    products: ProductsData;
    onChangeOrderItem: (id: ID, quantity: number) => void;
    onAddOrderItem: (id: ID) => void;
    onDeleteOrderItem: (id: ID) => void;
    order: Order;
}

export const Products = ({products, onAddOrderItem, onDeleteOrderItem, onChangeOrderItem, order}: ProductsProps) => {

    const orderMapping = order.cart.reduce<Record<number, OrderItemData>>((acc, cur) => ({...acc, [cur.id]: cur}), {})

    return (
        <ul className={styles.products}>
            {products.items.map((product: ProductItem, index: number) => <ProductsItem product={product} key={index}
                                                                                       onChangeOrderItem={onChangeOrderItem}
                                                                                       onAddOrderItem={onAddOrderItem}
                                                                                       onDeleteOrderItem={onDeleteOrderItem}
                                                                                       orderItem={orderMapping[product.id]}/>
            )}
        </ul>
    )
}