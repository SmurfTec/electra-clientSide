import { Container, Image, Text } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';

export type FooterCardProps = {
  icon: string;
  heading: string;
  description: string;
};

export function FooterCard({ icon, heading, description }: FooterCardProps) {
  const phone = useMediaQuery('(max-width: 600px)');
  return (
    <Container className="relative w-full">
      <div className="border border-solid border-[#65656545] rounded-2xl text-center p-3 xs:p-5 pt-14">
        <Text className="font-[600]" size={phone ? 11 : 'xl'}>
          {heading}
        </Text>

        <Text color={'#B4B4B4'} size={phone ? 10 : 'sm'}>
          {description}
        </Text>
      </div>
      <div
        style={{
          // boxShadow: '0px 11px 24px rgba(0, 0, 0, 0.05)',
        }}
        className="absolute -top-[60px]  left-1/2 -translate-x-1/2 "
      >
        {/* <div className="relative"> */}
        <Image
          src={icon}
          width="130px"
          height="130px"
          alt={icon}
        />
        {/* </div> */}
      </div>
    </Container>
  );
}
