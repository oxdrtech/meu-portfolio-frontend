"use client";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { LoadingOverlay } from "@mantine/core";

export default function Loading() {
  const loaderAnimation = (
    <DotLottieReact
      src="./loader.lottie"
      speed={1}
      loop
      autoplay
    />
  );

  return (
    <>
      <LoadingOverlay
        visible={true}
        zIndex={1000}
        overlayProps={{
          radius: "sm",
          blur: 64,
        }}
        loaderProps={{
          children: loaderAnimation,
        }}
      />
    </>
  );
}
