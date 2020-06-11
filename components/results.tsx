import { FunctionComponent } from 'react';
import GraphView from './graph-view';
import TableView from './table-view';
import styles from './results.module.css';

export interface Result {
  date: string;
  time: string;
}

interface Props {
  data: Result[];
}

const Results: FunctionComponent<Props> = ({ data }) => {
  return (
    <div className={styles.results}>
      <h2>Results</h2>
      <div className={styles['results-body']}>
        <TableView results={data} />
        <GraphView results={data} />
      </div>
    </div>
  );
};

export default Results;
