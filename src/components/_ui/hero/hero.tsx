import useDevices from "@/hooks/useDevices";
import { Group, Paper, Stack, Text } from "@mantine/core";

export default function Hero() {
  const { isMobile } = useDevices();

  return (
    <>
      <Stack maw={"90vw"} gap={0} mt={"400"}>
        <Text component={"h1"} fw={"bold"} fz={"8vw"} ta={"end"} inline>
          Desenvolvedor Web
        </Text>
        <Group>
          <Paper flex={1} h={2} bg={"defaultColor"}></Paper>
          <Text component="h1" c={"dimmed"} fw={"normal"} fz={isMobile ? "md" : 'xl'} ta={"end"} inline>
            FULLSTACK | React & Node
          </Text>
        </Group>
      </Stack>
    </>
  )
}
