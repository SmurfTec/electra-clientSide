import { Title } from "@elektra/ui";
import { Divider } from "@mantine/core";


type PageTitleProps = {
    title: string;
  };
export function PageTitle({title}: PageTitleProps) {
  return <div>
    <Title order={4}>{title}</Title>
    <Divider className="my-4"/>
  </div>;
}
