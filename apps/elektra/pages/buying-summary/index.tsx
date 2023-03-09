import { Container, Grid } from "@mantine/core";
import { ProductDetail } from "apps/elektra/app/components/pages/buying-summary/productDetail";
import { PageTitle } from "apps/elektra/app/components/pageTitle";

const productDetailData = {
    image: "/images/product.png",
  title: "Iphone 14 Pro Max",
  space: "128 GB",
  color: "Black",
  company: "AT&T",
  condition: "New",
  expiration: "23/10/2023",
  cardDetails: "3646 **** **** ****",
  address: "16 Street , Town Abc, City, USA , 213434"
}

export default function BuyingSummary() {
  return <Container mt={50} fluid>
    <PageTitle title="Buying Summary" />

    <Grid>
        <Grid.Col>
            <ProductDetail data={productDetailData} />
        </Grid.Col>
    </Grid>
  </Container>;
}
