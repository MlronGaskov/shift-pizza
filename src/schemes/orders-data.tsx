import { orderData } from "./order-data";

export interface ordersData {
    success: boolean,
    reason: string,
    orders: Array<orderData>
}