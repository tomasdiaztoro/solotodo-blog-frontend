import { GetServerSideProps, NextPage } from 'next';

export const getServerSideProps: GetServerSideProps = async (context) => {
  return {
    redirect: {
      destination: '/posts',
      permanent: true,
    },
  };
};

const Home: NextPage = () => {
  return null;
};

export default Home;