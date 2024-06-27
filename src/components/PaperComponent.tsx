import React from 'react';
import { Box, Container, Divider, Link, Paper, Typography } from '@mui/material';

interface PaperComponentProps {
  title: string;
  content: React.ReactNode;
  link: string;
  linkText: string;
}

const PaperComponent: React.FC<PaperComponentProps> = ({ title, content, link, linkText }) => {
  return (
    <Container>
      <Paper style={{ padding: '20px' }}>
        <Typography variant="h1" style={{ fontSize: '20px' }}>{title}</Typography>
        <Divider style={{ margin: '20px 0' }} />
        {content}
        <Divider style={{ margin: '20px 0' }} />
        <Box textAlign="right">
          <Link href={link}>{linkText}</Link>
        </Box>
      </Paper>
    </Container>
  );
};

export default PaperComponent;
