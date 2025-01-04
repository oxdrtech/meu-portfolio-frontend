"use client";
import { useGSAP } from "@gsap/react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { Flex, LoadingOverlay, Text } from "@mantine/core";
import gsap from "gsap";
import { useRef, useState } from "react";

interface Props {
  onComplete: () => void;
}

export default function Loading({ onComplete }: Props) {
  const gsapRef = useRef(null);
  const [progress, setProgress] = useState(0);

  useGSAP(() => {
    if (gsapRef.current) {
      gsap.timeline({
        onComplete,
      }).to(
        { count: 0 },
        {
          count: 100,
          delay: 1,
          duration: 5,
          ease: "sine.Out",
          onUpdate: function () {
            setProgress(Math.round(this.targets()[0].count));
          },
        }
      ).to(gsapRef.current, {
        delay: .2,
        duration: .2,
        opacity: 0,
        display: "none",
      });
    }
  }, [onComplete]);

  const loaderAnimation = (
    <Flex direction="column" align="center" justify="center" w={"100vw"} h={"100vh"}>
      <Flex w={"220"}>
        <DotLottieReact src="./loader.lottie" autoplay loop speed={1} />
      </Flex>
      <Text pos={"absolute"} fz={"5rem"} bottom={0} right={50} c={"defaultColor"}>
        {progress}
        <Text component="span" fz={"2rem"}>%</Text>
      </Text>
    </Flex>
  );

  return (
    <LoadingOverlay
      ref={gsapRef}
      visible={true}
      zIndex={1000}
      overlayProps={{ blur: 64 }}
      loaderProps={{
        children: loaderAnimation,
      }}
    />
  );
}
