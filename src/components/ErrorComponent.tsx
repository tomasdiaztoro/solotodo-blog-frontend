import React from 'react';
import { Box, Container, Divider, Link, Paper, Typography } from '@mui/material';

interface ErrorComponentProps {
  errorMessage: string
}

const ErrorComponent: React.FC<ErrorComponentProps> = ({ errorMessage }) => {
  return (
    <Container>
      <Paper elevation={3} style={{ padding: '20px' }}>
        <Typography style={{ fontSize: '20px' }}>{errorMessage}</Typography>
        <Divider style={{ margin: '20px 0' }} />
        <Box textAlign="right">
          <Link href="/">Volver</Link>
        </Box>
      </Paper>
    </Container>
  );
};

export default ErrorComponent;
