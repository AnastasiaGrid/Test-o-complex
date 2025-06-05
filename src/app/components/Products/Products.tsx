import styles from "@/app/page.module.scss";
import {useCallback, useEffect, useState} from "react";
import {OrderItemData, ProductItemData,} from "@/api/types";
import {ProductsProps} from "@/app/components/Products/types";
import {ProductItem} from "@/app/components/Products/ProductItem/ProductItem";

export const Products = ({
                             products,
                             onAddOrderItem,
                             onDeleteOrderItem,
                             onChangeOrderItem,
                             order,
                             productsLoading, getProducts
                         }: ProductsProps) => {
    const [page, setPage] = useState(1);
    const [canLoad, setCanLoad] = useState(false);

    useEffect(() => {
        void getProducts(page)
    }, [page]);

    const orderMapping = order.cart?.reduce<Record<number, OrderItemData>>((acc, cur) => ({...acc, [cur.id]: cur}), {})
    useEffect(() => {
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
        <ul className={styles.products}>
            {products.items.map((product: ProductItemData, index: number) => <ProductItem product={product} key={index}
                                                                                          onChangeOrderItem={onChangeOrderItem}
                                                                                          onAddOrderItem={onAddOrderItem}
                                                                                          onDeleteOrderItem={onDeleteOrderItem}
                                                                                          orderItem={orderMapping[product.id]}/>
            )}
        </ul>
    )
}