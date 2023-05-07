import { ContactUsForm, ContactUsHeader } from '@elektra/components';
import { Image, Title } from '@mantine/core';

export default function ContactUs() {
  return (
    <div className="px-6 mt-10">
      <ContactUsHeader />
      <div>
        <Title order={4} className="font-bold mt-10 inline-block">
          Hi User feel free to get in touch with us !
          <Image alt='Contact Us' className="inline-block ml-3" height={30} width={30} src="/images/clap.png" />
        </Title>
      </div>
      <ContactUsForm />
    </div>
  );
}
