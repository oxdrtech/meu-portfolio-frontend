"use client"
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { Flex, Group, Paper } from "@mantine/core";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";

export default function Background() {
  const gsapRef = useRef(null);

  useGSAP(() => {
    if (gsapRef.current) {
      gsap.set(".background-animated", {
        scale: .3,
        opacity: 0,
      });

      gsap
        .timeline()
        .to(".light-animated", {
          scale: 0,
          duration: .4,
        })
        .to(".background-animated", {
          scale: 1,
          opacity: 1,
          duration: 0.4,
        })
        .to(".background-animated", {
          opacity: 1,
          duration: 10,
          rotate: 360,
          repeat: -1,
          ease: "linear",
        });
    }
  }, { scope: gsapRef })

  return (
    <>
      <Flex ref={gsapRef} pos={"absolute"} left={"0"} right={"0"} h={"100vh"} style={{
        overflow: "hidden",
      }}>
        <Group className="background-animated" m={"auto"} h={"90vh"}>
          <DotLottieReact
            src="./background.lottie"
            speed={.5}
            loop
            autoplay
          />
        </Group>
        <Group>
          <Paper
            className="light-animated"
            radius="50%"
            w={"7000px"}
            h={"7000px"}
            bg={"defaultColor"}
            pos={"absolute"}
            style={{
              left: "50%",
              top: "50%",
              transform: "translate(-50%, -50%)",
            }}
          />
        </Group>
      </Flex>
    </>
  );
}
