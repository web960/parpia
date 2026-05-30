import Link from "next/link";
import { print } from "graphql/language/printer";
import gql from "graphql-tag";

import { fetchGraphQL } from "@/utils/fetchGraphQL";

const PostsIndexQuery = gql`
  query PostsIndexQuery {
    posts(first: 10, where: { status: PUBLISH }) {
      nodes {
        title
        uri
        date
        excerpt
      }
    }
  }
`;

type PostSummary = {
  title: string;
  uri: string;
  date: string;
  excerpt: string;
};

export default async function PostsIndex() {
  const { posts } = await fetchGraphQL<{
    posts: { nodes: PostSummary[] };
  }>(print(PostsIndexQuery));

  return (
    <main>
      <h1>Latest Posts</h1>
      <ul>
        {posts.nodes.map((post) => (
          <li key={post.uri}>
            <Link href={post.uri}>{post.title}</Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
