"use client"
import { Title, Text, Anchor, Group, Button, Modal, Stack } from "@mantine/core";
import { useState } from "react";
import { useDisclosure } from "@mantine/hooks";
import SignIn from "@/components/pages/admin/signIn";
import SignUp from "@/components/pages/admin/signup";
import { IconHome } from "@tabler/icons-react";

export default function AuthPage() {
  const [opened, { open, close }] = useDisclosure(false);
  const [modalContent, setModalContent] = useState<"login" | "signup" | "">("");

  const handleOpen = (content: "login" | "signup") => {
    setModalContent(content);
    open();
  };

  return (
    <>
      <Stack pos={"relative"} w={"100vw"} h={"100vh"} align={"center"} justify={"center"} gap={"xl"}>
        <Stack pos={"absolute"} top={"0"} left={"0"}>
          <Button component={"a"} href={"/"} variant={"light"} m={"lg"} leftSection={<IconHome size={"20"} />}>
            Pagina inicial
          </Button>
        </Stack>
        <Group mt={"xl"}>
          <Button onClick={() => handleOpen("login")} variant={"light"}>
            Entrar
          </Button>
          <Button onClick={() => handleOpen("signup")} variant={"outline"} >
            Criar conta
          </Button>
        </Group>
      </Stack>
      <Modal
        title={modalContent === "login" ? "Fazer login" : "Fazer cadastro"}
        opened={opened}
        onClose={close}
        closeOnClickOutside={false}
        overlayProps={{ backgroundOpacity: 0.55, blur: 3 }}
      >
        {modalContent === "login" && (
          <>
            <SignIn />
            <Text c={"dimmed"} size={"sm"} ta={"center"} mt={"20"}>
              Ainda nao tem uma conta?{" "}
              <Anchor size={"sm"} component={"button"} onClick={() => handleOpen("signup")}>
                Criar conta
              </Anchor>
            </Text>
          </>
        )}
        {modalContent === "signup" && (
          <>
            <SignUp />
            <Text c={"dimmed"} size={"sm"} ta={"center"} mt={20}>
              Já tem uma conta?{" "}
              <Anchor size={"sm"} component={"button"} onClick={() => handleOpen("login")}>
                Entrar
              </Anchor>
            </Text>
          </>
        )}
      </Modal>
    </>
  );
}
