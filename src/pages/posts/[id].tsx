import axios from 'axios';
import type { GetServerSideProps, NextPage } from 'next';
import { Typography } from '@mui/material';

import ErrorComponent from '../../components/ErrorComponent';
import PaperComponent from '../../components/PaperComponent';
import { Post } from '../../types/Post';

interface PostDetailPageProps {
  post: Post | null;
  errorMessage?: string;
}

export const getServerSideProps: GetServerSideProps<PostDetailPageProps | { errorMessage: string }> = async (context) => {
  const { id } = context.params as { id: string };

  try {
    const response = await axios.get(`http://localhost:8000/api/posts/${id}/`);

    return {
      props: {
        post: response.data,
        errorMessage: '',
      },
    };
  } catch (error) {
    const errorMessage: string = (error as any).response && (error as any).response.status === 404 ? `El post ID ${id} no existe` : `No es posible recuperar el post: ${error}`;

    return {
      props: {
        post: null,
        errorMessage: errorMessage,
      },
    };
  }
};

const formatDate = (date: string): string => {
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit', timeZoneName: 'short' };

    return new Date(date).toLocaleDateString('es-ES', options as Intl.DateTimeFormatOptions);
};

const PostDetail: NextPage<PostDetailPageProps> = ({ post, errorMessage = '' }) => {
  if (!post) {
    return (
      <ErrorComponent errorMessage={errorMessage} />
    )
  }

  return (
    <PaperComponent
    title={`ID: ${post.id} | ${post.title}`}
    content={
        <>
        <Typography paragraph>Contenido: {post.content}</Typography>
        <Typography>Autor: {post.author}</Typography>
        <Typography>Creado: {formatDate(post.created_at)}</Typography>
        </>
    }
    link="/posts"
    linkText="Volver"
    />
    );
};

export default PostDetail;
