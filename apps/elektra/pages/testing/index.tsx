import { Footer, HeroImage, ProductCard } from '@elektra/components';
import { SearchBox } from '@elektra/ui';

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
  },
];

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
      
    </div>

      <div>
        <Footer />
      </div>
    </div>
  );
}
