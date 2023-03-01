// import { Paper, Text } from '@mantine/core';
// import Image, { StaticImageData } from 'next/image';
// import { Heart } from 'tabler-icons-react';

// type ProductCardProps = {
//   name: string;
//   capacity: string;
//   image: StaticImageData;
//   color: string;
//   carrier: string;
//   price: number;
//   wishlist: boolean
// };

// export function ProductCard({
//   image,
//   name,
//   capacity,
//   color,
//   carrier,
//   price,
//   wishlist,
// }: ProductCardProps) {
//   return (
//     <Paper className="">
//       {/* //TODO: need to make color appear from theme */}
//       <Paper className="bg-[#F5F5F5] p-20 flex justify-center items-center">
//         <Image src={image} alt={name} className="" />
//       </Paper>
//       <Paper className="flex justify-between mt-5">
//         <Text>{name}</Text>
// <Heart className='cursor-pointer' size={23} strokeWidth={1.5} fill={wishlist ? "red": "white"} color={wishlist ? "red" : undefined}/>
//       </Paper>
//       <Paper className='grid grid-cols-3 gap-3 mt-5'>
//         <Text size={"xs"}>Capacity <br /> <span className='font-bold'>{capacity}</span> </Text>
//         <Text size={"xs"}>Color <br /> <span className='font-bold'>{color}</span> </Text>
//         <Text size={"xs"}>Carrier <br /> <span className='font-bold'>{carrier}</span> </Text>
//       </Paper>
//       <Paper className='mt-5'>
//         <Text size={"xs"} className='inline-block'>Used Starting at</Text> <Text size={"xs"} className='inline-block font-bold'>${price}</Text>
//       </Paper>
//     </Paper>
//   );
// }

import { Only } from '@elektra/ui';
import { Badge, Card, createStyles, Group, Image, Text } from '@mantine/core';
import { Heart } from 'tabler-icons-react';

const useStyles = createStyles((theme) => ({
  card: {
    position: 'relative',
    borderRadius: '0',
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
  },

  rating: {
    position: 'absolute',
    top: theme.spacing.xs,
    right: theme.spacing.xs + 2,
    pointerEvents: 'none',
    backgroundColor: 'black',
    color: 'white',
  },

  title: {
    display: 'block',
    marginTop: theme.spacing.md,
    marginBottom: theme.spacing.xs / 2,
  },

  action: {
    marginTop: theme.spacing.md,
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
    ...theme.fn.hover({
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[1],
    }),
  },

  footer: {
    marginTop: theme.spacing.md,
  },
}));

type ProductCardProps = {
  image: string;
  link: string;
  title: string;
  description: string;
  rating: string;
  wishlist: boolean;
};

export function ProductCard({
  className,
  image,
  link,
  title,
  description,
  wishlist,
  rating,
  ...others
}: ProductCardProps & Omit<React.ComponentPropsWithoutRef<'div'>, keyof ProductCardProps>) {
  const { classes, cx } = useStyles();
  const linkProps = {
    href: link,
    target: '_blank',
    rel: 'noopener noreferrer',
  };

  return (
    <Card className={cx(classes.card, className)} {...others}>
      <Card.Section>
        <a {...linkProps}>
          <Image src={image} alt={title} height={180} />
        </a>
      </Card.Section>

      <Only when={!!rating}>
        <Badge className={classes.rating}>{rating}</Badge>
      </Only>
      <Card.Section>
        <Group position="apart">
          <Text className={classes.title} weight={500} component="a" {...linkProps}>
            {title}
          </Text>
          <Heart
            className="cursor-pointer"
            size={23}
            strokeWidth={1.5}
            fill={wishlist ? 'red' : 'white'}
            color={wishlist ? 'red' : undefined}
          />
          {/* </ActionIcon> */}
        </Group>

        <Text size="sm" color="dimmed" lineClamp={4}>
          Condition : {description}
        </Text>
      </Card.Section>
    </Card>
  );
}
