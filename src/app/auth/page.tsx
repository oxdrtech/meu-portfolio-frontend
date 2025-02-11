"use client"
import PageAuth from "@/components/pages/auth/pageAuth";
import { useSession } from "next-auth/react";
import { redirect } from 'next/navigation';

export default function Page() {
  const { data: session } = useSession();

  if (session) redirect("/dashboard");

  return <PageAuth />;
}
