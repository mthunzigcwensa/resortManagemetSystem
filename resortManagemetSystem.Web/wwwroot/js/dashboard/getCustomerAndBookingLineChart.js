﻿
$(document).ready(function () {
    loadCustomerAndBookingLineChart();
});

function loadCustomerAndBookingLineChart() {
    $(".chart-spinner").show();

    $.ajax({
        url: "/Dashboard/GetMemberAndBookingLineChartData",
        type: 'GET',
        dataType: 'json',
        success: function (data) {

            loadLineChart("newMembersAndBookingsLineChart", data);

            $(".chart-spinner").hide();
        }
    });
}

function loadLineChart(id, data) {
    var chartColors = getChartColorsArray(id);
    var options = {
        colors: chartColors,
        chart: {
            height: 350,
            //show area later
            type: 'line',
            zoom: {
                type: 'x',
                enabled: true,
                autoScaleYaxis: true
            },
        },
        stroke: {
            curve: 'smooth',
            width: 2
        },
        series: data.series,
        dataLabels: {
            enabled: false,
        },
        markers: {
            size: 6,
            strokeWidth: 0,
            hover: {
                size: 9
            }
        },
        xaxis: {
            categories: data.categories,
            labels: {
                style: {
                    colors: "#000000",
                },
            }
        },
        yaxis: {
            labels: {
                //formatter: function (val) {
                //    return val.toFixed(0);
                //},
                style: {
                    colors: "#000000",
                    
                },
            }
        },
        legend: {
            labels: {
                colors: "#000000",
                
            },
        },
        tooltip: {
            theme: 'light'
        }
    };
    var chart = new ApexCharts(document.querySelector("#" + id), options);
    chart.render();
}