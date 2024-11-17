import * as React from "react"
import { Link } from "gatsby"

import Layout from "@components/layout"
import Seo from "@components/seo"
import ProductGroups from '@components/_ProductGroups/ProductGroups'

const ProductGroupsPage = () => (
  <Layout>
    <h1>Product Groups List</h1>
    <ProductGroups />
  </Layout>
)

export const Head = () => <Seo title="Product Groups List" />

export default ProductGroupsPage
