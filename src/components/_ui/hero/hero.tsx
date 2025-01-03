import useDevices from "@/hooks/useDevices";
import useGet from "@/hooks/useGet";
import { userDetails } from "@/types/userDetails";
import { API_GIT_URL } from "@/utils/apiGitUrl";
import { Avatar, Group, Paper, Stack, Text } from "@mantine/core";
import { useEffect } from "react";

export default function Hero() {
  const { isDesktop, isMobile } = useDevices();
  const { response, sendRequest } = useGet<userDetails>(`${API_GIT_URL}/users/DDR23`);

  useEffect(() => {
    sendRequest();
  }, [])

  if (!response) return <>Loading...</>; // TODO - adicionar loading

  return (
    <>
      <Stack maw={"90vw"} gap={0} mt={"130"}>
        <Paper bg={'defaultColor'} m='auto' mb={"50"} radius={"50%"} p={2} shadow="xl">
          <Avatar size={isDesktop ? "300" : "200"} src={response.data.avatar_url} />
        </Paper>
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
