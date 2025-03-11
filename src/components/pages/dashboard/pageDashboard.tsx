import themeDevices from "@/styles/themeDevices";
import { Contact } from "@/types/contact";
import { Group, Stack, Text } from "@mantine/core";
import ContactsList from "./contactsList";

interface Props {
  contacts: Contact[];
  pendingContacts: number;
  respondedContacts: number;
  rejectedContacts: number;
}

export default function PageDashboard({
  contacts,
  pendingContacts,
  respondedContacts,
  rejectedContacts,
}: Props) {

  return (
    <Stack h="100%" align="center" gap={"xl"}>
      <Stack gap={5} align={"center"} my={"lg"}>
        <Text size="lg">Resumo dos contatos</Text>
        <Group ta={"center"}>
          <Stack gap={0}>
            <Text size="lg">{contacts.length}</Text>
            <Text fz="xs" c="dimmed">Total</Text>
          </Stack>
          <Stack gap={0}>
            <Text size="lg">{pendingContacts}</Text>
            <Text fz="xs" c="dimmed">Pendentes</Text>
          </Stack>
          <Stack gap={0}>
            <Text size="lg">{respondedContacts}</Text>
            <Text fz="xs" c="dimmed">Respondidos</Text>
          </Stack>
          <Stack gap={0}>
            <Text size="lg">{rejectedContacts}</Text>
            <Text fz="xs" c="dimmed">Rejeitados</Text>
          </Stack>
        </Group>
      </Stack>
      <ContactsList contacts={contacts} />
    </Stack>
  );
}
