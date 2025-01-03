import { useEffect } from "react";
import useDevices from "@/hooks/useDevices";
import useGet from "@/hooks/useGet";
import { userDetails } from "@/types/userDetails";
import { API_GIT_URL } from "@/utils/apiGitUrl";
import { Avatar, Flex, Group, Paper, Stack, Text } from "@mantine/core";

export default function Hero() {
  const { isDesktop, isMobile } = useDevices();
  const { response, sendRequest } = useGet<userDetails>(`${API_GIT_URL}/users/DDR23`);

  useEffect(() => {
    sendRequest();
  }, []);

  if (!response) return;

  return (
    <>
      <Stack h={"90vh"} gap={0} justify={"center"} pt={"15vw"}>
        <Paper bg={"defaultColor"} mx={"auto"} mb={"xl"} radius={"50%"} p={2} shadow="xl">
          <Avatar size={isMobile ? "200" : "300"} src={response.data.avatar_url} />
        </Paper>
        <Text component={"h1"} fw={"bold"} fz={"8vw"} ta={"end"} inline>
          Desenvolvedor Web
        </Text>
        <Group>
          <Paper flex={1} h={2} bg={"defaultColor"}></Paper>
          <Text component="h1" fw={"normal"} fz={isMobile ? "md" : "xl"} ta={"end"} inline>
            FULLSTACK | React & Node
          </Text>
        </Group>
      </Stack>
    </>
  );
}
