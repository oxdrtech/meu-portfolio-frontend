"use client";
import { createTheme, rem } from "@mantine/core";
import { themeColors } from "./themeColors";

export const theme = createTheme({
  primaryColor: 'defaultColor',
  fontFamily: 'Sulphur Point, serif',
  fontFamilyMonospace: 'Space Mono, monospace',
  headings: {
    sizes: {
      h1: {
        fontSize: rem(64),
        lineHeight: "100%",
        fontWeight: "lighter"
      },
      h2: {
        fontSize: rem(40),
        lineHeight: "100%",
        fontWeight: "lighter"
      },
      h3: {
        fontSize: rem(24),
        lineHeight: "100%",
        fontWeight: "lighter"
      },
      h4: {
        fontSize: rem(18),
        lineHeight: "100%",
      },
    }
  },
  fontSizes: {
    xs: rem(12),
    sm: rem(14),
    md: rem(16),
    lg: rem(18),
    xl: rem(20),
  },
  colors: themeColors,
});
