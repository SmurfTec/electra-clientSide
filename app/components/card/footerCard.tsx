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
        <Text className="font-[600]" size={phone ? 12 : 'xl'}>
          {heading}
        </Text>

        <Text color={'#B4B4B4'} size={phone ? 10 : 'sm'}>
          {description}
        </Text>
      </div>
      <div
        style={{
          boxShadow: '0px 11px 24px rgba(0, 0, 0, 0.05)',
        }}
        className="sm:h-28 sm:w-28 h-20 w-20 bg-white rounded-full absolute -top-1 left-1/2 -translate-x-1/2 -translate-y-1/2"
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
