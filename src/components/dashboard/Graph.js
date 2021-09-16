import React from "react";
import { ResponsiveLine } from "@nivo/line";

const data = [
  {
    id: "avg",
    color: "hsl(189, 70%, 50%)",
    data: [
      {
        x: "September",
        y: 101,
      },
      {
        x: "October",
        y: 110,
      },
      {
        x: "November",
        y: 100,
      },
      {
        x: "December",
        y: 141,
      },
      {
        x: "January",
        y: 150,
      },
      {
        x: "February",
        y: 158,
      },
      {
        x: "March",
        y: 160,
      },
      {
        x: "April",
        y: 155,
      },
      {
        x: "May",
        y: 150,
      },
      {
        x: "June",
        y: 160,
      },
      {
        x: "July",
        y: 160,
      },
      {
        x: "August",
        y: 170,
      },
    ],
  },
  {
    id: "min",
    color: "hsl(53, 70%, 50%)",
    data: [
      {
        x: "September",
        y: 100,
      },
      {
        x: "October",
        y: 90,
      },
      {
        x: "November",
        y: 93,
      },
      {
        x: "December",
        y: 79,
      },
      {
        x: "January",
        y: 133,
      },
      {
        x: "February",
        y: 145,
      },
      {
        x: "March",
        y: 148,
      },
      {
        x: "April",
        y: 150,
      },
      {
        x: "May",
        y: 141,
      },
      {
        x: "June",
        y: 142,
      },
      {
        x: "July",
        y: 150,
      },
      {
        x: "August",
        y: 130,
      },
    ],
  },
  {
    id: "max",
    color: "hsl(145, 70%, 50%)",
    data: [
      {
        x: "September",
        y: 150,
      },
      {
        x: "October",
        y: 115,
      },
      {
        x: "November",
        y: 120,
      },
      {
        x: "December",
        y: 150,
      },
      {
        x: "January",
        y: 170,
      },
      {
        x: "February",
        y: 168,
      },
      {
        x: "March",
        y: 167,
      },
      {
        x: "April",
        y: 159,
      },
      {
        x: "May",
        y: 157,
      },
      {
        x: "June",
        y: 172,
      },
      {
        x: "July",
        y: 164,
      },
      {
        x: "August",
        y: 183,
      },
    ],
  },
];

export default () => {
  return (
    <>
      <div className="pb-10 px-2" id="graph" style={{ height: "400px" }}>
        <ResponsiveLine
          data={data}
          theme={{
            textColor: "#ffffff",
            axis: {
              domain: {
                line: {
                  stroke: "#ffffff",
                  strokeWidth: 1,
                },
              },
              ticks: {
                line: {
                  stroke: "#ffffff",
                  strokeWidth: 1,
                },
              },
              legend: {
                text: {
                  fontSize: 18,
                },
              },
            },
            grid: {
              line: {
                stroke: "#2A3140",
                strokeWidth: 0.5,
              },
            },
          }}
          margin={{ top: 50, right: 110, bottom: 70, left: 60 }}
          xScale={{ type: "point" }}
          yScale={{ type: "linear", min: "auto", max: "auto", stacked: false, reverse: false }}
          yFormat=" >-.2f"
          axisTop={null}
          axisBottom={{
            orient: "bottom",
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 45,
            legend: "Month",
            legendOffset: 60,
            legendPosition: "middle",
          }}
          axisLeft={{
            orient: "left",
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: "Price in $/ML",
            legendOffset: -50,
            legendPosition: "middle",
          }}
          axisRight={{
            orient: "right",
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: "Price in $/ML",
            legendOffset: 50,
            legendPosition: "middle",
          }}
          pointSize={3}
          isInteractive={false}
          pointColor={{ theme: "background" }}
          pointBorderWidth={2}
          pointBorderColor={{ from: "serieColor" }}
          pointLabelYOffset={-12}
          useMesh={true}
          legends={[
            {
              anchor: "bottom-right",
              direction: "column",
              justify: false,
              translateX: 115,
              translateY: 0,
              itemsSpacing: 0,
              itemDirection: "left-to-right",
              itemWidth: 80,
              itemHeight: 20,
              itemOpacity: 0.75,
              symbolSize: 12,
              symbolShape: "circle",
              symbolBorderColor: "rgba(0, 0, 0, .5)",
              effects: [
                {
                  on: "hover",
                  style: {
                    itemBackground: "rgba(12, 0, 0, .03)",
                    itemOpacity: 1,
                  },
                },
              ],
            },
          ]}
        />
      </div>
    </>
  );
};
