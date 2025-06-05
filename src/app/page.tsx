'use client'
import styles from "./page.module.scss";
import {ReviewCard} from "@/app/components/ReviewCard/ReviewCard";
import {Basket, Order, OrderItemData} from "@/app/components/Basket/Basket";
import {useCallback, useEffect, useState} from "react";
import {ID, ProductsItem} from "@/app/components/ProductsItem/ProductsItem";
import {Preloader} from "@/app/components/Preloader/Preloader";

type ReviewCardData = {
    id: number;
    text: string;
}

export type ProductsInOrder = {
    id: number,
    quantity: number,
    title: string,
    price: number,
}

export type ProductsItem = {
    description: string,
    id: number,
    image_url: string,
    price: number,
    title: string,
}

interface ProductsData {
    amount: number;
    items: ProductsItem[]
    page: number;
    total: number;
}

const PAGE_SIZE = 10

const queryProducts = (page: number, size: number): Promise<ProductsData> => fetch(`http://o-complex.com:1337/products?page=${page}&page_size=${size}`, {
    method: "GET",
    headers: {

        'Content-Type': 'application/json',
    },
})
    .then(res => res.json())


export default function Home() {
    const [reviewCards, setReviewCards] = useState<ReviewCardData[]>([]);
    const [products, setProducts] = useState<ProductsData>({items: [], page: 1, total: 0, amount: 0});
    const [order, setOrder] = useState<Order>({phone: '', cart: []});
    const [page, setPage] = useState(1);
    const [productsLoading, setProductsLoading] = useState(false);
    const [canLoad, setCanLoad] = useState(false);


    const getProducts = async (page: number) => {
        try {
            setProductsLoading(true);
            const data = await queryProducts(page, PAGE_SIZE)
            if (data) {
                setProducts(prev => ({...data, items: [...prev.items, ...data.items]}))
            }
        } catch (e) {
            console.log(e)
        } finally {
            setProductsLoading(false);
        }
    }

    useEffect(() => {
        void getProducts(page)
    }, [page]);

    useEffect(() => {


        fetch('http://o-complex.com:1337/reviews', {
            method: "GET",
            headers: {

                'Content-Type': 'application/json',
            },
        })
            .then(res => res.json())
            .then((data: ReviewCardData[]) => {
                setReviewCards(data)
            })
            .catch(err => console.log(err));

    }, []);

    const orderMapping = order.cart.reduce<Record<number, OrderItemData>>((acc, cur) => ({...acc, [cur.id]: cur}), {})

    const onChangeOrderItem = (id: ID, quantity: number) => {
        setOrder(prev => {
            const newCart = prev.cart.map(item => {
                if (item.id === id) {
                    return {...item, quantity}
                }

                return item
            })
            return {...prev, cart: newCart}
        })
    }

    const onAddOrderItem = (id: ID) => {
        setOrder(prev => {

            return {...prev, cart: [...prev.cart, {id, quantity: 1}]}
        })
    }

    const onDeleteOrderItem = (id: ID) => {
        setOrder(prev => {

            return {...prev, cart: prev.cart.filter(item => item.id !== id)}
        })
    }

    const onChangePhone = (value: string) => {
        setOrder(prev => {

            return {...prev, phone: value}
        })
    }

    useEffect(() => {
        console.log(page, products.total)
        if (canLoad && !productsLoading && page <= products.total) {
            setPage(prev => {
                if (products.total === page) return prev
                return prev + 1
            })
        }
    }, [canLoad, page, products.total, productsLoading]);

    const scrollHandler = useCallback((e: Event): void => {
        const target = e.target as Document

        if (target.documentElement.scrollHeight - target.documentElement.scrollTop - window.innerHeight < 50) {
            setCanLoad(true)
        } else {
            setCanLoad(false)
        }
    }, [])

    useEffect(() => {
        document.addEventListener('scroll', (e) => scrollHandler(e))

        return () => {
            document.removeEventListener('scroll', scrollHandler)
        }
    }, [scrollHandler])


    return (
        <div className={styles.page}>
            <h1 className={styles.title}>ТЕСТОВОЕ ЗАДАНИЕ</h1>
            {reviewCards.length === 0 ? <Preloader/> : (<ul className={styles.reviewCards}>
                {reviewCards.map((reviewCard: ReviewCardData) => <ReviewCard reviewContent={reviewCard}
                                                                             key={reviewCard.id}/>)}
            </ul>)}
            <><Basket onChangePhone={onChangePhone} order={order}
                      products={products.items}/>
                <ul className={styles.products}>
                    {products.items.map((product: ProductsItem) => <ProductsItem product={product} key={product.id}
                                                                                 onChangeOrderItem={onChangeOrderItem}
                                                                                 onAddOrderItem={onAddOrderItem}
                                                                                 onDeleteOrderItem={onDeleteOrderItem}
                                                                                 orderItem={orderMapping[product.id]}/>
                    )}
                </ul>
            </>

            {productsLoading && <Preloader/>}

        </div>
    );
}
