import { Button, Container, Group, Title } from '@mantine/core';
import { NextLink } from '@mantine/next';
import { ArrowNarrowRight } from 'tabler-icons-react';
import { ProductCard } from '../app/components/card';
import { HeroImage } from '../app/components/hero';

export function Index() {
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
    },{
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
    },{
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
  return (
    <Container fluid>
      <section className="mt-10">
        <HeroImage />
      </section>

      <section className="mt-10">
        <div>
          <Group position="apart">
            <Title className="font-bold" order={4}>
              Recommended For You
            </Title>
            <div>
              <Group position="apart">
                <Title order={5}>View All</Title>
                <Button
                  className="rounded-3xl px-4 h-7"
                  styles={{
                    root: {
                      '&:not([data-disabled]):hover': {
                        backgroundColor: 'white',
                      },
                    },
                    rightIcon: {
                      marginLeft: 0,
                    },
                  }}
                  rightIcon={<ArrowNarrowRight size={30} strokeWidth={1} />}
                  variant="outline"
                  component={NextLink}
                  href="#"
                />
              </Group>
            </div>
          </Group>
        </div>

        <div className='grid lg:grid-cols-5 md:grid-cols-3 gap-12 place-content-center mt-5'>
        {productData.map((product,index) => {
            return (
              <ProductCard
                key={product.id+index}
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
      </section>
    </Container>
  );
}

export default Index;
