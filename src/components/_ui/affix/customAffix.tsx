import themeDevices from "@/styles/themeDevices";
import { ActionIcon, Affix, Button, MantineStyleProp, Transition } from "@mantine/core";
import { useWindowScroll } from "@mantine/hooks";
import { IconArrowUp } from "@tabler/icons-react";

export default function CustomAffix() {
  const { isMobile } = themeDevices();
  const [scroll, scrollTo] = useWindowScroll();

  const affixDesktop = (transitionStyles: MantineStyleProp) => (
    <Button
      variant="light"
      leftSection={<IconArrowUp size={16} />}
      style={transitionStyles}
      onClick={() => scrollTo({ y: 0 })}
    >
      Ir pro topo
    </Button>
  );

  const affixMobile = (transitionStyles: MantineStyleProp) => (
    <ActionIcon
      size={"xl"}
      variant="light"
      style={transitionStyles}
      onClick={() => scrollTo({ y: 0 })}
    >
      <IconArrowUp size={22} />
    </ActionIcon>
  )

  return (
    <>
      <Affix position={{ bottom: 20, right: 20 }}>
        <Transition transition="slide-up" mounted={scroll.y > (isMobile ? 100 : 0)}>
          {
            (transitionStyles) => isMobile
              ? affixMobile(transitionStyles)
              : affixDesktop(transitionStyles)
          }
        </Transition>
      </Affix>
    </>
  );
}
