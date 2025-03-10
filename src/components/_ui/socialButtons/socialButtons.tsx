import { socialButtonsMock } from "@/mocks/socialButtons.mock";
import { ActionIcon, Group, Image, Modal, Stack, Text } from "@mantine/core";
import { useDisclosure, useHover } from "@mantine/hooks";

export default function SocialButtons() {
  const [opened, { open, close }] = useDisclosure(false);

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
        <Stack gap={"sm"}>
          <Text fz={"lg"} fw={"bold"} c={"defaultColor"} ta={"center"}>Compartilhe esta página</Text>
          <Image src={"./qrcode.png"} />
        </Stack>
      </Modal>
    </>
  )
}
