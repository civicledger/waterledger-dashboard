import React from "react";
import { ResponsiveLine } from "@nivo/line";

import { queryClient } from "../queries";

const data = [
  {
    id: "avg",
    color: "hsl(189, 70%, 50%)",
    data: [
      {
        x: "Sep 2020",
        y: 101,
      },
      {
        x: "Oct 2020",
        y: 110,
      },
      {
        x: "Nov 2020",
        y: 100,
      },
      {
        x: "Dec 2020",
        y: 141,
      },
      {
        x: "Jan 2021",
        y: 150,
      },
      {
        x: "Feb 2021",
        y: 158,
      },
      {
        x: "Mar 2021",
        y: 160,
      },
      {
        x: "Apr 2021",
        y: 155,
      },
      {
        x: "May 2021",
        y: 150,
      },
      {
        x: "Jun 2021",
        y: 160,
      },
      {
        x: "Jul 2021",
        y: 160,
      },
      {
        x: "Aug 2021",
        y: 170,
      },
    ],
  },
  {
    id: "min",
    color: "hsl(53, 70%, 50%)",
    data: [
      {
        x: "Sep 2020",
        y: 100,
      },
      {
        x: "Oct 2020",
        y: 90,
      },
      {
        x: "Nov 2020",
        y: 93,
      },
      {
        x: "Dec 2020",
        y: 79,
      },
      {
        x: "Jan 2021",
        y: 133,
      },
      {
        x: "Feb 2021",
        y: 145,
      },
      {
        x: "Mar 2021",
        y: 148,
      },
      {
        x: "Apr 2021",
        y: 150,
      },
      {
        x: "May 2021",
        y: 141,
      },
      {
        x: "Jun 2021",
        y: 142,
      },
      {
        x: "Jul 2021",
        y: 150,
      },
      {
        x: "Aug 2021",
        y: 130,
      },
    ],
  },
  {
    id: "max",
    color: "hsl(145, 70%, 50%)",
    data: [
      {
        x: "Sep 2020",
        y: 150,
      },
      {
        x: "Oct 2020",
        y: 115,
      },
      {
        x: "Nov 2020",
        y: 120,
      },
      {
        x: "Dec 2020",
        y: 150,
      },
      {
        x: "Jan 2021",
        y: 170,
      },
      {
        x: "Feb 2021",
        y: 168,
      },
      {
        x: "Mar 2021",
        y: 167,
      },
      {
        x: "Apr 2021",
        y: 159,
      },
      {
        x: "May 2021",
        y: 157,
      },
      {
        x: "Jun 2021",
        y: 172,
      },
      {
        x: "Jul 2021",
        y: 164,
      },
      {
        x: "Aug 2021",
        y: 183,
      },
    ],
  },
];

export default () => {
  const { terminologies } = queryClient.getQueryData("getTerminologies");
  console.log("from graph", terminologies);
  return (
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
          legend: `Price in $/${terminologies["unit"]}`,
          legendOffset: -50,
          legendPosition: "middle",
        }}
        axisRight={{
          orient: "right",
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
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
            anchor: "top-right",
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
  );
};
