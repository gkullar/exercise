import { FunctionComponent, useEffect, useRef, useState } from 'react';
import { AxisScale, axisBottom, axisLeft } from 'd3-axis';
import { easeSin } from 'd3-ease';
import { select } from 'd3-selection';
import { scaleLinear, scaleTime } from 'd3-scale';
import { Line as d3Line, line, curveMonotoneX } from 'd3-shape';
import 'd3-transition';
import { getFormattedDate } from '../utils/date-formatter';
import { Result } from './results';
import styles from './graph-view.module.css';

interface Props {
  results: Result[];
}

interface AxisProps {
  className: string;
  position: 'left' | 'bottom';
  scale: AxisScale<number | Date>;
  transform: string;
}

interface LineProps {
  data: Result[];
  duration: number;
  lineGenerator: d3Line<Result>;
}

interface DotProps {
  duration: number;
  mouseOverAction: () => void;
  mouseOutAction: () => void;
  x: number;
  y: number;
}

interface TooltipProps {
  x: number;
  y: number;
  data: Result;
}

const Line: FunctionComponent<LineProps> = ({
  data,
  duration,
  lineGenerator
}) => {
  const ref = useRef<SVGPathElement>(null);

  useEffect(() => {
    if (ref.current) {
      const element = select(ref.current);

      element.datum(data).attr('d', lineGenerator);

      const totalLength = ref.current.getTotalLength();

      element
        .attr('stroke-dasharray', `${totalLength} ${totalLength}`)
        .attr('stroke-dashoffset', totalLength)
        .transition()
        .duration(duration)
        .ease(easeSin)
        .attr('stroke-dashoffset', 0);
    }
  }, []);

  return <path ref={ref} className={styles.line} />;
};

const Dot: FunctionComponent<DotProps> = ({
  duration,
  mouseOverAction,
  mouseOutAction,
  x,
  y
}) => {
  const ref = useRef<SVGCircleElement>(null);

  useEffect(() => {
    if (ref.current) {
      const element = select(ref.current);

      element
        .attr('opacity', 0)
        .transition()
        .duration(duration)
        .ease(easeSin)
        .attr('opacity', 1);
    }
  }, []);

  return (
    <circle
      ref={ref}
      cx={x}
      cy={y}
      r="5"
      className={styles.dot}
      onMouseOver={mouseOverAction}
      onMouseOut={mouseOutAction}
    />
  );
};

const Axis: FunctionComponent<AxisProps> = ({
  className,
  position,
  scale,
  transform
}) => {
  const ref = useRef<SVGGElement>(null);

  useEffect(() => {
    if (ref.current) {
      const element = select(ref.current),
        axis = position === 'left' ? axisLeft(scale) : axisBottom(scale);

      element.call(axis);
    }
  }, []);

  return <g ref={ref} className={styles[className]} transform={transform} />;
};

interface LabelProps {
  text: string;
  transform: string;
}

const Label: FunctionComponent<LabelProps> = ({ text, transform }) => {
  return (
    <text transform={transform} className={styles.label}>
      {text}
    </text>
  );
};

const Tooltip: FunctionComponent<TooltipProps> = ({ data, x, y }) => {
  const positionStyles = {
    left: `${x}px`,
    top: `${y}px`
  };

  return (
    <div className={styles.tooltip} style={positionStyles}>
      {getFormattedDate(data.date)} - {data.time}
    </div>
  );
};

const GraphView: FunctionComponent<Props> = ({ results }) => {
  const [tooltipData, setTooltipData] = useState<Result>();

  const margin = { top: 24, right: 24, bottom: 32, left: 32 },
    width = 750 - margin.left - margin.right,
    height = 450 - margin.top - margin.bottom,
    duration = 2800;

  const startDate = results.length && new Date(results[0].date),
    endDate = results.length && new Date(results[results.length - 1].date);

  const xScale = scaleTime()
      .domain([startDate, endDate])
      .range([margin.left, width - margin.right]),
    xScaleData = (date: string) => xScale(new Date(date));

  const yScale = scaleLinear()
      .domain([20, 50])
      .range([height - margin.bottom, margin.top]),
    yScaleData = (time: string) => {
      const timeParts = time.split(':'),
        minutes = +timeParts[0],
        seconds = +timeParts[1],
        value = minutes + seconds / 60;

      return yScale(value);
    };

  const lineGenerator = line<Result>()
    .x((result) => xScaleData(result.date))
    .y((result) => yScaleData(result.time))
    .curve(curveMonotoneX);

  return (
    <div className={styles.graph}>
      {results.length && (
        <svg
          width={width + margin.left + margin.right}
          height={height + margin.top + margin.bottom}
        >
          <g transform={`translate(${margin.left}, ${margin.top})`}>
            <Axis
              className="x-axis"
              position="bottom"
              scale={xScale}
              transform={`translate(0, ${height - margin.bottom})`}
            />
            <Axis
              className="y-axis"
              position="left"
              scale={yScale}
              transform={`translate(${margin.left}, 0)`}
            />
            <Label
              text="Date"
              transform={`translate(${width / 2}, ${height + margin.top})`}
            />
            <Label
              text="Time in Minutes"
              transform={`translate(${0 - margin.left / 2}, ${
                height / 2
              }) rotate(-90)`}
            />
            <Line
              data={results}
              duration={duration}
              lineGenerator={lineGenerator}
            />
            {results.map((result, index) => (
              <Dot
                key={index}
                duration={duration}
                mouseOverAction={() => setTooltipData(result)}
                mouseOutAction={() => setTooltipData(undefined)}
                x={xScaleData(result.date)}
                y={yScaleData(result.time)}
              />
            ))}
          </g>
        </svg>
      )}
      {tooltipData && (
        <Tooltip
          x={xScaleData(tooltipData.date) + margin.right * 2}
          y={yScaleData(tooltipData.time)}
          data={tooltipData}
        />
      )}
    </div>
  );
};

export default GraphView;
