import { FunctionComponent, useEffect, useState } from 'react';
import styles from './results.module.css';

interface Result {
  date: string;
  time: string;
}

const Results: FunctionComponent<{}> = () => {
  const [results, setResults] = useState<Result[]>([]);

  useEffect(() => {
    const data: Result[] = require('../data.json');
    setResults(data);
  }, []);

  const rows = results.length
    ? results.map((result, index) => {
        const date = new Date(result.date);
        const options = { year: '2-digit', month: '2-digit', day: '2-digit' };
        const formattedDate = date.toLocaleString('default', options);

        return (
          <tr key={index}>
            <td>{formattedDate}</td>
            <td>{result.time}</td>
          </tr>
        );
      })
    : null;

  return (
    <div className={styles.results}>
      <h2>Results</h2>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Time</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </table>
    </div>
  );
};

export default Results;
