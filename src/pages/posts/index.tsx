import axios from 'axios';
import type { GetServerSideProps, NextPage } from 'next';
import Link from 'next/link';
import { List, ListItem, ListItemText } from '@mui/material';

import ErrorComponent from '../../components/ErrorComponent';
import PaperComponent from '../../components/PaperComponent';
import { Post } from '../../types/Post';

interface ApiResponse {
  data: Post[];
}

interface PostsPageProps {
  posts: Post[];
}

export const getServerSideProps: GetServerSideProps<PostsPageProps | { errorMessage: string }> = async () => {
  try {
    const response = await axios.get<ApiResponse>('http://localhost:8000/api/posts/');

    return {
      props: {
        posts: response.data,
        errorMessage: '',
      },
    };
  } catch (error) {
    const errorMessage: string = `No es posible recuperar el listado de posts: ${error}`

    return {
      props: {
        posts: null,
        errorMessage: errorMessage,
      },
    };
  }
};

const Posts: NextPage<PostsPageProps & { errorMessage?: string }> = ({ posts, errorMessage = '' }) => {
  if (!posts) {
    return (
      <ErrorComponent errorMessage={errorMessage} />
    )
  }

  return (
  <PaperComponent
      title="Posts"
      content={
        <List>
          {posts.map((post) => (
            <ListItem key={post.id} >
              <Link href={`/posts/${post.id}`}>
                <ListItemText primary={post.title} />
              </Link>
            </ListItem>
          ))}
        </List>
      }
      link="/posts/create"
      linkText="Crear Post"
    />
  );
};

export default Posts;