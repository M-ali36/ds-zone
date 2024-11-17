import * as React from "react"
import { Link } from "gatsby"

import Layout from "@components/layout"
import Seo from "@components/seo"
import EditProduct from '@components/_Products/EditProduct'

const EditProductPage = ({params}) => {

  const { productId } = params;

  return (
    <Layout>
      <h1>Edit a Product</h1>
      <EditProduct productId={productId} />
    </Layout>
  )
}


export const Head = () => <Seo title="Using DSG" />

export default EditProductPage
