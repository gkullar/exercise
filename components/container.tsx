import { FunctionComponent } from 'react';
import styles from './container.module.css';

interface Props {
  children: JSX.Element[];
}

const Container: FunctionComponent<Props> = ({ children }) => (
  <div className={styles.container}>{children}</div>
);

export default Container;
