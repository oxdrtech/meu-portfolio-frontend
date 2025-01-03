"use client"
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { Flex, Group } from "@mantine/core";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";

export default function Background() {
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
      <Flex pos={"absolute"} left={"0"} right={"0"} h={"100vh"} style={{
        overflow: "hidden",
        zIndex: -1,
      }}>
        <Group ref={gsapRef} m={"auto"} h={"90vh"}>
          <DotLottieReact
            src="./background.lottie"
            speed={.5}
            loop
            autoplay
          />
        </Group>
      </Flex>
    </>
  );
}
