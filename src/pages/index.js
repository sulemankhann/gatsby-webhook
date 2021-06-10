import * as React from "react"
import { Link } from "gatsby"
import { StaticImage } from "gatsby-plugin-image"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import Seo from "../components/seo"

const IndexPage = ({ data }) => (
  <Layout>
    <Seo title="Home" />
    {data.allStrapiTest.nodes.map(art => (
      <li key={`art__${art.id}`}>
        <h1>{`${art.title}`}</h1>
        <p>{`${art.description}`}</p>
        <br />
        <hr />
        <br />
      </li>
    ))}

    <StaticImage
      src="../images/gatsby-astronaut.png"
      width={300}
      quality={95}
      formats={["AUTO", "WEBP", "AVIF"]}
      alt="A Gatsby astronaut"
      style={{ marginBottom: `1.45rem` }}
    />
    <p>
      <Link to="/page-2/">Go to page 2</Link> <br />
      <Link to="/using-typescript/">Go to "Using TypeScript"</Link>
    </p>
  </Layout>
)

export default IndexPage

export const query = graphql`
  query TestQuery {
    allStrapiTest {
      nodes {
        id
        title
        description
      }
    }
  }
`
