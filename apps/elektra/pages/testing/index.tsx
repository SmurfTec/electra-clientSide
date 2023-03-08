import { CategoryCard, Footer, HeroImage, ModalDesign, ProductCard, UserDashboard } from '@elektra/components';
import { SearchBox } from '@elektra/ui';
import { Button, Group } from '@mantine/core';

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

const categoryData = [
  {
    id: 1,
    image: "/images/category.png",
    title: "Laptops",
    link: "#"
  },
  {
    id: 2,
    image: "/images/category.png",
    title: "Phones",
    link: "#"
  },
  {
    id: 3,
    image: "/images/category.png",
    title: "Phones",
    link: "#"
  },
  {
    id: 4,
    image: "/images/category.png",
    title: "Phones",
    link: "#"
  },
  {
    id: 5,
    image: "/images/category.png",
    title: "Phones",
    link: "#"
  },
  {
    id: 6,
    image: "/images/category.png",
    title: "Phones",
    link: "#"
  }
]

export default function Index() {
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

        <div style={{marginTop: "100px"}} className='grid lg:grid-cols-6 md:grid-cols-3 gap-12 place-content-center'>
          {categoryData.map((category)=> {
            return (
              <CategoryCard image={category.image} id={category.id} title={category.title} link={category.link} />
            )
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
      <div>
        <Group position="center">
          <ModalDesign />
        </Group>
      </div>
      <div className="mt-96">
        <Footer />
      </div>
    </div>
  );
}
