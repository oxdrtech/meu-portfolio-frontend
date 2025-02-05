import { useGSAP } from "@gsap/react";
import { ActionIcon, Flex, Group, HoverCard, Kbd } from "@mantine/core";
import { useHover } from "@mantine/hooks";
import { spotlight } from "@mantine/spotlight";
import gsap from "gsap";
import { useRef } from "react";
import CustomSpotlight from "../spotlight/customSpotlight";
import themeDevices from "@/styles/themeDevices";
import { searchButtonsMock, socialButtonsMock } from "@/mocks/navigationButtons.mock";

interface Props {
  triggerGSAP: boolean;
}

export default function LeftNavigation({ triggerGSAP }: Props) {
  const { isDesktop, isMobile } = themeDevices();
  const gsapRef = useRef(null);

  useGSAP(() => {
    if (triggerGSAP) {
      gsap
        .set(".links-animated", {
          display: "flex",
          yPercent: 100,
          opacity: 0,
        });

      gsap
        .timeline()
        .to(".links-animated", {
          delay: 1,
          opacity: 1,
          yPercent: 0,
          duration: .5,
        });
    }
  }, [triggerGSAP]);

  const socialButtons = socialButtonsMock.map((btn, index) => {
    const { hovered, ref } = useHover();

    return (
      <Group key={index} component={"span"} style={{ overflow: "hidden" }}>
        <ActionIcon className="links-animated" ref={ref} component="a" href={btn.url} target="_blank" display={"none"} variant="transparent" fz={"sm"} c={hovered ? "defaultColor" : "white"} >
          <btn.icon size={22} />
        </ActionIcon>
      </Group>
    );
  })

  const searchButtons = searchButtonsMock.map((btn, index) => {
    const { hovered, ref } = useHover();

    return (
      <Group key={index} component={"span"} style={{ overflow: "hidden" }}>
        {isDesktop ? (
          <HoverCard position="right" withArrow>
            <HoverCard.Target>
              <ActionIcon className="links-animated" ref={ref} display={"none"} variant="transparent" fz={"sm"} c={hovered ? "defaultColor" : "white"} >
                <btn.icon size={22} onClick={spotlight.open} />
              </ActionIcon>
            </HoverCard.Target>
            <HoverCard.Dropdown p={0}>
              <Kbd>Ctrl + Enter</Kbd>
            </HoverCard.Dropdown>
          </HoverCard>
        ) : (
          <ActionIcon className="links-animated" ref={ref} display={"none"} variant="transparent" fz={"sm"} c={hovered ? "defaultColor" : "white"} >
            <btn.icon size={22} onClick={spotlight.open} />
          </ActionIcon>
        )}
      </Group>
    )
  })

  return (
    <>
      <Flex
        ref={gsapRef}
        pos={"fixed"}
        w={"max-content"}
        h={"100vh"}
        direction={"column"}
        left={"1rem"}
        pt={"1.2rem"}
        pb={"5rem"}
        justify={isMobile ? "" : "space-between"}
        style={{
          zIndex: 300,
        }}>
        <Flex direction={"column"} gap={"sm"}>
          {socialButtons}
        </Flex>
        <Flex direction={"column"} mt={"sm"}>
          {searchButtons}
        </Flex>
      </Flex>
      <CustomSpotlight />
    </>
  );
}
