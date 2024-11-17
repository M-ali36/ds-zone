import * as React from "react"
import { Link } from "gatsby"

import Layout from "@components/layout"
import Seo from "@components/seo"
import Project from '@components/_Projects/Project'
import { useParams } from '@reach/router'; // For accessing URL parameters

const ProjectPage = ({params}) => {

  const { slug } = params;

  return (
    <Layout>
      <Project slug={slug} />
    </Layout>
  )
}


export const Head = () => <Seo title="Using DSG" />

export default ProjectPage
