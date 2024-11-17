import * as React from "react"
import { Link } from "gatsby"

import Layout from "@components/layout"
import Seo from "@components/seo"
import EditProductGroup from '@components/_ProductGroups/EditProductGroup'
import { useParams } from '@reach/router'; // For accessing URL parameters

const EditProductGroupPage = ({params}) => {

  const { productGroupId } = params;

  return (
    <Layout>
      <h1>Edit a Product Group</h1>
      <EditProductGroup productGroupId={productGroupId} />
    </Layout>
  )
}


export const Head = () => <Seo title="Edit a Product Group" />

export default EditProductGroupPage
