import { GetStaticProps, NextPage } from 'next';
import Head from 'next/head';
import Results, { Result } from '../components/results';
import Routine from '../components/routine';
import Container from '../components/container';

interface Props {
  data: Result[];
}

const Home: NextPage<Props> = ({ data }) => (
  <div>
    <Head>
      <title>Exercise</title>
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <link rel="shortcut icon" href="/favicon.ico" />
      <link
        href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;700&display=swap"
        rel="stylesheet"
      ></link>
    </Head>
    <Container>
      <h1>Body Workout</h1>
      <Routine />
      <Results data={data} />
    </Container>
  </div>
);

export const getStaticProps: GetStaticProps = async () => {
  const data: Result[] = require('../data.json');

  return {
    props: { data }
  };
};

export default Home;
