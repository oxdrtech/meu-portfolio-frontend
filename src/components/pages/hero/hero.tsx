import useDevices from "@/hooks/useDevices";
import { userDetails } from "@/types/userDetails";
import { useGSAP } from "@gsap/react";
import { Avatar, Flex, Group, Paper, Stack, Text } from "@mantine/core";
import { IconMouse } from "@tabler/icons-react";
import gsap from "gsap";
import { useRef } from "react";

interface Props {
  user?: userDetails;
}

export default function Hero({ user }: Props) {
  const { isMobile } = useDevices();
  const gsapRef = useRef(null);

  useGSAP(() => {
    if (gsapRef.current) {
      gsap.set(".paper-animated", {
        scale: 10,
        opacity: 0,
      });
      gsap.set(".avatar-animated", {
        scale: 0,
      });
      gsap.set(".objectup-animated", {
        yPercent: 100,
      });
      gsap.set(".line-animated", {
        scaleX: 0,
        opacity: 0,
      });

      gsap
        .timeline()
        .to(".paper-animated", {
          delay: 6,
          opacity: 1,
          scale: 1,
          duration: .6,
        })
        .to(".avatar-animated", {
          scale: 1,
          duration: .4,
        }, "-=0.2")
        .to(".objectup-animated", {
          yPercent: 0,
          duration: .2,
        }, "-=0.2")
        .to(".line-animated", {
          scaleX: 1,
          opacity: 1,
          duration: .2,
          transformOrigin: "left center",
        }, "-=0.2")
    }
  }, { scope: gsapRef })

  return (
    <>
      <Flex ref={gsapRef} className="panel" h={"100vh"} justify={"center"} align={"center"} direction={"column"} style={{
        scrollSnapAlign: "start",
      }}>
        <Stack h={"90vh"} gap={0} justify={"center"} pt={"10vw"}>
          <Paper className="paper-animated" bg={"defaultColor"} mx={"auto"} mb={"xl"} radius={"50%"} p={2} shadow="xl">
            <Avatar className="avatar-animated" size={isMobile ? "200" : "300"} src={user?.avatar_url} />
          </Paper>
          <Group component={"span"} style={{ overflow: "hidden" }}>
            <Text className="objectup-animated" component={"h1"} fw={"bold"} fz={"8vw"} ta={"end"} inline>
              Desenvolvedor Web
            </Text>
          </Group>
          <Group>
            <Paper className="line-animated" flex={1} h={2} bg={"defaultColor"}></Paper>
            <Group component={"span"} style={{ overflow: "hidden" }}>
              <Text className="objectup-animated" component="h1" fw={"normal"} fz={isMobile ? "md" : "xl"} ta={"end"} inline>
                FULLSTACK | React & Node
              </Text>
            </Group>
          </Group>
        </Stack>
        <Group component={"span"} style={{ overflow: "hidden" }}>
          <IconMouse className="objectup-animated" size={28} color="#DAFF01" />
        </Group>
      </Flex>
    </>
  );
}
