'use client';
import { AppShell, Avatar, Group, Menu, Text } from '@mantine/core';
import { signOut, useSession } from 'next-auth/react';
import { IconLogout } from '@tabler/icons-react';
import { redirect } from 'next/navigation';
import Loading from '../loading';

export default function PagesLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { data: session, status } = useSession();

  if (status === 'loading') return <Loading />;

  if (!session) redirect('/auth');

  const logout = async () => {
    await signOut({ redirect: false });
    redirect('/auth');
  }

  return (
    <>
      {!session?.user.user_authorized ? (
        <>
          acesso negado
        </>
      ) : (
        <AppShell
          header={{ height: 60 }}
          padding="md"
        >
          <AppShell.Header>
            <Group h="100%" px="md" justify="space-between">
              <Group>
                <Text c={"defaultColor"} fw={"bold"} inline >Meu Portfolio</Text>
              </Group>
              <Group>
                <Menu>
                  <Menu.Target>
                    <Group style={{
                      cursor: "pointer",
                    }}>
                      <Text c="dimmed" size="sm" inline>
                        Olá, {session?.user.user_name}
                      </Text>
                      <Avatar size='2.3rem' color={'defaultColor'} />
                    </Group>
                  </Menu.Target>
                  <Menu.Dropdown>
                    <Menu.Item
                      c={"defaultColor"}
                      mr="lg"
                      leftSection={<IconLogout size={20} />}
                      onClick={logout}
                    >
                      Sair
                    </Menu.Item>
                  </Menu.Dropdown>
                </Menu>
              </Group>
            </Group>
          </AppShell.Header>
          <AppShell.Main h="max-content">
            {children}
          </AppShell.Main>
        </AppShell>
      )}
    </>
  );
}
