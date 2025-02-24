import { useActions } from "@/mocks/actions.mock";
import { Button, Stack } from "@mantine/core";

export default function TopNavigationDrawer() {
  const actions = useActions();

  return (
    <Stack>
      {actions.map(({ id, label, onClick }) => (
        <Button key={id} onClick={onClick}>
          {label}
        </Button>
      ))}
    </Stack>
  );
}
