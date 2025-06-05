import {Order, OrderItemData, ProductItem} from "@/api/types";

export type BasketProps = {
    order: Order,
    products: ProductItem[];
    onChangePhone: (value: string) => void,
    onOrderClick: (order: Order) => void,
}

export type OrderList = {
    id: number,
    orderItem: OrderItemData,
    productItem: ProductItem
}[]