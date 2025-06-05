import {Order, ProductsData} from "@/api/types";
import {ID} from "@/app/components/Products/ProductItem/ProductItem";

export interface ProductsProps {
    products: ProductsData;
    onChangeOrderItem: (id: ID, quantity: number) => void;
    onAddOrderItem: (id: ID) => void;
    onDeleteOrderItem: (id: ID) => void;
    order: Order;
    productsLoading: boolean;
    getProducts: (page: number) => void;
}