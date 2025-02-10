"use client"
import PagePrivateCareers from "@/components/pages/private/careers/pagePrivateCareers";
import useGet from "@/hooks/useGet";
import { Career } from "@/types/career";
import { API_BASE_URL } from "@/utils/apiBaseUrl";
import { useEffect } from "react";

export default function PageCareers() {
  const { response, sendRequest } = useGet<Career[]>(`${API_BASE_URL}/careers`);

  useEffect(() => {
    sendRequest();
  }, [])

  if (!response) return;

  return <PagePrivateCareers careers={response?.data} />;
}
