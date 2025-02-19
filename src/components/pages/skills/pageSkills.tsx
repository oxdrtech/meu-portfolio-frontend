import themeDevices from "@/styles/themeDevices";
import { Button, Flex, Highlight, Image, Paper, Stack, Title } from "@mantine/core";
import './index.css'

const iconTechs = [
  { src: "./icons/icon-docker.webp" },
  { src: "./icons/icon-expressjs.webp" },
  { src: "./icons/icon-figma.webp" },
  { src: "./icons/icon-git.webp" },
  { src: "./icons/icon-gsap.webp" },
  { src: "./icons/icon-javascript.webp" },
  { src: "./icons/icon-jest.webp" },
  { src: "./icons/icon-mantine.webp" },
  { src: "./icons/icon-mongodb.webp" },
  { src: "./icons/icon-mysql.webp" },
  { src: "./icons/icon-nestjs.webp" },
  { src: "./icons/icon-nextjs.webp" },
  { src: "./icons/icon-postgres.webp" },
  { src: "./icons/icon-postman.webp" },
  { src: "./icons/icon-prisma.webp" },
  { src: "./icons/icon-redis.webp" },
  { src: "./icons/icon-typescript.webp" },
  { src: "./icons/icon-vercel.webp" },
  { src: "./icons/icon-vite.webp" },
]

export default function PageSkills() {
  const { isMobile, isDesktop } = themeDevices();

  const animationTechs = iconTechs.map((icon, index) => (
    <li key={index}>
      <Image src={icon.src} alt="techs" />
    </li>
  ))

  return (
    <>
      <Flex className="panel" id="habilidades" w={"100vw"} h={"100vh"} justify={"center"} direction={"column"} style={{
        scrollSnapAlign: "start",
      }}>
        <Flex m={"56 10 10 10"} pos={"relative"} flex={"1"} justify={"center"} bg={"#11111150"} style={{
          borderRadius: "16px",
          overflow: "hidden",
        }}>
          <ul className="techs">
            {animationTechs}
          </ul>
          <Stack h={"100%"} p={"lg"} align={"center"} justify={"center"} gap={"xl"} style={{
            backdropFilter: "blur(1px)",
          }}>
            <Stack w={isMobile ? "90vw" : "80vw"} gap={"0"}>
              <Highlight
                highlight={[
                  "modernas",
                  "sólida",
                  "evolução",
                ]}
                highlightStyles={{
                  color: "#DAFF01",
                  WebkitBackgroundClip: 'text',
                }}
                fz={isMobile ? "h3" : !isDesktop ? "h2" : "h1"}
                fw={"lighter"}
                inline
              >
                Com as ferramentas mais modernas e boas práticas de desenvolvimento, cada projeto ganha uma base sólida, preparada para uma evolução contínua
              </Highlight>
            </Stack>
            <Paper w={isMobile ? "90vw" : "80vw"} h={1} bg={"defaultColor"} />
            <Stack w={isMobile ? "90vw" : "80vw"} align={"flex-start"}>
              <Button variant="light" component="a" href="#contato" px={"xl"}>
                Vamos trabalhar juntos
              </Button>
            </Stack>
            <Stack w={isMobile ? "90vw" : "80vw"} gap={"0"} ta={"end"}>
              <Title order={2} fz={isMobile ? "h3" : ""}>
                Soluções reais
              </Title>
              <Title order={2} fz={isMobile ? "h3" : ""}>
                que impactam
              </Title>
              <Title order={2} fz={isMobile ? "h3" : ""}>
                os negócios
              </Title>
            </Stack>
          </Stack>
        </Flex>
      </Flex>
    </>
  );
}
