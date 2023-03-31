import { Container, Image, Text, useMantineTheme } from '@mantine/core';

export type FooterCardProps = {
  icon: string;
  heading: string;
  description: string;
};

export function FooterCard({ icon, heading, description }: FooterCardProps) {
  const theme = useMantineTheme();
  return (
    <Container className="relative">
      <div className="border border-solid border-[#65656545] rounded-2xl text-center p-10 pt-20">
        <Text className="font-[600]" size="xl">
          {heading}
        </Text>

        <Text color={'#B4B4B4'} size="sm">
          {description}
        </Text>
      </div>
      <div
        style={{
          boxShadow: '0px 11px 24px rgba(0, 0, 0, 0.05)',
        }}
        className="h-28 w-28 bg-white rounded-full absolute -top-1 left-1/2 -translate-x-1/2 -translate-y-1/2"
      >
        {/* <div className="relative"> */}
        <Image
          className="absolute -top-1 left-1/2 -translate-x-1/2 translate-y-1/2"
          src={icon}
          width="60px"
          height="60px"
          alt={icon}
        />
        {/* </div> */}
      </div>
    </Container>
  );
}
