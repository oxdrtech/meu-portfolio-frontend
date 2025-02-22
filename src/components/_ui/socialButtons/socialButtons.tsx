import { socialButtonsMock } from "@/mocks/socialButtons.mock";
import { ActionIcon, Group } from "@mantine/core";
import { useHover } from "@mantine/hooks";

// TODO - iconQRCode deve abrir um modal

export default function SocialButtons() {

  const socialButtons = socialButtonsMock.map((btn, index) => {
    const { hovered, ref } = useHover();

    return (
      <Group key={index} component={"span"} style={{ overflow: "hidden" }}>
        <ActionIcon ref={ref} component="a" href={btn.url} target="_blank" variant="transparent" fz={"sm"} c={hovered ? "defaultColor" : "#C9C9C9"}>
          <btn.icon size={20} />
        </ActionIcon>
      </Group>
    );
  });

  return (
    <>
      <Group gap={"xs"}>
        {socialButtons}
      </Group>
    </>
  )
}
