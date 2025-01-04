"use client";
import Background from "@/components/_ui/background/background";
import useDevices from "@/hooks/useDevices";
import { Flex, Stack } from "@mantine/core";
import { useState } from "react";
import Loading from "@/components/_ui/loading/loading";
import NavigationBar from "@/components/_ui/navigationBar/navigationBar";

export default function Home() {
  const { isMobile } = useDevices();
  const [triggerGSAP, setTriggerGSAP] = useState(false);

  return (
    <Stack display={"block"}>
      <Loading onComplete={() => setTriggerGSAP(true)} />
      <Background />
      {/* <NavigationBar triggerGSAP={triggerGSAP} /> */}
      <Stack display={"block"} className="main" h={"100vh"} w={"100vw"} style={{
        overflowY: "scroll",
        scrollSnapType: "y mandatory",
        backdropFilter: isMobile ? "blur(32px)" : "blur(64px)",
      }}>
        <Flex className="panel" h={"100vh"} justify={"center"} align={"center"} style={{
          scrollSnapAlign: "start",
        }}>
          teste 1
        </Flex>
        <Flex className="panel" h={"100vh"} justify={"center"} align={"center"} style={{
          scrollSnapAlign: "start",
        }}>
          teste 2
        </Flex>
      </Stack>
    </Stack>
  );
}
