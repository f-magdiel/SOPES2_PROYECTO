import React from 'react';
import { Doughnut } from 'react-chartjs-2';

import {
    ArcElement,
    Chart as ChartJS,
    Legend as ChartjsLegend,
    Tooltip
} from 'chart.js';

ChartJS.register(ArcElement, Tooltip,ChartjsLegend);

function Chart1({name,values}) {

    const data = {
        labels: name,
        datasets: [
            {
                data: values,
                backgroundColor: [ "red", "blue"]
            }
        ]
    }


    return (
        <div>
            <Doughnut data={data} />
        </div>
    );
}

export default Chart1;
