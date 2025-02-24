import { useActions } from "@/mocks/actions.mock";
import { Button, Stack } from "@mantine/core";

export default function TopNavigationDrawer() {
  const actions = useActions();

  return (
    <Stack>
      {actions.map((action) => (
        <Button
          key={action.id}
          onClick={action.onClick}
          variant={"light"}
          rightSection={action.leftSection}
          justify="space-between"
        >
          {action.label}
        </Button>
      ))}
    </Stack>
  );
}
