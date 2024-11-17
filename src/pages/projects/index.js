import * as React from "react"
import { Link } from "gatsby"

import Layout from "@components/layout"
import Seo from "@components/seo"
import ProjectsList from '@components/_Projects/ProjectsList'

const ProjectListPage = () => (
  <Layout>
    <h1>Projects List</h1>
    <ProjectsList />
  </Layout>
)

export const Head = () => <Seo title="Projects" />

export default ProjectListPage
