import { useActions } from "@/mocks/actions.mock";
import { Spotlight } from "@mantine/spotlight";
import { IconSearch } from "@tabler/icons-react";

export default function CustomSpotlight() {
  const actions = useActions();

  return (
    <Spotlight
      actions={actions}
      nothingFound="Não encontrado..."
      highlightQuery
      shortcut="ctrl+k"
      searchProps={{
        leftSection: <IconSearch size={22} />,
        placeholder: "Pesquisar...",
      }}
    />
  );
}
