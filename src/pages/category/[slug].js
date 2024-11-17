import * as React from "react"
import { Link } from "gatsby"

import Layout from "@components/layout"
import Seo from "@components/seo"
import Category from '@components/_Categories/Category'
import { useParams } from '@reach/router'; // For accessing URL parameters

const CategoryPage = ({params}) => {

  const { slug } = params;

  return (
    <Layout>
      <Category slug={slug} />
    </Layout>
  )
}


export const Head = () => <Seo title="Using DSG" />

export default CategoryPage
