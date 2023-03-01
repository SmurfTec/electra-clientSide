import { HeroImage, ProductCard } from "@elektra/components";


const productData = [
  {
    id: 1,
    img: 'https://www.91-img.com/gallery_images_uploads/d/7/d7cf5e2b1a3a3dfcca8a8dbb524fb11a8fb1c8e8.JPG?tr=h-550,w-0,c-at_max',
    link: '#',
    title: 'Iphone X',
    description: '9/10 condition with charger and box',
    rating: 'New',
    wishlist: true,
  },
  {
    id: 2,
    img: 'https://www.91-img.com/gallery_images_uploads/d/7/d7cf5e2b1a3a3dfcca8a8dbb524fb11a8fb1c8e8.JPG?tr=h-550,w-0,c-at_max',
    link: '#',
    title: 'Iphone X',
    description: '9/10 condition with charger and box',
    rating: 'New',
    wishlist: true,
  },
  {
    id: 3,
    img: 'https://www.91-img.com/gallery_images_uploads/d/7/d7cf5e2b1a3a3dfcca8a8dbb524fb11a8fb1c8e8.JPG?tr=h-550,w-0,c-at_max',
    link: '#',
    title: 'Iphone X',
    description: '9/10 condition with charger and box',
    rating: 'New',
    wishlist: true,
  },
  {
    id: 3,
    img: 'https://www.91-img.com/gallery_images_uploads/d/7/d7cf5e2b1a3a3dfcca8a8dbb524fb11a8fb1c8e8.JPG?tr=h-550,w-0,c-at_max',
    link: '#',
    title: 'Iphone X',
    description: '9/10 condition with charger and box',
    rating: null,
    wishlist: true,
  },
  {
    id: 4,
    img: 'https://www.91-img.com/gallery_images_uploads/d/7/d7cf5e2b1a3a3dfcca8a8dbb524fb11a8fb1c8e8.JPG?tr=h-550,w-0,c-at_max',
    link: '#',
    title: 'Iphone X',
    description: '9/10 condition with charger and box',
    rating: 'New',
    wishlist: true,
  },
  {
    id: 5,
    img: 'https://www.91-img.com/gallery_images_uploads/d/7/d7cf5e2b1a3a3dfcca8a8dbb524fb11a8fb1c8e8.JPG?tr=h-550,w-0,c-at_max',
    link: '#',
    title: 'Iphone 14 Pro max',
    description: '9/10 condition with charger and box',
    rating: null,
    wishlist: false,
  },
];

export default function Index() {
  return (
    <div>
    <div className='p-16'>
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
          />
        );
      })}
    </div>
    </div>

    <div>
     <HeroImage />
    </div>
    </div>
  );
}
