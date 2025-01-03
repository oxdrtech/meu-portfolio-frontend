"use client"
import Background from "@/components/_ui/background/background";
import Hero from "@/components/_ui/hero/hero";
import useDevices from "@/hooks/useDevices";
import { Flex, Group, Text } from "@mantine/core";
import { useEffect, useState } from "react";
import Loading from "./loading";
import NavigationBar from "@/components/_ui/navigationBar/navigationBar";

export default function Home() {
  const { isMobile } = useDevices();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsLoaded(true);
    }, 3000);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <Flex maw={"100vw"}>
      <Background />
      <NavigationBar />
      {
        !isLoaded
          ? (
            <Loading />
          )
          : (
            <>
              <Flex w={"100vw"} h={"max-content"} justify={"center"} align={"center"} direction={"column"} style={{
                backdropFilter: isMobile ? "blur(32px)" : "blur(64px)",
              }}>
                <Hero />
                <Group h={"100vh"}>
                  adsdasd
                </Group>
                <Group h={"100vh"}>
                  adsdasd
                </Group>
                <Group h={"100vh"}>
                  adsdasd
                </Group>
              </Flex>
            </>
          )
      }
    </Flex>
  );
}
