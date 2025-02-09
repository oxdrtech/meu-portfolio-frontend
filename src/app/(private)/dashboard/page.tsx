'use client';
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

export default function Page() {
  const { data: session, status } = useSession();

  if (status === 'authenticated' && session?.user.USER_ROLE !== 'ADMIN') redirect('/');

  return (
    <>
      pagina de dashboard
    </>
  );
}
