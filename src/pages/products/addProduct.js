import * as React from "react"
import { Link } from "gatsby"

import Layout from "@components/layout"
import Seo from "@components/seo"
import AddProduct from '@components/_Products/AddProduct'

const AddProductPage = () => (
  <Layout>
    <h1>Add a new Product</h1>
    <AddProduct />
  </Layout>
)

export const Head = () => <Seo title="Add Product" />

export default AddProductPage
