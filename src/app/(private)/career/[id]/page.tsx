"use client"
import PagePrivateCareer from "@/components/pages/private/career/pagePrivateCareer";
import useGet from "@/hooks/useGet";
import { Career } from "@/types/career";
import { API_BASE_URL } from "@/utils/apiBaseUrl";
import { use, useEffect } from "react";

interface Props {
  params: Promise<{ id: string }>;
}

export default function Page({ params }: Props) {
  const resolvedParams = use(params);

  const { isGetting, response, error, sendRequest } = useGet<Career>(`${API_BASE_URL}/careers/${resolvedParams.id}`);

  useEffect(() => {
    sendRequest();
  }, []);

  useEffect(() => {
    if (!isGetting && error) {
      window.location.replace('/careers')
    }
  }, [isGetting, error]);

  if (!response) return;

  return <PagePrivateCareer career={response.data} />;
}
