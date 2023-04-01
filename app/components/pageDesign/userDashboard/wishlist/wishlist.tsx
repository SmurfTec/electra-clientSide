import { ProductCard } from '../../../card';

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
    rating: 'Used',
    wishlist: false,
    lowestPrice: null,
    highestPrice: 500,
    price: 187,
  },
  {
    id: 6,
    img: '/images/product.png',
    link: '#',
    title: 'Iphone 14 Pro max',
    description: '9/10 condition with charger and box',
    rating: 'New',
    wishlist: false,
    lowestPrice: null,
    highestPrice: 500,
    price: 187,
  },
  {
    id: 7,
    img: '/images/product.png',
    link: '#',
    title: 'Iphone 14 Pro max',
    description: '9/10 condition with charger and box',
    rating: 'Used',
    wishlist: false,
    lowestPrice: null,
    highestPrice: 500,
    price: 187,
  },
  {
    id: 8,
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
    id: 9,
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
    id: 10,
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

export function WishList() {
  return (
    <div className="grid lg:grid-cols-5 md:grid-cols-3 gap-12 place-content-center mt-5">
      {productData.map((product) => {
        return (
          <ProductCard
            id={product.id}
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
  );
}
