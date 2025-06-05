import {ID, OrderItemData, ProductItemData} from "@/api/types";

export interface ProductsItemProps {
    product: ProductItemData;
    orderItem: OrderItemData | null | undefined;
    onChangeOrderItem: (id: ID, quantity: number) => void;
    onAddOrderItem: (id: ID) => void;
    onDeleteOrderItem: (id: ID) => void;
}
