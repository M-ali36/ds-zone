import * as React from "react"
import { Link } from "gatsby"
import { StaticImage } from "gatsby-plugin-image"

import Layout from "../components/layout"
import Projects from '../components/_Projects'
import Seo from "../components/seo"
import StartAuthButton from "../components/Helpers/gAuth"

const IndexPage = () => (

  <Layout>
    <StartAuthButton />
    <Projects />
  </Layout>
)


export const Head = () => <Seo title="Home" />

export default IndexPage
