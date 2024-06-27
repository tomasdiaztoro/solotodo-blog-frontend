import axios from 'axios';
import { useFormik, FormikHelpers } from 'formik';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { Box, Button, TextField } from '@mui/material';
import * as yup from 'yup';

import ErrorComponent from '@/components/ErrorComponent';
import PaperComponent from '@/components/PaperComponent';

interface FormValues {
  title: string;
  content: string;
  author: string;
}

interface ApiResponse {
  id: string;
}

const validationSchema = yup.object({
  title: yup.string().required('El título es obligatorio'),
  content: yup.string().required('El contenido es obligatorio'),
  author: yup.string().required('El autor es obligatorio'),
});

const CreatePost = () => {
  const router = useRouter();  
  const [errorMessage, setErrorMessage] = useState('');
  const formik = useFormik<FormValues>({
    initialValues: {
      title: '',
      content: '',
      author: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values, { setSubmitting }: FormikHelpers<FormValues>) => {
      try {
        const response = await axios.post<ApiResponse>('http://localhost:8000/api/posts/', values);
        const postId = response.data.id;
        router.push(`/posts/${postId}`);
      } catch (error) {     
        setErrorMessage(`No es posible crear el post: ${error}`);
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <>
      {errorMessage ? (
        <ErrorComponent errorMessage={errorMessage} />
      ) : (
        <PaperComponent
          title="Crear Post"
          content={
            <form onSubmit={formik.handleSubmit}>
              <TextField
                label="Título"
                name="title"
                value={formik.values.title}
                onChange={formik.handleChange}
                error={formik.touched.title && Boolean(formik.errors.title)}
                helperText={formik.touched.title && formik.errors.title}
                fullWidth
                margin="normal"
              />
              <TextField
                label="Contenido"
                name="content"
                value={formik.values.content}
                onChange={formik.handleChange}
                error={formik.touched.content && Boolean(formik.errors.content)}
                helperText={formik.touched.content && formik.errors.content}
                fullWidth
                margin="normal"
                multiline
                rows={3}
              />
              <TextField
                label="Autor"
                name="author"
                value={formik.values.author}
                onChange={formik.handleChange}
                error={formik.touched.author && Boolean(formik.errors.author)}
                helperText={formik.touched.author && formik.errors.author}
                fullWidth
                margin="normal"
              />
              <Box textAlign="center" style={{ marginTop: '20px' }}>
                <Button type="submit" variant="contained" style={{ width: '200px' }}>
                  Crear
                </Button>
              </Box>
            </form>
          }
          link="/posts"
          linkText='Volver'
        />
      )}
    </>
  );
};

export default CreatePost;