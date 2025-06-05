import {Order} from "@/app/components/Basket/Basket";

export function getOrderFromLocalStorage(): Order {
    try {
        return JSON.parse(localStorage.getItem('order') || '');
    } catch {
        return {phone: '', cart: []};
    }
}

export function setToLocalStorage(key: string, value: string) {
    localStorage.setItem(key, value);
}
