import * as React from "react"
import { Link } from "gatsby"

import Layout from "@components/layout"
import Seo from "@components/seo"
import AddProject from '@components/_Projects/AddProject'

const AddProjectPage = () => (
  <Layout>
    <h1>Add a new project</h1>
    <AddProject />
  </Layout>
)

export const Head = () => <Seo title="Add Project" />

export default AddProjectPage
