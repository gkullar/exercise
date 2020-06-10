import { FunctionComponent } from 'react';
import moment from 'moment';
import { getFormattedDate } from '../utils/date-formatter';
import { Result } from './results';

interface Props {
  results: Result[];
}

function getTimeDifference(previous: string, current: string): JSX.Element {
  const previousTime = moment(previous, 'mm:ss');
  const currentTime = moment(current, 'mm:ss');
  const difference = currentTime.diff(previousTime);
  const isSlower = Math.sign(difference) !== -1;
  const time = moment.utc(Math.abs(difference)).format('mm:ss');

  return (
    <span style={{ color: isSlower ? '#f34336' : '#4caf50' }}>
      {`${isSlower ? '+' : '-'}` + time}
    </span>
  );
}

const TableView: FunctionComponent<Props> = ({ results }) => {
  const rows = results.length
    ? results.map((result, index) => {
        const previousResult = results[index - 1];
        const difference = previousResult
          ? getTimeDifference(previousResult.time, result.time)
          : '00:00';

        return (
          <tr key={index}>
            <td>{getFormattedDate(result.date)}</td>
            <td>{result.time}</td>
            <td>{difference}</td>
          </tr>
        );
      })
    : null;

  return (
    <table>
      <thead>
        <tr>
          <th>Date</th>
          <th>Time</th>
          <th>Difference</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  );
};

export default TableView;
