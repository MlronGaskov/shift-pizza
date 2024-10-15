export const backendUrl = "https://shift-backend.onrender.com";

import axios from "axios";
import { paymentOrder } from "../../schemes/payment-order";
import { patchProfileScheme } from "../../schemes/patch-profile";

export const fetchCatalog = async () => {
  const { data } = await axios.get('https://shift-backend.onrender.com/pizza/catalog');
  return data;
};

export const createOtp = async (phone: string) => {
  const { data } = await axios.post('https://shift-backend.onrender.com/auth/otp', {"phone": phone});
  return data;
};

export const payForCart = async (inputData: paymentOrder) => {
  const { data } = await axios.post('https://shift-backend.onrender.com/pizza/payment', {...inputData});
  return data;
};

export const loginRequest = async (inputData: {phone: string, code: number}) => {
  const { data } = await axios.post('https://shift-backend.onrender.com/users/signin', inputData);
  return data;
};

export const fetchSession = async (authorization: string) => {
  const { data } = await axios.get('https://shift-backend.onrender.com/users/session', {headers: {"Authorization": `Bearer ${authorization}`}});
  return data;
};

export const patchProfile = async (authorization: string, profileInfo: patchProfileScheme) => {
  const { data } = await axios.patch('https://shift-backend.onrender.com/users/profile', {...profileInfo}, {headers: {"Authorization": `Bearer ${authorization}`}});
  return data;
};

export const fetchOrders = async (authorization: string) => {
  const { data } = await axios.get('https://shift-backend.onrender.com/pizza/orders', {headers: {"Authorization": `Bearer ${authorization}`}});
  return data;
};

export const fetchOrder = async (authorization: string, orderId: string) => {
  const { data } = await axios.get('https://shift-backend.onrender.com/pizza/orders/' + orderId, {headers: {"Authorization": `Bearer ${authorization}`}});
  return data;
};

