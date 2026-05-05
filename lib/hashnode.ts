export interface HashnodeCoverImage {
  url: string;
}

export interface HashnodeTag {
  name: string;
  slug: string;
}

export interface HashnodeAuthor {
  name: string;
  profilePicture: string;
}

export interface HashnodePost {
  id: string;
  title: string;
  brief: string;
  slug: string;
  publishedAt: string;
  readTimeInMinutes: number;
  coverImage: HashnodeCoverImage | null;
  tags: HashnodeTag[];
  author: HashnodeAuthor;
}

export interface HashnodePostFull extends HashnodePost {
  content: {
    html: string;
  };
  seo: {
    title: string;
    description: string;
  } | null;
}

export interface HashnodePageInfo {
  hasNextPage: boolean;
  endCursor: string | null;
}

export interface HashnodePostsResponse {
  posts: HashnodePost[];
  pageInfo: HashnodePageInfo;
}

const GQL_ENDPOINT = 'https://gql.hashnode.com';
const HOST = process.env.HASHNODE_PUBLICATION_HOST || 'growthxmedia.hashnode.dev';

async function hashnodeFetch(query: string, variables: Record<string, unknown>) {
  console.log('Fetching from Hashnode:', { variables });
  try {
    const res = await fetch(GQL_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query,
        variables,
      }),
      next: { revalidate: 60 },
    });

    const data = await res.json();
    if (data.errors) {
      console.error('Hashnode API Errors:', JSON.stringify(data.errors, null, 2));
      return null;
    }
    return data.data;
  } catch (error) {
    console.error('Hashnode Fetch Error:', error);
    return null;
  }
}

export async function getAllPosts(first: number = 10, after?: string): Promise<HashnodePostsResponse> {
  const query = `
    query GetPosts($host: String!, $first: Int!, $after: String) {
      publication(host: $host) {
        posts(first: $first, after: $after) {
          pageInfo {
            hasNextPage
            endCursor
          }
          edges {
            node {
              id
              title
              brief
              slug
              publishedAt
              readTimeInMinutes
              coverImage {
                url
              }
              tags {
                name
                slug
              }
              author {
                name
                profilePicture
              }
            }
          }
        }
      }
    }
  `;

  const data = await hashnodeFetch(query, { host: HOST, first, after });
  
  if (!data?.publication?.posts) {
    return { posts: [], pageInfo: { hasNextPage: false, endCursor: null } };
  }

  const posts = data.publication.posts.edges.map((edge: any) => edge.node);
  const pageInfo = data.publication.posts.pageInfo;

  return { posts, pageInfo };
}

export async function getPostBySlug(slug: string): Promise<HashnodePostFull | null> {
  const query = `
    query GetPost($host: String!, $slug: String!) {
      publication(host: $host) {
        post(slug: $slug) {
          id
          title
          brief
          slug
          publishedAt
          readTimeInMinutes
          coverImage {
            url
          }
          tags {
            name
            slug
          }
          author {
            name
            profilePicture
          }
          content {
            html
          }
          seo {
            title
            description
          }
        }
      }
    }
  `;

  const data = await hashnodeFetch(query, { host: HOST, slug });
  return data?.publication?.post || null;
}

export async function getPostsByTag(tag: string, first: number = 9, after?: string): Promise<HashnodePostsResponse> {
  const query = `
    query GetPostsByTag($host: String!, $first: Int!, $tag: String!, $after: String) {
      publication(host: $host) {
        posts(first: $first, filter: { tagSlugs: [$tag] }, after: $after) {
          pageInfo {
            hasNextPage
            endCursor
          }
          edges {
            node {
              id
              title
              brief
              slug
              publishedAt
              readTimeInMinutes
              coverImage {
                url
              }
              tags {
                name
                slug
              }
              author {
                name
                profilePicture
              }
            }
          }
        }
      }
    }
  `;

  const data = await hashnodeFetch(query, { host: HOST, first, tag, after });
  
  if (!data?.publication?.posts) {
    return { posts: [], pageInfo: { hasNextPage: false, endCursor: null } };
  }

  const posts = data.publication.posts.edges.map((edge: any) => edge.node);
  const pageInfo = data.publication.posts.pageInfo;

  return { posts, pageInfo };
}

export async function searchPosts(searchTerm: string): Promise<HashnodePost[]> {
  // Hashnode's searchPostsOfPublication might not be available in basic API or depends on version
  // We'll use a standard post fetch and filter client-side for simplicity if needed, 
  // but let's try a query that works for basic search if possible.
  // For now, following instructions to fetch and filter if search query isn't directly supported.
  
  const query = `
    query SearchPosts($host: String!, $first: Int!) {
      publication(host: $host) {
        posts(first: $first) {
          edges {
            node {
              id
              title
              brief
              slug
              publishedAt
              readTimeInMinutes
              coverImage {
                url
              }
              tags {
                name
                slug
              }
              author {
                name
                profilePicture
              }
            }
          }
        }
      }
    }
  `;

  const data = await hashnodeFetch(query, { host: HOST, first: 50 });
  
  if (!data?.publication?.posts) {
    return [];
  }

  const posts = data.publication.posts.edges.map((edge: any) => edge.node);
  
  return posts.filter((post: HashnodePost) => 
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    post.brief.toLowerCase().includes(searchTerm.toLowerCase())
  );
}
