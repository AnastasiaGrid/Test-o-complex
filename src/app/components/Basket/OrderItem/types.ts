import {OrderItemData, ProductItem} from "@/api/types";

export interface OrderItemProps {
    productItem: ProductItem;
    orderItem: OrderItemData;
}