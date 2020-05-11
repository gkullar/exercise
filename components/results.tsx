import { FunctionComponent, useEffect, useState } from 'react';
import TableView from './table-view';
import styles from './results.module.css';

export interface Result {
  date: string;
  time: string;
}

const Results: FunctionComponent<{}> = () => {
  const [results, setResults] = useState<Result[]>([]);

  useEffect(() => {
    const data: Result[] = require('../data.json');
    setResults(data);
  }, []);

  return (
    <div className={styles.results}>
      <h2>Results</h2>
      <TableView results={results} />
    </div>
  );
};

export default Results;
