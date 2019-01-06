import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/layout'
import SEO from '../components/seo'
import ExcerptedPost from '../components/ExcerptedPost'

const ExcerptList = ({ data, ...props }) => {
  const { index, totalPages } = props.pageContext
  const posts = data.allMarkdownRemark.edges.map(edge => edge.node)

  return (
    <Layout>
      <SEO title="Home" keywords={['Kyle Shevlin']} />
      <div>
        {posts.map(post => (
          <ExcerptedPost key={post.frontmatter.slug} post={post} />
        ))}
      </div>
      <div>
        Page {index + 1} of {totalPages}
      </div>
    </Layout>
  )
}

export default ExcerptList

export const query = graphql`
  query ExcerptListQuery($skip: Int!, $limit: Int!) {
    allMarkdownRemark(
      filter: { fileAbsolutePath: { regex: "/posts/" } }
      sort: { fields: [frontmatter___date], order: DESC }
      skip: $skip
      limit: $limit
    ) {
      edges {
        node {
          frontmatter {
            title
            subtitle
            slug
            date(formatString: "MMMM DD, YYYY")
            categories
            tags
          }
          excerpt(pruneLength: 300, format: HTML)
        }
      }
    }
  }
`