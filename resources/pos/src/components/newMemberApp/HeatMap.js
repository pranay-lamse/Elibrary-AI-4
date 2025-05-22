import React from "react";
import HeatMap from "react-heatmap-grid";
function HeatMapComponent(props) {
    const { siteCounter } = props;
    const xLabels = siteCounter.map((_, i) => `${_}`);
    const yLabels = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].slice(
        0,
        xLabels.length
    );
    const data = new Array(yLabels.length)
        .fill(0)
        .map(() =>
            new Array(xLabels.length)
                .fill(0)
                .map(() => Math.floor(Math.random() * 100))
        );
    console.log("object");
    return (
        <>
            <HeatMap
                yLabels={xLabels}
                xLabels={yLabels}
                data={data}
                squares
                xLabelsLocation={"bottom"}
            />
        </>
    );
}

export default HeatMapComponent;
