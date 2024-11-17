import * as React from "react"
import { Link } from "gatsby"

import Layout from "@components/layout"
import Seo from "@components/seo"
import ProductsList from '@components/_Products/ProductsList'

const ProductListPage = () => (
  <Layout>
    <h1>Products List</h1>
    <ProductsList />
  </Layout>
)

export const Head = () => <Seo title="Products" />

export default ProductListPage
