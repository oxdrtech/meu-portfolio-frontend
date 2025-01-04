"use client";
import Background from "@/components/_ui/background/background";
import useDevices from "@/hooks/useDevices";
import { Flex, Stack } from "@mantine/core";
import { useEffect, useState } from "react";
import Loading from "@/components/_ui/loading/loading";
import Hero from "@/components/pages/hero/hero";
import useGet from "@/hooks/useGet";
import { userDetails } from "@/types/userDetails";
import { API_GIT_URL } from "@/utils/apiGitUrl";

export default function Home() {
  const { isMobile } = useDevices();
  const [triggerGSAP, setTriggerGSAP] = useState(false);

  const { response, sendRequest } = useGet<userDetails>(`${API_GIT_URL}/users/DDR23`);

  useEffect(() => {
    sendRequest();
  }, []);

  return (
    <Stack display={"block"}>
      <Loading onComplete={() => setTriggerGSAP(true)} />
      <Background />
      <Stack display={"block"} className="main" h={"100vh"} w={"100vw"} style={{
        overflowY: "scroll",
        scrollSnapType: "y mandatory",
        backdropFilter: isMobile ? "blur(32px)" : "blur(64px)",
      }}>
        <Hero user={response?.data} />
        <Flex className="panel" h={"100vh"} justify={"center"} align={"center"} style={{
          scrollSnapAlign: "start",
        }}>
          teste 2
        </Flex>
      </Stack>
    </Stack>
  );
}
