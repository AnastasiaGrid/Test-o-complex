export type ReviewCardData = {
    id: number;
    text: string;
}
export type ID = number

export type ProductItem = {
    description: string,
    id: number,
    image_url: string,
    price: number,
    title: string,
}

export interface ProductsData {
    amount: number;
    items: ProductItem[]
    page: number;
    total: number;
}

export interface Order {
    phone: string,
    cart: OrderItemData[]
}

export type OrderItemData = {
    id: number,
    quantity: number
}