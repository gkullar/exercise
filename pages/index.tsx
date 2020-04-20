import { NextPage } from 'next';
import Head from 'next/head';

const Home: NextPage<{ userAgent: string }> = () => (
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
    <h1>Heading 1</h1>
    <h2>Heading 2</h2>
    <h3>Heading 3</h3>
    <p>Hello world!</p>
  </div>
);

export default Home;
