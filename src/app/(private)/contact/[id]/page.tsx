'use client'
import useGet from "../../../../hooks/useGet";
import { use, useEffect } from "react";
import { API_BASE_URL } from "@/utils/apiBaseUrl";
import { Contact } from "@/types/contact";
import { useSession } from "next-auth/react";
import PageContact from "@/components/pages/dashboard/contact/pageContact";

interface Props {
  params: Promise<{ id: string }>
}

export default function page({ params }: Props) {
  const resolvedParams = use(params);
  const { data: session } = useSession();

  const { isGetting, response, error, sendRequest } = useGet<Contact>(`${API_BASE_URL}/contacts/${resolvedParams.id}`, {
    headers: {
      Authorization: `Bearer ${session?.user.access_token}`,
    },
  });

  useEffect(() => {
    sendRequest();
  }, []);

  useEffect(() => {
    if (!isGetting && error) {
      window.location.replace('/dashboard')
    }
  }, [isGetting, error]);

  if (!response) return;

  return <PageContact contact={response.data} />;
}