"use client"
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { Flex, Group } from "@mantine/core";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";

export default function Background() {
  const gsapRef = useRef(null);

  useGSAP(() => {
    if (gsapRef.current) {
      gsap.to(gsapRef.current, {
        duration: 10,
        rotate: 360,
        repeat: -1,
        ease: "linear",
      })
    }
  }, [])

  return (
    <>
      <Flex pos={"absolute"} left={"0"} right={"0"} h={"100vh"} style={{
        overflow: "hidden",
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
