import { skillsMock } from "@/mocks/skills.mock";
import themeDevices from "@/styles/themeDevices";
import { Card, Flex, Highlight, Stack, Table } from "@mantine/core";

export default function Skills() {
  const { isMobile } = themeDevices();

  const rows = skillsMock.map((skill, index) => (
    <Table.Tr key={index}>
      <Table.Td py={"md"} pr={"lg"}>
        {/* mock */}
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <>
      <Flex className="panel" id="habilidades" h={"100vh"} justify={"center"} align={"center"} style={{
        scrollSnapAlign: "start",
      }}>
        <Stack h={"90vh"} w={"70rem"} maw={"90vw"} justify="space-around" align={"center"} gap={"xl"}>
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
            ta={"center"}
            fw={"bold"}
            fz={isMobile ? "h4" : "h1"}
            mt={isMobile ? "40" : "80"}
            inline
            style={{
              textShadow: "-2px 2px 1px rgba(89, 112, 8, 0.50)",
            }}>
            Com as tecnologias mais modernas e boas práticas de desenvolvimento, cada projeto ganha uma base sólida, preparada para uma evolução contínua
          </Highlight>
          <Stack justify={"center"}>
            <Card p={"0"} radius={"md"} style={{
              backdropFilter: "blur(100px)",
              background: "#23232350"
            }}>
              <Table highlightOnHover>
                <Table.Tbody>
                  {rows}
                </Table.Tbody>
              </Table>
            </Card>
          </Stack>
        </Stack>
      </Flex>
    </>
  );
}
