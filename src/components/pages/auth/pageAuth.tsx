"use client"
import { Text, Anchor, Group, Button, Modal, Stack } from "@mantine/core";
import { useState } from "react";
import { useDisclosure } from "@mantine/hooks";
import { IconHome } from "@tabler/icons-react";
import ModalSignIn from "./modals/modalSignIn";
import ModalSignUp from "./modals/modalSignup";

export default function PageAuth() {
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
          <Button component={"a"} href={"/"} variant={"default"} c={"defaultColor"} m={"lg"} leftSection={<IconHome size={"20"} />}>
            Pagina inicial
          </Button>
        </Stack>
        <Group mt={"xl"}>
          <Button onClick={() => handleOpen("login")} variant={"light"}>
            Entrar
          </Button>
          <Button onClick={() => handleOpen("signup")} variant={"default"} c={"defaultColor"} >
            Criar conta
          </Button>
        </Group>
      </Stack>
      <Modal
        title={modalContent === "login" ? "Fazer login" : "Fazer cadastro"}
        opened={opened}
        onClose={close}
        closeOnClickOutside={false}
        transitionProps={{
          duration: 200,
          timingFunction: "easy",
        }}
        overlayProps={{ backgroundOpacity: 0.55, blur: 3 }}
      >
        {modalContent === "login" && (
          <>
            <ModalSignIn />
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
            <ModalSignUp />
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
