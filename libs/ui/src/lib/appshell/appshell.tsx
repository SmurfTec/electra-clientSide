import {
  AppShell as MAppShell,
  AppShellProps,
  useMantineTheme,
} from '@mantine/core';

export function AppShell({
  children,
  footer,
  header,
  navbar,
  aside,
}: AppShellProps) {
  const theme = useMantineTheme();

  return (
    <MAppShell
      aside={aside}
      asideOffsetBreakpoint="sm"
      footer={footer}
      header={header}
      navbar={navbar ?? undefined}
      navbarOffsetBreakpoint="sm"
      styles={{
        main: {
          background:
            theme.colorScheme === 'dark'
              ? theme.colors['dark'][8]
              : theme.colors['gary'],
        },
      }}
    >
      {children}
    </MAppShell>
  );
}
