'use client'
import Background from "@/components/_ui/background/background";
import Hero from "@/components/_ui/hero/hero";
import useDevices from "@/hooks/useDevices";
import { Flex } from "@mantine/core";


export default function Home() {
  const { isMobile } = useDevices();

  return (
    <>
      <Background />
      <Flex h={"100vh"} w={"100vw"} justify={"center"} align={"center"} direction={"column"} style={{
        backdropFilter: isMobile ? "blur(32px)" : "blur(64px)"
      }}>
        <Hero />
      </Flex>
    </>
  );
}
