import useDevices from "@/hooks/useDevices";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { Flex, Group } from "@mantine/core";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";

export default function Background() {
  const { isDesktop, isMobile } = useDevices();
  const gsapRef = useRef(null);

  useGSAP(() => {
    gsap.to(gsapRef.current, {
      duration: 20,
      rotate: 320,
      repeat: -1,
      yoyo: true,
      ease: "linear",
    })
  })

  return (
    <>
      <Flex pos={"absolute"} w={"100vw"} h={"100vh"} style={{ overflow: "hidden" }}>
        <Group ref={gsapRef} m={"auto"} h={isDesktop ? "80vh" : isMobile ? "50vh" : "80vh"}>
          <DotLottieReact
            src="https://lottie.host/41b073e5-4b4e-4c29-a389-93ecdf227112/3vxKieNuX6.lottie"
            speed={.5}
            loop
            autoplay
          />
        </Group>
      </Flex>
    </>
  )
}
