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
import LeftNavigation from "@/components/_ui/navigationBar/leftNavigation";
import RightNavigation from "@/components/_ui/navigationBar/rightNavigation";

export default function Home() {
  const { isMobile } = useDevices();
  const [renderCompleted, setRenderCompleted] = useState(false);

  const { response, sendRequest } = useGet<userDetails>(`${API_GIT_URL}/users/DDR23`);

  useEffect(() => {
    sendRequest();
  }, []);

  return (
    <Stack display={"block"}>
      <Loading onComplete={() => setRenderCompleted(true)} />
      <Background />
      <LeftNavigation triggerGSAP={renderCompleted} />
      <RightNavigation triggerGSAP={renderCompleted} />
      <Stack display={"block"} className="main" h={"100vh"} style={{
        backdropFilter: isMobile ? "blur(64px)" : "blur(86px)",
      }}>
        {renderCompleted && (
          <>
            <Hero user={response?.data} />
            <Flex className="panel" id="sobre-mim" h={"100vh"} justify={"center"} align={"center"} style={{
              scrollSnapAlign: "start",
            }}>
              cobre mim
            </Flex>
            <Flex className="panel" id="habilidades" h={"100vh"} justify={"center"} align={"center"} style={{
              scrollSnapAlign: "start",
            }}>
              habilidades
            </Flex>
            <Flex className="panel" id="projetos" h={"100vh"} justify={"center"} align={"center"} style={{
              scrollSnapAlign: "start",
            }}>
              projetos
            </Flex>
            <Flex className="panel" id="contato" h={"100vh"} justify={"center"} align={"center"} style={{
              scrollSnapAlign: "start",
            }}>
              contato
            </Flex>
          </>
        )}
      </Stack>
    </Stack>
  );
}
