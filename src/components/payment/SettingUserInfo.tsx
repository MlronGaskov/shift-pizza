import { userAddress } from "../../schemes/user-address";
import { userInfo } from "../../schemes/user-info";
import { InputUserInfo } from "./InputUserInfo"
import { NavLink } from "react-router-dom";

import "../../styles/payment/settingUserInfo.css"


interface SettingUserInfoProps {
    prevPersonInfo: userInfo,
    setPerson: React.Dispatch<React.SetStateAction<userInfo>>,
    prevAddress: userAddress,
    setAddress: React.Dispatch<React.SetStateAction<userAddress>>,
    onClickNext: () => void,
}


export const SettingUserInfo: React.FC<SettingUserInfoProps> = ({ prevPersonInfo, setPerson, prevAddress, setAddress, onClickNext }) => {
    const handlePersonChange = (field: string, value: string) => {
        setPerson(prevPerson => ({ ...prevPerson, [field]: value }));
    };

    const handleAddressChange = (field: string, value: string) => {
        setAddress(prevAddress => ({ ...prevAddress, [field]: value }));
    };

    return (
        <div className="set-user-info-page">
            <h1>Введите ваши данные</h1>
            <InputUserInfo label="Фамилия" value={prevPersonInfo.lastname} onChange={(e) => handlePersonChange('lastname', e.target.value)}></InputUserInfo>
            <InputUserInfo label="Имя" value={prevPersonInfo.firstname} onChange={(e) => handlePersonChange('firstname', e.target.value)}></InputUserInfo>
            <InputUserInfo label="Отчество" value={prevPersonInfo.middlename} onChange={(e) => handlePersonChange('middlename', e.target.value)}></InputUserInfo>
            <InputUserInfo label="Номер телефона" value={prevPersonInfo.phone} onChange={(e) => handlePersonChange('phone', e.target.value)}></InputUserInfo>
            <InputUserInfo label="Улица" value={prevAddress.street} onChange={(e) => handleAddressChange('street', e.target.value)}></InputUserInfo>
            <InputUserInfo label="Дом" value={prevAddress.house} onChange={(e) => handleAddressChange('house', e.target.value)}></InputUserInfo>
            <InputUserInfo label="Квартира" value={prevAddress.apartment} onChange={(e) => handleAddressChange('apartment', e.target.value)}></InputUserInfo>
            <InputUserInfo label="Комментарий" value={prevAddress.comment} onChange={(e) => handleAddressChange('comment', e.target.value)}></InputUserInfo>
            <div className="set-user-info-page-buttons">
                <NavLink to="/cart" className="set-user-info-page-button1">
                    Назад
                </NavLink>
                <div className="set-user-info-page-button2-text" onClick={onClickNext}>Продолжить</div>
            </div>
        </div>
    );
};