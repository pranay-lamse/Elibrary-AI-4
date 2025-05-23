import { CustomTooltips } from "@coreui/coreui-plugin-chartjs-custom-tooltips";

const chartColors = ["#8395fb", "#7fd81e", "#00C6FF", "#f6c223", "#e55353"];

// Main Chart
export const prepareChartData = (chartData) => {
    const {
        total_books,
        total_members,
        total_issued_books,
        total_reserved_books,
        total_overdue_books,
    } = chartData;
    return [
        total_books,
        total_members,
        total_issued_books,
        total_reserved_books,
        total_overdue_books,
    ];
};

export const prepareCards = (chartData, totalEsubAmount, labels) => {
    const {
        total_books,
        total_members,
        total_issued_books,
        total_reserved_books,
        total_overdue_books,
    } = chartData;
    return [
        {
            title: labels[0],
            color: "bg-info",
            count: total_books + 2000,
            icon: "fa fa-book fa-4x",
        },
        {
            title: labels[1],
            color: "bg-success",
            count: total_members,
            icon: "fas fa-users fa-4x",
        },
        {
            title: labels[2],
            color: "bg-primary",
            count: total_issued_books,
            icon: "fas fa-book-reader fa-4x",
        },
        {
            title: labels[3],
            color: "bg-warning",
            count: total_reserved_books,
            icon: "fas fa-book-reader fa-4x",
        },
        {
            type: "bar",
            title: labels[4],
            color: "bg-danger",
            count: total_overdue_books,
            icon: "fas fa-book-reader fa-4x",
        },
        {
            title: labels[5],
            color: "bg-primary",
            count: totalEsubAmount ? totalEsubAmount : 0,
            icon: "fa fa-inr fa-4x",
        },
        {
            title: labels[6],
            color: "bg-warning",
            count: "15,500",
            icon: "fa fa-inr fa-4x",
        },

        {
            title: "Ebooks",
            color: "bg-info",
            count: "445",
            icon: "fa fa-book fa-4x",
        },
    ];
};

export const prepareBarChart = (chartData, labels) => {
    return {
        labels,
        datasets: [
            {
                label: "LMS",
                backgroundColor: chartColors,
                borderColor: chartColors,
                borderWidth: 1,
                hoverBackgroundColor: chartColors,
                hoverBorderColor: chartColors,
                data: prepareChartData(chartData),
                fill: false,
            },
        ],
    };
};

const getChartData = (chartData, startDate, endDate) => {
    const {
        dates,
        books,
        issued_books,
        reserved_books,
        overdue_books,
        members,
    } = chartData;
    let data = [
        books[startDate],
        members[startDate],
        issued_books[startDate],
        reserved_books[startDate],
        overdue_books[startDate],
    ];
    if (books[endDate]) {
        data = [
            books[startDate].concat(books[endDate]),
            books[startDate].concat(books[endDate]),
            books[startDate].concat(books[endDate]),
            books[startDate].concat(books[endDate]),
            books[startDate].concat(books[endDate]),
        ];
    }
    return { data, dates };
};

export const prepareMonthlyBarChart = (
    chartData,
    labels,
    startDate,
    endDate = null
) => {
    let dataSet = [];
    const { data, dates } = getChartData(chartData, startDate, endDate);
    labels.forEach((label, index) => {
        dataSet.push({
            label,
            backgroundColor: chartColors[index],
            borderColor: chartColors[index],
            borderWidth: 1,
            hoverBackgroundColor: chartColors[index],
            hoverBorderColor: chartColors[index],
            data: data[index],
            fill: false,
        });
    });
    return { labels: dates, datasets: dataSet };
};

export const barChartOptions = {
    tooltips: {
        enabled: false,
        custom: CustomTooltips,
    },
    animation: {
        duration: 5000,
    },
    maintainAspectRatio: false,
    scales: {
        xAxes: [
            {
                barPercentage: 0.3,
                ticks: {
                    fontSize: 14,
                },
                stacked: true,
            },
        ],
        yAxes: [
            {
                display: true,
                ticks: {
                    stepSize: 1,
                    fontSize: 14,
                    beginAtZero: true,
                },
                stacked: true,
            },
        ],
    },
};

export const prepareDougnutChart = (chartData, labels) => {
    let chart = {
        labels: labels.slice(2, 5),
    };
    chart.datasets = [
        {
            data: prepareChartData(chartData).slice(2, 5),
            backgroundColor: chartColors.slice(2, 5),
            hoverBackgroundColor: chartColors.slice(2, 5),
        },
    ];
    return chart;
};

export const preparePieChart = (chartData) => {
    let chart = {
        labels: chartData.genres_with_books[0],
    };

    chart.datasets = [
        {
            data: chartData.genres_with_books[1],
            backgroundColor: chartData.genres_with_books[2],
            hoverBackgroundColor: chartData.genres_with_books[3],
        },
    ];

    return chart;
};
