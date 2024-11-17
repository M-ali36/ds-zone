import * as React from "react"
import { Link } from "gatsby"

import Layout from "@components/layout"
import Seo from "@components/seo"
import Product from '@components/_Products/Product'
import { useParams } from '@reach/router'; // For accessing URL parameters

const ProductPage = ({params}) => {

  const { productId } = params;

  return (
    <Layout>
      <Product productId={productId} />
    </Layout>
  )
}


export const Head = () => <Seo title="View Product" />

export default ProductPage
