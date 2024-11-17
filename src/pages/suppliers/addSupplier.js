import * as React from "react"
import { Link } from "gatsby"

import Layout from "@components/layout"
import Seo from "@components/seo"
import AddSupplier from '@components/_Suppliers/AddSupplier'

const AddSupplierPage = () => (
  <Layout>
    <h1>Add a new Supplier</h1>
    <AddSupplier />
  </Layout>
)

export const Head = () => <Seo title="Add Supplier" />

export default AddSupplierPage
