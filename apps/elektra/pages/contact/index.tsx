import { ContactUsForm, ContactUsHeader } from '@elektra/components';
import { Image, Title } from '@mantine/core';

export default function ContactUs() {
  return (
    <div className="px-6 mt-10">
      <ContactUsHeader />
      <div>
        <Title order={4} className="font-bold mt-16 mr-2 inline-block">
          Hi User feel free to get in touch with us !
        </Title>
        <Image className="inline-block" height={30} width={30} src="/images/clap.png" />
      </div>
      <ContactUsForm />
    </div>
  );
}
