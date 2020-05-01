import styles from './container.module.css';

interface Props {
  children: JSX.Element[];
}

const Container = ({ children }: Props) => (
  <div className={styles.container}>{children}</div>
);

export default Container;
