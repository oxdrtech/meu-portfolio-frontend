import { useState } from "react";
import { ActionIcon, Modal, Paper, SimpleGrid, Textarea, TextInput } from "@mantine/core";
import { IconEdit } from "@tabler/icons-react";
import { useDisclosure } from "@mantine/hooks";
import { useSession } from "next-auth/react";
import { Contact, ContactPost } from "@/types/contact";
import themeDevices from "@/styles/themeDevices";
import ModalPatchDetails from "./modals/modalPatchDetails";

interface Props {
  contact: Contact;
}

export default function ContactDetail({ contact }: Props) {
  const { data: session } = useSession();
  const { isMobile, isDesktop } = themeDevices();
  const [opened, { open, close }] = useDisclosure(false);
  const [currentField, setCurrentField] = useState<keyof ContactPost>("name");
  const [inputValue, setInputValue] = useState<string>("");
  const [inputLabel, setInputLabel] = useState<string>("");

  const handleOpenModal = (label: string, value: string, field: keyof ContactPost) => {
    setInputLabel(label);
    setInputValue(value);
    setCurrentField(field);
    open();
  };

  const renderTextInput = (label: string, value: string, field: keyof ContactPost) => (
    <TextInput
      description={label}
      value={value}
      readOnly
      rightSection={
        <ActionIcon disabled={session?.user.role === "user"} onClick={() => handleOpenModal(label, value, field)} variant="transparent" c="dimmed" aria-label={label}>
          <IconEdit size={20} />
        </ActionIcon>
      }
    />
  );

  return (
    <>
      <Paper px={isDesktop ? '20' : '0'}>
        <SimpleGrid mt={10} mb={isDesktop ? '0' : '80'} cols={{ base: 1 }} spacing={20} verticalSpacing={15}>
          <SimpleGrid cols={{ base: 1, sm: 2 }}>
            {renderTextInput("Nome", contact.name, "name")}
            {renderTextInput("Telefone", contact.phoneNumber, "phoneNumber")}
          </SimpleGrid>
          <Textarea
            description={"Descrição do projeto"}
            value={contact.projectDescription}
            minRows={10}
            autosize
            readOnly
            rightSection={
              <ActionIcon disabled={session?.user.role === "user"} onClick={() => handleOpenModal("Descrição do projeto", contact.projectDescription, "projectDescription")} variant="transparent" c="dimmed" aria-label={"Descrição do projeto"}>
                <IconEdit size={20} />
              </ActionIcon>
            }
          />
        </SimpleGrid>
      </Paper>
      <Modal
        opened={opened}
        onClose={close}
        closeOnClickOutside={!isMobile}
        withCloseButton={isMobile}
        centered={!isMobile}
        transitionProps={{
          duration: 200,
          timingFunction: "easy",
        }}
        overlayProps={{
          backgroundOpacity: 0.55,
          blur: 3,
        }}
      >
        <ModalPatchDetails contact={contact} inputLabel={inputLabel} inputValue={inputValue} inputField={currentField} />
      </Modal>
    </>
  );
}
