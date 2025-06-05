import {Order} from "@/api/types";

export function getOrderFromLocalStorage(): Order {
    try {
        return JSON.parse(localStorage.getItem('order') || '');
    } catch {
        return {phone: '', cart: []};
    }
}

export function setToLocalStorage(key: string, value: Order) {
    localStorage.setItem(key, JSON.stringify(value));
}
