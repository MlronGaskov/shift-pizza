import { Header } from "../../components/header/Header"; 
import { useAuthTokenInterface } from "../../hooks/useAuthToken"; 
import { useCartInterface } from "../../hooks/useCart"; 
import { SettingUserInfo } from "../../components/payment/SettingUserInfo"; 
import { fetchSession, payForCart } from "../api/requests"; 
import { userSession } from "../../schemes/user-session"; 
import { useMutation, useQuery } from "react-query"; 
import { useState, useEffect } from "react"; 
import { userInfo } from "../../schemes/user-info"; 
import { userAddress } from "../../schemes/user-address"; 
import { userDebitCard } from "../../schemes/user-debit-card"; 
import { SettingDebitCard } from "../../components/payment/SettingDebitCard";
import { paymentOrder } from "../../schemes/payment-order";
import { NavLink } from "react-router-dom";
import { OrderPopUp } from "../../components/payment/OrderPopUp";

 
export const PaymentRoute: React.FC<{ authorization: useAuthTokenInterface, cart: useCartInterface }> = ({ authorization, cart }) => { 
    const [personInfo, setPersonInfo] = useState<userInfo>({ firstname: "", lastname: "", middlename: "", phone: "" }); 
    const [personAddress, setPersonAddress] = useState<userAddress>({ street: "", house: "", apartment: "", comment: "" }); 
    const [debitCard, setDebitCard] = useState<userDebitCard>({ cvv: "", pan: "", expireDate: "" });
    const [stage, setStage] = useState(1);
 
    const { data, isLoading, isError } = useQuery<{ success: boolean, reason: string, user: userSession }>( 
        "sessionData", 
        () => fetchSession(authorization.token), 
        { 
            enabled: authorization.token !== ""
        }
    );

    const createOtpMutation = useMutation((paymentOrderData: paymentOrder) => payForCart(paymentOrderData), {
        onSuccess: (data) => {console.log(data); setStage(3);},
        onError: () => alert("error")
    })
 
    useEffect(() => { 
        if (data?.user) { 
            setPersonInfo({ 
                firstname: data.user.firstname || "", 
                lastname: data.user.lastname || "", 
                middlename: data.user.middlename || "", 
                phone: data.user.phone || "", 
            }); 
        } 
    }, [data]); 
 
    if (isLoading) return <div>Loading...</div>; 
    if (isError) return <div>Error fetching data</div>; 
 
    const stage1 =
        <div> 
            <Header authorization={authorization}></Header>
            <SettingUserInfo  
                prevPersonInfo={personInfo} 
                setPerson={setPersonInfo} 
                prevAddress={personAddress}
                setAddress={setPersonAddress}
                onClickNext={() => setStage(2)}
            /> 
        </div> 
    
    const stage2 =
        <div> 
            {stage === 3 ? <OrderPopUp cart={cart} personAddress={personAddress}/> : null}
            {stage === 3 && <NavLink to="/"><div className="dark-overlay" onClick={() => cart.setCart([])}/></NavLink>}
            <Header authorization={authorization}></Header>
            <SettingDebitCard  
                prevCardInfo={debitCard} 
                setCardInfo={setDebitCard}
                onBack={() => setStage(1)}
                onPay={() => {
                    const paymentOrderData: paymentOrder = {
                        person: personInfo,
                        receiverAddress: {...personAddress, 'comment': JSON.stringify({info: cart.getPizzas(), comment: personAddress.comment})},
                        debitCard: debitCard,
                        pizzas: cart.getPizzas(),
                    }

                    console.log(paymentOrderData);

                    createOtpMutation.mutate(paymentOrderData);
                }}
            /> 
        </div>
    
    return stage == 1 ? stage1 : stage2
};