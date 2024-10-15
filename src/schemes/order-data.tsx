import { userAddress } from "./user-address";
import { userInfo } from "./user-info";

export interface orderData {
    person: userInfo,
    receiverAddress: userAddress,
    status: number,
    cancellable: boolean,
    created: string,
    updated: string,
    _id: string,
}