import { Header } from "../../../components/header/Header";
import { useState, useEffect } from "react";
import { createOtp, loginRequest } from "../../api/requests";
import { useMutation } from "react-query";
import { useAuthTokenInterface } from "../../../hooks/useAuthToken";
import { useNavigate } from 'react-router-dom';

import "../../../styles/auth/login.css"

export const LoginRoute: React.FC<{authorization: useAuthTokenInterface}> = ({authorization}) => {
  const [retryDelay, setRetryDelay] = useState(0);

  const navigate = useNavigate();

  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [code, setCode] = useState<string>("");
  const [stage, setStage] = useState<number>(1);

  const createOtpMutation = useMutation((phone: string) => createOtp(phone), {
    onSuccess: (data) => {console.log(data); setRetryDelay(data.retryDelay); setStage(2);},
    onError: () => alert("error")
  })

  const loginRequestMutation = useMutation((data: {phone: string, code: number}) => loginRequest(data), {
    onSuccess: (data) => {console.log(data); authorization.signIn(data.token); navigate('/');},
    onError: () => alert("error")
  })

  const tick = () => {
    if (retryDelay <= 0)
      return;
    setRetryDelay(() => retryDelay - 1000);
  }

  useEffect(() => {
    const timerID = setInterval(() => tick(), 1000);
    return () => clearInterval(timerID);
  });

  const firstStage: JSX.Element = 
    <>
      <h1>Авторизация</h1>
      <p>Введите номер телефона для входа в личный кабинет</p>
      <label>
        <input
          placeholder="Телефон"
          name="phoneNumberInput" 
          className="phone-number-input" 
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
        ></input>
      </label>
      <button className="next" onClick={() => createOtpMutation.mutate(phoneNumber)}>Продолжить</button>
    </>
  
  const secondStage: JSX.Element = 
    <>
      <h1>Авторизация</h1>
      <p>Введите проверочный код для входа в личный кабинет</p>
      <label>
        <input
          placeholder="Телефон"
          name="phoneNumberInput" 
          className="phone-number-input" 
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
        ></input>
      </label>

      <label>
        <input
          placeholder="Проверочный код"
          name="codeInput" 
          className="code-input" 
          value={code}
          onChange={(e) => setCode(e.target.value)}
        ></input>
      </label>
      <button className="login" onClick={() => loginRequestMutation.mutate({phone: phoneNumber, code: Number(code)})}>Войти</button>

      {retryDelay > 0 ? <p>Запросить код повторно через {retryDelay / 1000} секунд</p> : <p onClick={() => createOtpMutation.mutate(phoneNumber)}>Запросить код повторно</p>}
    </>

  return (
    <div>
      <Header authorization={authorization}></Header>
      <div className="login-content">
        {stage === 1 ? firstStage : secondStage}
      </div>
    </div>
  );
};
  