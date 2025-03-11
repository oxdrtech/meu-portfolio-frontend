import { useGSAP } from "@gsap/react";
import { Burger, Drawer, Flex, Group, Input, Paper, Text } from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";
import gsap from "gsap";
import { useRef } from "react";
import CustomSpotlight from "../spotlight/customSpotlight";
import { spotlight } from "@mantine/spotlight";
import themeDevices from "@/styles/themeDevices";
import { useDisclosure } from "@mantine/hooks";
import TopNavigationDrawer from "./drawer/topNavigationDrawer";

interface Props {
  triggerGSAP: boolean;
}

export default function TopNavigation({ triggerGSAP }: Props) {
  const { isMobile } = themeDevices();
  const gsapRef = useRef(null);
  const [opened, { open, close }] = useDisclosure(false);

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
        <Group component={"span"} ta={"center"} gap={"sm"} pl={"5"} style={{
          overflow: "hidden",
        }}>
          <Text className={"object-animated"} component={"a"} href={"/"} display={"none"} fz={isMobile ? "h4" : "h3"} fw={"bold"} inline>DDR23 |</Text>
          <Text className={"object-animated"} component={"a"} href={"/"} display={"none"} fz={isMobile ? "sm" : ""} fw={"bold"} inline>Portfólio</Text>
        </Group>
        <Group component={"span"} style={{
          overflow: "hidden",
        }}>
          {
            isMobile
              ? (
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
              ) : (
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
