import '@mantine/core/styles.css';
import '@mantine/spotlight/styles.css';
import '@mantine/notifications/styles.css';
import '@splidejs/react-splide/css';
import "../styles/globals.css";
import { ColorSchemeScript, mantineHtmlProps, MantineProvider } from "@mantine/core";
import type { Metadata } from "next";
import { theme } from "../styles/theme";
import { Notifications } from '@mantine/notifications';
import AuthProvider from '@/providers/authProvider';

export const metadata: Metadata = {
  title: "OXDRTECH | Portfólio",
  description: "Desenvolvedor Web Fullstack",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" {...mantineHtmlProps}>
      <head>
        <ColorSchemeScript defaultColorScheme="dark" />
      </head>
      <body>
        <MantineProvider theme={theme} defaultColorScheme="dark">
          <Notifications />
          <AuthProvider>
            {children}
          </AuthProvider>
        </MantineProvider>
      </body>
    </html>
  );
}
