import * as React from "react"
import { Link } from "gatsby"

import Layout from "@components/layout"
import Seo from "@components/seo"
import ProductGroup from '@components/_ProductGroups/ProductGroup'
import { useParams } from '@reach/router'; // For accessing URL parameters

const ProductGroupPage = ({params}) => {

  const { slug } = params;

  return (
    <Layout>
      <h1>View a Product Group</h1>
      <ProductGroup slug={slug} />
    </Layout>
  )
}


export const Head = () => <Seo title="Product Group" />

export default ProductGroupPage
