"use client"
import { Text, Anchor, Group, Button, Modal, Stack } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconHome } from "@tabler/icons-react";
import ModalSignIn from "./modals/modalSignIn";
import ModalSignUp from "./modals/modalSignup";
import themeDevices from "@/styles/themeDevices";

export default function PageAuth() {
  const { isMobile } = themeDevices();
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <Stack pos={"relative"} w={"100vw"} h={"100vh"} align={"center"} justify={"center"} gap={"xl"}>
        <Stack pos={"absolute"} top={"0"} left={"0"}>
          <Button component={"a"} href={"/"} variant={"default"} c={"defaultColor"} m={"lg"} leftSection={<IconHome size={"20"} />}>
            Pagina inicial
          </Button>
        </Stack>
        <Stack w={"25rem"} maw={"90vw"}>
          <ModalSignIn />
          <Group mt={"xl"} justify={"center"}>
            <Text c={"dimmed"} size={"sm"} ta={"center"}>
              Ainda nao tem uma conta?{" "}
              <Anchor size={"sm"} component={"button"} onClick={open}>
                Criar conta
              </Anchor>
            </Text>
          </Group>
        </Stack>
      </Stack>
      <Modal
        opened={opened}
        onClose={close}
        closeOnClickOutside={!isMobile}
        withCloseButton={isMobile}
        centered={!isMobile}
        transitionProps={{
          duration: 200,
          timingFunction: "easy",
        }}
        overlayProps={{ backgroundOpacity: 0.55, blur: 3 }}
      >
        <ModalSignUp />
      </Modal>
    </>
  );
}
