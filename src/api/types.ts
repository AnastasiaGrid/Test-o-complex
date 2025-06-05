export type ReviewCardData = {
    id: number;
    text: string;
}
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