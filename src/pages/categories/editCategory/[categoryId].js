import * as React from "react"
import { Link } from "gatsby"

import Layout from "@components/layout"
import Seo from "@components/seo"
import EditCategory from '@components/_Categories/EditCategory'
import { useParams } from '@reach/router'; // For accessing URL parameters

const EditCategoryPage = ({params}) => {

  const { categoryId } = params;

  return (
    <Layout>
      <h1>Edit a category</h1>
      <EditCategory categoryId={categoryId} />
    </Layout>
  )
}


export const Head = () => <Seo title="Using DSG" />

export default EditCategoryPage
