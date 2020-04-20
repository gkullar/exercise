import { NextPage } from 'next';
import Head from 'next/head';

const Home: NextPage<{ userAgent: string }> = () => (
  <div>
    <Head>
      <title>Exercise</title>
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <link rel="shortcut icon" href="/favicon.ico" />
    </Head>
    <p>Hello world!</p>
  </div>
);

export default Home;
