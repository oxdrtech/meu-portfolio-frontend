import { ActionIcon, Badge, Card, Group, Modal, Paper, Stack, Text, Tooltip } from "@mantine/core"
import { IconSettings } from "@tabler/icons-react"
import { useClipboard, useDisclosure } from "@mantine/hooks"
import { useSession } from "next-auth/react";
import { Contact } from "@/types/contact";
import themeDevices from "@/styles/themeDevices";
import MenuNavigation from "@/components/_ui/menuNavigation/menuNavigation";
import ModalPatchStatus from "./modals/modalPatchStatus";
import ContactDetail from "./contactDetails";

interface Props {
  contact: Contact;
}

export default function PageContact({ contact }: Props) {
  const { data: session } = useSession();
  const { isDesktop } = themeDevices();
  const [opened, { open, close }] = useDisclosure(false);
  const clipboard = useClipboard({ timeout: 500 });

  return (
    <>
      <Stack h="100%" align="center" m={"auto"}>
        <MenuNavigation />
        <Card w={"80vw"} p="20" radius={10} style={{
          backgroundPosition: "right"
        }}>
          <Group justify="space-between">
            <Stack gap={"0"}>
              <Text fz={"xs"} c={clipboard.copied ? "#DAFF01" : "dimmed"} inline onClick={() => clipboard.copy(contact.id)} style={{
                cursor: "pointer",
              }}>{clipboard.copied ? 'copiado' : contact.id}</Text>
              <Group>
                <Text my={5} size="lg" inline>
                  {
                    contact.name
                      .split(" ")
                      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
                      .join(" ")
                  }
                </Text>
                {
                  contact.status === "pending"
                    ? <Badge variant="default" c="#fc8a08">Pendente</Badge>
                    : contact.status === "responded"
                      ? <Badge variant="default" c="#DAFF01">Respondido</Badge>
                      : <Badge variant="default" c="dimmed">desativ.</Badge>
                }
              </Group>
            </Stack>
            <Tooltip color="gray" label="Alterar status" position="bottom">
              <ActionIcon disabled={session?.user.role === "user"} onClick={open} variant="light" aria-label="Status">
                <IconSettings size={20} />
              </ActionIcon>
            </Tooltip>
          </Group>
        </Card>
        <Paper w={"80vw"} h="100%" >
          <ContactDetail contact={contact} />
        </Paper>
      </Stack>
      <Modal
        opened={opened}
        onClose={close}
        withCloseButton={false}
        centered
        transitionProps={{
          duration: 200,
          timingFunction: "easy",
        }}
        overlayProps={{
          backgroundOpacity: 0.55,
          blur: 3
        }}
      >
        <ModalPatchStatus contact={contact} />
      </Modal>
    </>
  );
}