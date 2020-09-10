import React from "react";
import { XYPlot, XAxis, YAxis, HorizontalGridLines, LineSeries, ChartLabel } from "react-vis";
import "react-vis/dist/style.css";

const dataFull = [
  { x: new Date(2019, 7, 15), avg: 101, min: 100, max: 150 },
  { x: new Date(2019, 8, 15), avg: 110, min: 90, max: 115 },
  { x: new Date(2019, 9, 15), avg: 100, min: 93, max: 120 },
  { x: new Date(2019, 10, 15), avg: 141, min: 79, max: 150 },
  { x: new Date(2019, 11, 15), avg: 150, min: 133, max: 170 },
  { x: new Date(2020, 1, 15), avg: 158, min: 145, max: 168 },
  { x: new Date(2020, 2, 15), avg: 160, min: 148, max: 167 },
  { x: new Date(2020, 3, 15), avg: 155, min: 150, max: 159 },
  { x: new Date(2020, 4, 15), avg: 150, min: 141, max: 157 },
  { x: new Date(2020, 5, 15), avg: 160, min: 142, max: 172 },
  { x: new Date(2020, 6, 15), avg: 160, min: 150, max: 164 },
  { x: new Date(2020, 7, 15), avg: 170, min: 130, max: 183 },
];

export default () => {
  return (
    <div className="mr-10 p-3 hidden lg:block" id="graph">
      <h2 className="ml-2 pb-6 text-2xl">Historical Prices</h2>
      <XYPlot height={500} width={1000} xType="time" yDomain={[0, 200]}>
        <HorizontalGridLines style={{ opacity: 0.05 }} />
        <XAxis
          style={{
            text: { fill: "white" },
            title: { fill: "white", fontWeight: 1000, fontSize: 16 },
          }}
        />
        <YAxis
          style={{
            text: { fill: "white" },
            title: { fill: "white", fontWeight: 1000, fontSize: 16 },
          }}
        />
        <ChartLabel text="Month" className="alt-x-label" includeMargin={false} xPercent={0.94} yPercent={0.99} />
        <ChartLabel
          text="Price in $/ML"
          className="alt-y-label"
          includeMargin={false}
          xPercent={0.03}
          yPercent={0.26}
          style={{ transform: "rotate(-90)" }}
        />
        <LineSeries data={dataFull} getY={d => d.avg} color="white" />
        <LineSeries data={dataFull} getY={d => d.min} color="red" opacity={1} />
        <LineSeries data={dataFull} getY={d => d.max} color="green" opacity={1} />
      </XYPlot>
    </div>
  );
};
