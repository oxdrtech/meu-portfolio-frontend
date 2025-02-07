'use client';
import { AppShell, Avatar, Burger, Button, Group, Image, Menu, Stack, Text } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import Link from 'next/link';
import classes from './layout.module.css';
import { signOut, useSession } from 'next-auth/react';
import { IconBuildingStore, IconLogout, IconPackage, IconSettings } from '@tabler/icons-react';
import { redirect } from 'next/navigation';
import Loading from '../loading';

export default function PagesLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { data: session, status } = useSession();
  const [mobileOpened, { toggle: toggleMobile }] = useDisclosure();
  const [desktopOpened, { toggle: toggleDesktop }] = useDisclosure(true);

  if (status === 'loading') return <Loading />;

  if (!session) redirect('/admin');

  const logout = async () => {
    await signOut({ redirect: false });
    redirect('/admin');
  }

  return (
    <>
      {!session?.user.USER_AUTHORIZED ? (
        <>
          {/* TODO - trabalhar no acesso negado */}
          acesso negado
        </>
      ) : (
        <AppShell
          header={{ height: 60 }}
          navbar={{
            width: 300,
            breakpoint: 'sm',
            collapsed: { mobile: !mobileOpened, desktop: !desktopOpened },
          }}
          padding="md"
        >
          <AppShell.Header>
            <Group h="100%" px="md" justify="space-between">
              <Group>
                <Burger opened={mobileOpened} onClick={toggleMobile} hiddenFrom="sm" size="sm" />
                <Burger opened={desktopOpened} onClick={toggleDesktop} visibleFrom="sm" size="sm" />
                <Image src="/logo_0.webp" w={40} />
              </Group>
              <Group>
                <Menu>
                  <Menu.Target>
                    <Group style={{
                      cursor: "pointer",
                    }}>
                      <Text c="dimmed" size="sm" inline>
                        Olá, {session?.user.USER_NAME}
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
          <AppShell.Navbar p="md">
            <Stack gap={5}>
              <Link href="/produtos" passHref style={{ textDecoration: 'none' }}>
                <Button
                  onClick={toggleMobile}
                  className={classes.navbutton}
                  variant="default"
                  justify="flex-start"
                  fullWidth
                  leftSection={<IconPackage size={20} />}
                >
                  Produtos
                </Button>
              </Link>
              <Link href="/revendedores" passHref style={{ textDecoration: 'none' }}>
                <Button
                  onClick={toggleMobile}
                  className={classes.navbutton}
                  variant="default"
                  justify="flex-start"
                  fullWidth
                  leftSection={<IconBuildingStore size={20} />}
                >
                  Revendedores
                </Button>
              </Link>
              {session?.user.USER_ROLE === 'ADMIN' && (
                <Link href="/configuracoes" passHref style={{ textDecoration: 'none' }}>
                  <Button
                    onClick={toggleMobile}
                    className={classes.navbutton}
                    variant="default"
                    justify="flex-start"
                    fullWidth
                    leftSection={<IconSettings size={20} />}
                  >
                    Configurações
                  </Button>
                </Link>
              )}
            </Stack>
            <Group mt="auto">
              <Button
                leftSection={<IconLogout size={20} />}
                fullWidth
                variant="light"
                onClick={logout}
              >
                Sair
              </Button>
            </Group>
          </AppShell.Navbar>
          <AppShell.Main h="max-content">
            {children}
            {/* {session.user.USER_ROLE === 'ADMIN' && <FloatButton />} */}
          </AppShell.Main>
        </AppShell>
      )}
    </>
  );
}
