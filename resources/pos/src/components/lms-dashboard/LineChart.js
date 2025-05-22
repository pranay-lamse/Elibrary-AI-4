import React from "react";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { connect } from "react-redux";
import { weekSalePurchases } from "../../store/action/weeksalePurchaseAction";
import { yearlyTopProduct } from "../../store/action/yearlyTopProductAction";
import { placeholderText } from "../../shared/sharedMethod";
import moment from "moment";

const LineChart = (props) => {
    const { weekSalePurchase, frontSetting, siteCounter } = props;

    ChartJS.register(
        CategoryScale,
        LinearScale,
        PointElement,
        LineElement,
        Title,
        Tooltip,
        Legend
    );

    const currency = frontSetting
        ? frontSetting.value && frontSetting.value.currency_symbol
        : "";
    const valueFormatter = (tooltipItems) => {
        const value = tooltipItems.dataset.data[tooltipItems.dataIndex];
        const label = tooltipItems.dataset.label;
        return label + " : " + `${currency ? currency : ""} ` + value;
    };

    const yFormatter = (yValue) => {
        const value = yValue;
        return value;
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: "top",
            },
            tooltip: {
                callbacks: {
                    label: (tooltipItems, data) => valueFormatter(tooltipItems),
                },
            },
        },
        scales: {
            y: {
                ticks: {
                    callback: (value, index, values) => yFormatter(value),
                },
                title: {
                    display: true,
                    text: "Count",
                    align: "center",
                },
            },
        },
    };

    const labels = siteCounter
        ? siteCounter.dates.map((date) => moment(date).format("YYYY-MM-DD"))
        : "";

    const data = {
        labels,
        datasets: [
            {
                label: "Site Visited",
                data: siteCounter ? siteCounter.count : "",
                borderColor: "#6571FF",
                backgroundColor: "#A3AAFF",
            },
        ],
    };
    return <Line options={options} data={data} height={100} />;
};

const mapStateToProps = (state) => {
    const { weekSalePurchase, yearTopProduct, siteCounter } = state;
    return { weekSalePurchase, yearTopProduct, siteCounter };
};

export default connect(mapStateToProps, {
    weekSalePurchases,
    yearlyTopProduct,
})(LineChart);
