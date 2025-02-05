import { NavigationButton } from "@/types/navigationButton";
import { IconBrandGithub, IconBrandLinkedin, IconSearch } from "@tabler/icons-react";

export const socialButtonsMock: NavigationButton[] = [
  {
    icon: IconBrandLinkedin,
    url: "https://www.linkedin.com/in/ddr23/",
  },
  {
    icon: IconBrandGithub,
    url: "https://github.com/DDR23",
  },
];

export const searchButtonsMock: NavigationButton[] = [
  {
    icon: IconSearch,
  },
];
