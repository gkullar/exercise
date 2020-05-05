import { FunctionComponent } from 'react';
import { Tab, TabGroup } from './tabs';

const Routine: FunctionComponent = () => {
  const reps = [
    [6, 6, 12, 24, 12],
    [8, 8, 16, 32, 16],
    [10, 10, 20, 40, 20],
    [8, 8, 16, 32, 16],
    [6, 6, 12, 24, 12]
  ];

  const tabs: JSX.Element[] = [];

  for (let index = 0; index < reps.length; index++) {
    tabs.push(
      <Tab key={index} label={`Set ${index + 1}`}>
        <ul>
          <li>{reps[index][0]} Burpees</li>
          <li>{reps[index][1]} Press ups</li>
          <li>{reps[index][2]} Squats</li>
          <li>{reps[index][3]} Mountain climbers</li>
          <li>{reps[index][4]} Lunges</li>
        </ul>
      </Tab>
    );
  }

  return (
    <div>
      <h2>Routine</h2>
      <TabGroup>{tabs}</TabGroup>
    </div>
  );
};

export default Routine;
