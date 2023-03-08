import { EmailVerificationModel, Footer, HeroImage, Modal, PasswordChangeModel, ProductCard, SignUpSuccesfullModal, UserDashboard } from '@elektra/components';
import { SearchBox } from '@elektra/ui';
import { Button, Group } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';

const productData = [
  {
    id: 4,
    img: '/images/product.png',
    link: '#',
    title: 'Iphone X',
    description: '9/10 condition with charger and box',
    rating: 'New',
    wishlist: true,
    lowestPrice: null,
    highestPrice: 500,
    price: 187,
  },
  {
    id: 5,
    img: '/images/product.png',
    link: '#',
    title: 'Iphone 14 Pro max',
    description: '9/10 condition with charger and box',
    rating: null,
    wishlist: false,
    lowestPrice: null,
    highestPrice: 500,
    price: 187,
  },
];

export default function Index() {
  const [opened, { open, close }] = useDisclosure(false);
  return (
    <div>
      <div className="p-16">
        <div className="grid lg:grid-cols-5 md:grid-cols-3 gap-12 place-content-center">
          {productData.map((product) => {
            return (
              <ProductCard
                key={product.id}
                image={product.img}
                description={product.description}
                link={product.link}
                title={product.title}
                rating={product.rating}
                wishlist={product.wishlist}
                lowestPrice={product.lowestPrice ?? null}
                highestPrice={product.highestPrice ?? null}
                price={product.price}
              />
            );
          })}
        </div>
      </div>
      <div className="w-96 ml-96">
        <SearchBox />
      </div>
      <div>
        <HeroImage />
      </div>

      <div>
        <UserDashboard />
      </div>
      {/* <div>
        <Group position="center">
          <Modal title='Email Verification' children={<EmailVerificationModel email='huzayfahhanif@gmail.com.'  />} onClose={close} open={opened} />
          <Button onClick={open} >Email Verfication Model</Button>
        </Group>
      </div> */}
      {/* <div className="mt-16">
        <Group position="center">
          <Modal size={500} children={<SignUpSuccesfullModal   />} onClose={close} open={opened} />
          <Button onClick={open} >SignUp Succesfull Model</Button>
        </Group>
      </div> */}
      <div className="mt-16">
        <Group position="center">
          <Modal title='Change Password' children={<PasswordChangeModel   />} onClose={close} open={opened} />
          <Button onClick={open} >Password Change Model</Button>
        </Group>
      </div>
      <div className="mt-96">
        <Footer />
      </div>
    </div>
  );
}
