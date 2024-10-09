import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:5000',
});

export const updatePaymentIntent = async (
  paymentIntentId: string,
  currency: string
) => {
  const { data } = await axiosInstance.patch<{
    clientSecret: string;
  }>(`/payment-intents/${paymentIntentId}`, {
    currency,
  });
  return data;
};

export const createPaymentIntent = async (currency: string) => {
  const { data } = await axiosInstance.post<{
    clientSecret: string;
    paymentIntentId: string;
  }>(`/payment-intents`, {
    currency,
  });
  return data;
};
