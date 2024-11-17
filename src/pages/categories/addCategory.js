import * as React from "react"
import { Link } from "gatsby"

import Layout from "@components/layout"
import Seo from "@components/seo"
import AddCategory from '@components/_Categories/AddCategory'

const AddCategoryPage = () => (
  <Layout>
    <h1>Add a new category</h1>
    <AddCategory />
  </Layout>
)

export const Head = () => <Seo title="Add Category" />

export default AddCategoryPage
