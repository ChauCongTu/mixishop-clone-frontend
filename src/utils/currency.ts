import { ProductType } from "@/modules/products/types/type";
import { getCurrentTime } from "./time";

export const formatCurrency = (amount: number) => {
    const formattedAmount = amount.toLocaleString('vi-VN', {
        style: 'currency',
        currency: 'VND',
    });

    return formattedAmount;
}

export const getProductPrice = (product: ProductType) => {
    const time = getCurrentTime();
    if (product.discount_to >= time) {
        return product.discount_price;
    }
    else {
        return product.price;
    }
}