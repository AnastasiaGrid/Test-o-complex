import {ID, OrderItemData, ProductItem} from "@/api/types";

export interface ProductsItemProps {
    product: ProductItem;
    orderItem: OrderItemData | null | undefined;
    onChangeOrderItem: (id: ID, quantity: number) => void;
    onAddOrderItem: (id: ID) => void;
    onDeleteOrderItem: (id: ID) => void;
}
