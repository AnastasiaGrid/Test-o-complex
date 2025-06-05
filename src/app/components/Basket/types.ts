import {Order, OrderItemData, ProductItemData} from "@/api/types";

export type BasketProps = {
    order: Order,
    products: ProductItemData[];
    onChangePhone: (value: string) => void,
    onOrderClick: (order: Order) => void,
}

export type OrderList = {
    id: number,
    orderItem: OrderItemData,
    productItem: ProductItemData
}[]