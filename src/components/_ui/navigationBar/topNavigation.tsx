import { useGSAP } from "@gsap/react";
import { Burger, Drawer, Flex, Group, Image, Input, Paper, Text } from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";
import gsap from "gsap";
import { useEffect, useRef, useState } from "react";
import CustomSpotlight from "../spotlight/customSpotlight";
import { spotlight } from "@mantine/spotlight";
import themeDevices from "@/styles/themeDevices";
import { useDisclosure } from "@mantine/hooks";
import TopNavigationDrawer from "./drawer/topNavigationDrawer";

interface Props {
  triggerGSAP: boolean;
  activeSection: string;
  sections: string[];
}

export default function TopNavigation({ triggerGSAP, activeSection, sections }: Props) {
  const { isMobile, isDesktop } = themeDevices();
  const gsapRef = useRef(null);
  const [opened, { open, close }] = useDisclosure(false);
  const textRef = useRef<HTMLDivElement>(null);
  const [prevIndex, setPrevIndex] = useState(0);

  useGSAP(() => {
    if (triggerGSAP) {
      gsap
        .set(".object-animated", {
          display: "flex",
          yPercent: 100,
          opacity: 0,
        });

      gsap
        .timeline()
        .to(".object-animated", {
          delay: 1,
          opacity: 1,
          yPercent: 0,
          duration: 0.5,
        });
    }
  }, [triggerGSAP]);

  useEffect(() => {
    const currentIndex = sections.indexOf(activeSection);
    const direction = currentIndex > prevIndex ? 1 : -1;

    if (textRef.current) {
      gsap.fromTo(
        textRef.current,
        { yPercent: 0, opacity: 1 },
        {
          yPercent: direction * -100,
          opacity: 0,
          duration: 0.2,
          onComplete: () => {
            if (textRef.current) {
              textRef.current.innerText = activeSection;
              gsap.fromTo(
                textRef.current,
                { yPercent: direction * 100, opacity: 0 },
                { yPercent: 0, opacity: 1, duration: 0.2 }
              );
            }
          },
        }
      );
    }
    setPrevIndex(currentIndex);
  }, [activeSection, sections]);

  return (
    <>
      <Flex
        ref={gsapRef}
        pos={"fixed"}
        bg={"dark.7"}
        p={"xs"}
        left={"0"}
        right={"0"}
        align={"center"}
        h={"56"}
        justify={"space-between"}
        px={"lg"}
        style={{
          zIndex: "100",
        }} >
        <Group component={"span"} style={{
          overflow: "hidden",
        }}>
          <Group className={"object-animated"} ta={"center"} pl={"5"} gap={"sm"} display={"none"}>
            <Image src={"./oxdrtech.png"} w={86} mb={"2"} />
            <Text component={"a"} href={"/"} fz={isMobile ? "h4" : "h3"}>|</Text>
            <Group component={"span"} style={{
              overflow: "hidden",
            }}>
              <div ref={textRef} style={{ position: "relative", display: "inline-block" }}>
                <Text fz={isMobile ? "sm" : ""} fw="bold" inline>
                  {activeSection}
                </Text>
              </div>
            </Group>
          </Group>
        </Group>
        <Group component={"span"} style={{
          overflow: "hidden",
        }}>
          {
            isDesktop
              ? (
                <Input
                  className="object-animated"
                  display={"none"}
                  onClick={spotlight.open}
                  component="button"
                  pointer
                  w={"15rem"}
                  leftSection={<IconSearch size={"18"} />}
                  rightSectionWidth={"max-content"}
                  rightSection={
                    !isMobile
                    && (
                      <Paper mr={"xs"} px={"6"} py={"4"}>
                        <Text fz={"xs"} inline>Crtl + K</Text>
                      </Paper>
                    )
                  }
                >
                  <Input.Placeholder>Pesquisar</Input.Placeholder>
                </Input>
              ) : (
                <Group
                  className="object-animated"
                  display={"none"}
                >
                  <Burger
                    opened={opened}
                    onClick={open}
                    aria-label="Toggle drawer"
                    size={"sm"}
                  />
                </Group>
              )
          }
        </Group>
      </Flex>
      <CustomSpotlight />
      <Drawer
        onClose={close}
        opened={opened}
        position={"bottom"}
        withCloseButton={false}
        size={"20.5rem"}
        offset={10}
        radius={"md"}
        transitionProps={{
          duration: 200,
          timingFunction: "easy",
        }}
      >
        <TopNavigationDrawer />
      </Drawer>
    </>
  );
}
