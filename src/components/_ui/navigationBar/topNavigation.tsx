import { useGSAP } from "@gsap/react";
import { Flex, Group, Input, Paper, Text } from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";
import gsap from "gsap";
import { useRef } from "react";
import CustomSpotlight from "../spotlight/customSpotlight";
import { spotlight } from "@mantine/spotlight";

interface Props {
  triggerGSAP: boolean;
}

export default function TopNavigation({ triggerGSAP }: Props) {
  const gsapRef = useRef(null);

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
      <Flex ref={gsapRef} pos={"fixed"} p={"xs"} left={"0"} right={"0"} justify={"center"}>
        <Group component={"span"} style={{ overflow: "hidden" }}>
          <Input
            className="object-animated"
            display={"none"}
            onClick={spotlight.open}
            component="button"
            pointer
            w={"15rem"}
            leftSection={<IconSearch size={18} />}
            rightSectionWidth={"max-content"}
            rightSection={
              <Paper mr={"xs"} px={"6"} py={"4"}>
                <Text fz={"xs"} inline>Crtl + K</Text>
              </Paper>
            }
          >
            <Input.Placeholder>Pesquisar</Input.Placeholder>
          </Input>
        </Group>
      </Flex>
      <CustomSpotlight />
    </>
  );
}
