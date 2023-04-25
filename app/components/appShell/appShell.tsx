import { ReactNode } from 'react';

type AppShellProps = {
  header: ReactNode;
  children: ReactNode;
  footer: ReactNode;
};

export const AppShell = ({ header, children, footer }: AppShellProps) => {
  return (
    <>
      {header}
      {children}
      {footer}
    </>
  );
};
