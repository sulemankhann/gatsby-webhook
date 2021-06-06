import React from "react"
import { Link, StaticQuery } from "gatsby"
// import { StaticImage } from "gatsby-plugin-image"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import Seo from "../components/seo"

// useEffect(()=>{
//   const query = graphql`
//   query Test {
//     allStrapiTest {
//       edges{
//         node {
//           id
//           title
//           description
//         }
//       }
      
//     }
//   }
// `

// })
const query = graphql`
  query Test {
    allStrapiTest {
      edges{
        node {
          id
          title
          description
        }
      }
      
    }
  }
`

const IndexPage = ({ data }) => (
  <Layout>
    <Seo title="Home" />
    {/* {data.allStrapiTest.node.map(art => (
      <li key={`art__${art.id}`}>
        <h1>{`${art.title}`}</h1>
        <p>{`${art.description}`}</p>
        <br></br>
      </li>
    ))} */}
     <StaticQuery
        query={query}
        render={data => (
          
          <ul>
            {data.allStrapiTest.edges.map( test => (
              <li key={test.node.id}>
                <h3>{test.node.title}</h3>
                <p>{test.node.description}</p>
                <p>ID:{test.node.id}</p>
              </li>
            )

            )}
          </ul>
    
        )}
      />
    {/* <StaticImage
      src="../images/gatsby-astronaut.png"
      width={300}
      quality={95}
      formats={["AUTO", "WEBP", "AVIF"]}
      alt="A Gatsby astronaut"
      style={{ marginBottom: `1.45rem` }}
    /> */}
    <p>
      <Link to="/page-2/">Go to page 02</Link> <br />
      <Link to="/using-typescript/">Go to "Using TypeScript"</Link>
    </p>
  </Layout>
)

export default IndexPage


