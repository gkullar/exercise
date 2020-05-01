import { AppProps } from 'next/app';
import '../theme/style.css';

function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default App;
