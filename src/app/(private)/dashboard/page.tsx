"use client"
import PageDashboard from "@/components/pages/dashboard/pageDashboard";
import useGet from "@/hooks/useGet";
import { Contact } from "@/types/contact";
import { API_BASE_URL } from "@/utils/apiBaseUrl";
import { useSession } from "next-auth/react";
import { useEffect } from "react";

export default function Page() {
  const { data: session } = useSession();
  const { response, sendRequest } = useGet<Contact[]>(`${API_BASE_URL}/contacts`, {
    headers: {
      Authorization: `Bearer ${session?.user.access_token}`
    }
  });

  useEffect(() => {
    sendRequest();
  }, [])

  if (!response) return;

  const contacts = response.data;
  const pendingContacts = response.data.filter(contact => contact.status === "pending").length;
  const respondedContacts = response.data.filter(contact => contact.status === "responded").length;
  const rejectedContacts = response.data.filter(contact => contact.status === "rejected").length;

  return <PageDashboard
    contacts={contacts}
    pendingContacts={pendingContacts}
    respondedContacts={respondedContacts}
    rejectedContacts={rejectedContacts}
  />;
}
