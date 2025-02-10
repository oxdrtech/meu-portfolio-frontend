import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import { useState } from "react";

export default function useDelete<R>(url: string, options: AxiosRequestConfig = {}) {
  const [isDeleting, setIsDeleting] = useState(false);
  const [response, setResponse] = useState<AxiosResponse<R> | null>(null);
  const [error, setError] = useState<AxiosError | null>(null);

  const sendRequest = async () => {
    setResponse(null);
    setError(null);
    setIsDeleting(true);

    try {
      const res = await axios.delete<R>(url, options);
      setResponse(res);
    } catch (err) {
      setError(err as AxiosError);
    } finally {
      setIsDeleting(false);
    }
  };

  return { isDeleting, response, error, sendRequest };
}
