'use client'
import { AppShell, Avatar, Group, Menu, Stack, Text } from "@mantine/core";
import { IconLogout } from "@tabler/icons-react";
import { signOut, useSession } from "next-auth/react";
import { redirect } from "next/navigation";

export default function PageDenied() {
  const { data: session } = useSession();

  const logout = async () => {
    await signOut({ redirect: false });
    redirect('/')
  }

  return (
    <AppShell
      header={{ height: 60 }}
      padding="md"
    >
      <AppShell.Header>
        <Group h="100%" px="md" justify="space-between">
          <Group>
            <Text c={"defaultColor"} fw={"bold"} inline component={"a"} href={"/"} >Meu Portfolio</Text>
          </Group>
          <Group>
            <Menu>
              <Menu.Target>
                <Group style={{
                  cursor: "pointer",
                }}>
                  <Text c="dimmed" size="sm" inline >
                    Olá, {session?.user.name}
                  </Text>
                  <Avatar size='2.3rem' color={'defaultColor'} />
                </Group>
              </Menu.Target>
              <Menu.Dropdown>
                <Menu.Item
                  c={"defaultColor"}
                  mr='lg'
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
      <AppShell.Main h='100vh'>
        <Stack justify="center" h='100%' gap={0}>
          <Text ta='center' size="lg">Olá, {session?.user.name}</Text>
          <Text ta='center' c='dimmed'>Você não possue permissão para estar aqui</Text>
          <Text ta='center' c='dimmed'>Entre em contato com um administrador do sistema para quaisquer informações.</Text>
        </Stack>
      </AppShell.Main>
    </AppShell>
  );
}
