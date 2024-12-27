"use client";
import { createTheme, rem } from "@mantine/core";

export const theme = createTheme({
  primaryColor: 'defaultColor',
  fontFamily: 'Sulphur Point, serif',
  fontFamilyMonospace: 'Space Mono, monospace',
  fontSizes: {
    xs: rem(12),
    sm: rem(14),
    md: rem(16),
    lg: rem(18),
    xl: rem(20),
  },
  colors: {
    defaultColor: [
      "#fbffe2",
      "#f8ffcc",
      "#f0ff9a",
      "#e8ff64",
      "#e2ff38",
      "#deff1d",
      "#dbff09",
      "#c2e300",
      "#abca00",
      "#92ae00"
    ],
  },
});
