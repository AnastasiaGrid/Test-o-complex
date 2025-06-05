'use client'
import styles from "./page.module.scss";
import {ReviewCard} from "@/app/components/ReviewCard/ReviewCard";
import {Basket, Order} from "@/app/components/Basket/Basket";
import {useEffect, useState} from "react";
import {ID} from "@/app/components/Products/ProductsItem/ProductsItem";
import {Preloader} from "@/app/components/Preloader/Preloader";
import {Products} from "@/app/components/Products/Products";
import {getProductsApi, getReviewsApi} from "@/api/api";
import {initialProductsData, PAGE_SIZE} from "@/app/constants";
import {getOrderFromLocalStorage} from "@/utils/utils";
import {ProductsData, ReviewCardData} from "@/api/types";


export default function Home() {
    const [reviewCards, setReviewCards] = useState<ReviewCardData[]>([]);
    const [products, setProducts] = useState<ProductsData>(initialProductsData);
    const [order, setOrder] = useState<Order>(getOrderFromLocalStorage());
    const [productsLoading, setProductsLoading] = useState(false);


    const getProducts = async (page: number) => {
        try {
            setProductsLoading(true);
            const data = await getProductsApi(page, PAGE_SIZE)
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
        getReviewsApi().then((data: ReviewCardData[]) => {
            setReviewCards(data)
        })
            .catch(err => console.log(err));

    }, []);

    const onChangeOrderItem = (id: ID, quantity: number) => {
        setOrder(prev => {
            const newCart = prev.cart.map(item => {
                if (item.id === id) {
                    return {...item, quantity}
                }
                return item
            })
            if (quantity === 0) {
                localStorage.setItem('order', JSON.stringify({
                    ...prev,
                    cart: prev.cart.filter(item => item.id !== id)
                }));
                return {...prev, cart: prev.cart.filter(item => item.id !== id)}
            }
            localStorage.setItem('order', JSON.stringify({...prev, cart: newCart}));
            return {...prev, cart: newCart}
        })

    }

    const onAddOrderItem = (id: ID) => {
        setOrder(prev => {
            localStorage.setItem('order', JSON.stringify({...prev, cart: [...prev.cart, {id, quantity: 1}]}));
            return {...prev, cart: [...prev.cart, {id, quantity: 1}]}
        })


    }

    const onDeleteOrderItem = (id: ID) => {
        setOrder(prev => {
            localStorage.setItem('order', JSON.stringify({...prev, cart: prev.cart.filter(item => item.id !== id)}));
            return {...prev, cart: prev.cart.filter(item => item.id !== id)}
        })

    }

    const onChangePhone = (value: string) => {
        setOrder(prev => {

            return {...prev, phone: value}
        })
        localStorage.setItem('order', JSON.stringify(order));

    }


    return (
        <div className={styles.page}>
            <h1 className={styles.title}>ТЕСТОВОЕ ЗАДАНИЕ</h1>
            {reviewCards.length === 0 ? <Preloader/> : (<ul className={styles.reviewCards}>
                {reviewCards.map((reviewCard: ReviewCardData) => <ReviewCard reviewContent={reviewCard}
                                                                             key={reviewCard.id}/>)}
            </ul>)}
            <><Basket onChangePhone={onChangePhone} order={order}
                      products={products.items}/>
                <Products products={products} onChangeOrderItem={onChangeOrderItem} onAddOrderItem={onAddOrderItem}
                          onDeleteOrderItem={onDeleteOrderItem} order={order} productsLoading={productsLoading}
                          getProducts={getProducts}/>
            </>

            {productsLoading && <Preloader/>}

        </div>
    );
}
