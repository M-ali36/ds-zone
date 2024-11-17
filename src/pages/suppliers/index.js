import * as React from "react"
import { Link } from "gatsby"

import Layout from "@components/layout"
import Seo from "@components/seo"
import SuppliersList from '@components/_Suppliers/SuppliersList'

const ProjectListPage = () => (
  <Layout>
    <h1>Suppliers List</h1>
    <SuppliersList />
  </Layout>
)

export const Head = () => <Seo title="Suppliers" />

export default ProjectListPage
