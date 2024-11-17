import * as React from "react"
import { Link } from "gatsby"

import Layout from "@components/layout"
import Seo from "@components/seo"
import EditProject from '@components/_Projects/EditProject'
import { useParams } from '@reach/router'; // For accessing URL parameters

const EditProjectPage = ({params}) => {

  const { projectId } = params;

  return (
    <Layout>
      <h1>Edit a project</h1>
      <EditProject projectId={projectId} />
    </Layout>
  )
}


export const Head = () => <Seo title="Using DSG" />

export default EditProjectPage
