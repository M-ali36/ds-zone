import * as React from "react"
import { Link } from "gatsby"

import Layout from "@components/layout"
import Seo from "@components/seo"
import Supplier from '@components/_Suppliers/Supplier'
import { useParams } from '@reach/router'; // For accessing URL parameters

const SupplierPage = ({params}) => {

  const { slug } = params;

  return (
    <Layout>
      <Supplier slug={slug} />
    </Layout>
  )
}


export const Head = () => <Seo title="View Supplier" />

export default SupplierPage
