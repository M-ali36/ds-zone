import * as React from "react"
import { Link } from "gatsby"

import Layout from "@components/layout"
import Seo from "@components/seo"
import EditSupplier from '@components/_Suppliers/EditSupplier'
import { useParams } from '@reach/router'; // For accessing URL parameters

const EditSupplierPage = ({params}) => {

  const { supplierId } = params;

  return (
    <Layout>
      <h1>Edit a Supplier</h1>
      <EditSupplier supplierId={supplierId} />
    </Layout>
  )
}


export const Head = () => <Seo title="Edit Supplier" />

export default EditSupplierPage
