import { Header } from "../../components/header/Header";
import { useAuthTokenInterface } from "../../hooks/useAuthToken";
import { useState } from "react";
import { useQuery } from "react-query";
import { fetchSession, patchProfile } from "../api/requests";
import { useEffect } from "react";
import { InputUserInfo } from "../../components/payment/InputUserInfo";
import { useMutation } from "react-query";
import { patchProfileScheme } from "../../schemes/patch-profile";
import { userSession } from "../../schemes/user-session";

import "../../styles/profile/profile.css"


export const ProfileRoute: React.FC<{authorization: useAuthTokenInterface}> = ({authorization}) => {
  const [personInfo, setPersonInfo] = useState<patchProfileScheme>({ profile: {firstname: "", lastname: "", middlename: "", email: "", city: "" }, phone: ""}); 
  
  const { data, isLoading, isError } = useQuery<{ success: boolean, reason: string, user: userSession }>( 
    "sessionData", 
    () => fetchSession(authorization.token), 
    { 
        enabled: authorization.token !== ""
    } 
  );

  const handlePersonChange = (field: string, value: string) => {
    if (field === "phone")
      setPersonInfo(prevPerson => ({ ...prevPerson, [field]: value }));
    else {
      setPersonInfo(prevPerson => ({"phone": prevPerson.phone, "profile": {...prevPerson.profile, [field]: value}}));
    }
  };

  useEffect(() => { 
    if (data?.user) { 
        setPersonInfo({
          profile: {
            firstname: data.user.firstname || "", 
            lastname: data.user.lastname || "", 
            middlename: data.user.middlename || "", 
            email: data.user.email || "",
            city: data.user.city || "",
          },
          phone: data.user.phone || "", 
        }); 
    } 
  }, [data]); 

  const updateProfileInfo = useMutation((profileInfo: patchProfileScheme) => patchProfile(authorization.token, profileInfo), {
    onSuccess: () => alert("Вы успешно обновили данные профиля"),
    onError: () => alert("error")
  })

  return (
    <div>
      <Header authorization={authorization}></Header>
      <div className="profile-content">
        <h1>Профиль</h1>
        <InputUserInfo label="Фамилия" value={personInfo.profile.lastname!} onChange={(e) => handlePersonChange('lastname', e.target.value)}></InputUserInfo>
        <InputUserInfo label="Имя" value={personInfo.profile.firstname!} onChange={(e) => handlePersonChange('firstname', e.target.value)}></InputUserInfo>
        <InputUserInfo label="Отчество" value={personInfo.profile.middlename!} onChange={(e) => handlePersonChange('middlename', e.target.value)}></InputUserInfo>
        <InputUserInfo label="Номер телефона" value={personInfo.phone!} onChange={(e) => handlePersonChange('phone', e.target.value)}></InputUserInfo>
        <InputUserInfo label="email" value={personInfo.profile.email!} onChange={(e) => handlePersonChange('email', e.target.value)}></InputUserInfo>
        <InputUserInfo label="Город" value={personInfo.profile.city!} onChange={(e) => handlePersonChange('city', e.target.value)}></InputUserInfo>
        <div className="patch-button-frame">
          <button className="patch-button" onClick={() => {updateProfileInfo.mutate(personInfo);}}>
            Обновить данные
          </button>
        </div>
      </div>
    </div>
  );
};