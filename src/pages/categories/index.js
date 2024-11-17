import * as React from "react"
import { Link } from "gatsby"

import Layout from "@components/layout"
import Seo from "@components/seo"
import CategoriesList from '@components/_Categories/CategoriesList'

const CategoryListPage = () => (
  <Layout>
    <h1>Categories List</h1>
    <CategoriesList />
  </Layout>
)

export const Head = () => <Seo title="All Categories" />

export default CategoryListPage
