import {Order, ProductsData, ReviewCardData} from "@/api/types";

export const getProductsApi = (page: number, size: number): Promise<ProductsData> => fetch(`http://o-complex.com:1337/products?page=${page}&page_size=${size}`, {
    method: "GET",
    headers: {
        'Content-Type': 'application/json',
    },
})
    .then(res => res.json())


export const getReviewsApi = (): Promise<ReviewCardData[]> => fetch('http://o-complex.com:1337/reviews', {
    method: "GET",
    headers: {

        'Content-Type': 'application/json',
    },
})
    .then(res => res.json())

export const postOrderApi = (order: Order) =>
    fetch('http://o-complex.com:1337/order', {
        method: "POST",
        body: JSON.stringify({...order, phone: order.phone.replace(/[^0-9]/g, '')}),
        headers: {
            'Content-Type': 'application/json',
        },
    })
