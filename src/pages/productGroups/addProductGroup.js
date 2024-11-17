import * as React from "react"
import { Link } from "gatsby"

import Layout from "@components/layout"
import Seo from "@components/seo"
import AddProductGroup from '@components/_ProductGroups/AddProductGroup'

const AddProductGroupPage = () => (
  <Layout>
    <h1>Add a new Product Group</h1>
    <AddProductGroup />
  </Layout>
)

export const Head = () => <Seo title="Add Product Group" />

export default AddProductGroupPage
