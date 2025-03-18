import { socialButtonsMock } from "@/mocks/socialButtons.mock";
import themeDevices from "@/styles/themeDevices";
import { ActionIcon, Group, Image, Modal, Stack, Text } from "@mantine/core";
import { useClipboard, useDisclosure, useHover } from "@mantine/hooks";
import CustomNotification from "../notification/customNotification";

export default function SocialButtons() {
  const { isMobile } = themeDevices();
  const [opened, { open, close }] = useDisclosure(false);
  const clipboard = useClipboard();

  const copyLink = (url: string) => {
    clipboard.copy(url);
    CustomNotification({ title: "Sucesso", message: "Link copiado 👍" });
    setTimeout(() => clipboard.reset(), 3000);
  };

  const socialButtons = socialButtonsMock.map((btn, index) => {
    const { hovered, ref } = useHover();

    return (
      <Group key={index} component={"span"} style={{ overflow: "hidden" }}>
        {
          !btn.url
            ? (
              <ActionIcon ref={ref} onClick={open} variant="transparent" fz={"sm"} c={hovered ? "defaultColor" : "#C9C9C9"}>
                <btn.icon size={20} />
              </ActionIcon>
            ) : (
              <ActionIcon ref={ref} component="a" href={btn.url} target="_blank" variant="transparent" fz={"sm"} c={hovered ? "defaultColor" : "#C9C9C9"}>
                <btn.icon size={20} />
              </ActionIcon>
            )
        }
      </Group>
    );
  });

  return (
    <>
      <Group gap={"xs"}>
        {socialButtons}
      </Group>
      <Modal
        size={"auto"}
        padding={"0"}
        opened={opened}
        onClose={close}
        withCloseButton={false}
        centered
        transitionProps={{
          transition: "scale",
          duration: 200,
          timingFunction: "easy",
        }}
      >
        <Stack align="center" gap={"sm"} p={"sm"}>
          <Image w={!isMobile ? "300" : ""} src={"./qrcode.webp"} />
          <Text onClick={() => copyLink(window.location.href)} c={"defaultColor"} ta={"center"} style={{
            cursor: "pointer",
          }}>Compartilhe esta página</Text>
        </Stack>
      </Modal>
    </>
  )
}
