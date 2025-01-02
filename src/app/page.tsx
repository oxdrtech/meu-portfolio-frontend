'use client'
import Background from "@/components/_ui/background/background";
import useDevices from "@/hooks/useDevices";
import { Group } from "@mantine/core";


export default function Home() {
  const { isDesktop, isMobile } = useDevices();

  return (
    <>
      <Background />
      <Group
        h={"100vh"}
        style={isDesktop ? { backdropFilter: 'blur(64px)' } : { backdropFilter: 'blur(32px)' }}
      >
        {
          isDesktop
            ? "PC"
            : isMobile
              ? "mobile"
              : "tablet"
        }
      </Group>
    </>
  );
}
