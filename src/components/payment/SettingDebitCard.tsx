import { userDebitCard } from "../../schemes/user-debit-card";
import { InputPan } from "./InputPan";
import { InputCVV } from "./InputCVV";
import { InputDate } from "./InputDate";

import "../../styles/payment/settingDebitCard.css"

interface SetCardProps {
    prevCardInfo: userDebitCard,
    setCardInfo: React.Dispatch<React.SetStateAction<userDebitCard>>,
    onPay: () => void,
    onBack: () => void,
}


export const SettingDebitCard: React.FC<SetCardProps> = ({ prevCardInfo, setCardInfo, onPay, onBack}) => {
    const handleChange = (field: string, value: string) => {
        setCardInfo(prevCardInfo => ({ ...prevCardInfo, [field]: value }));
    };

    return (
        <div className="set-card-info-page">
            <h1>Введите данные карты для оплаты</h1>
            <div className="set-card-info-page-card">
                <InputPan label="Номер*" value={prevCardInfo.pan} onChange={(e) => handleChange('pan', e.target.value)}></InputPan>
                <div className="set-card-frame">
                    <InputDate label="Срок*" value={prevCardInfo.expireDate} onChange={(e) => handleChange('expireDate', e.target.value)}></InputDate>
                    <InputCVV label="cvv*" value={prevCardInfo.cvv} onChange={(e) => handleChange('cvv', e.target.value)}></InputCVV>
                </div>
            </div>
            <div className="set-card-info-page-buttons">
                <button className="back-button" onClick={onBack}>
                    Назад
                </button>
                <button className="pay-button" onClick={onPay}>
                    Оплатить
                </button>
            </div>
        </div>
    );
};