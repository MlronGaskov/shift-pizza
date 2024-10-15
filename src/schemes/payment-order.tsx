import { SelectedPizzaDetails } from "./selected-pizza-details-interface";
import { userAddress } from "./user-address";
import { userDebitCard } from "./user-debit-card";
import { userInfo } from "./user-info";

export interface paymentOrder {
    person: userInfo,
    receiverAddress: userAddress,
    debitCard: userDebitCard,
    pizzas: Array<SelectedPizzaDetails>
}