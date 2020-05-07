import { NextPage } from 'next';
import Head from 'next/head';
import Results from '../components/results';
import Routine from '../components/routine';
import Container from '../components/container';

const Home: NextPage = () => (
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
      <Results />
    </Container>
  </div>
);

export default Home;
