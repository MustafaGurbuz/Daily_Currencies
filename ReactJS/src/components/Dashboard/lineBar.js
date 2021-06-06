import React from 'react';
import { Line, Bar } from 'react-chartjs-2';
import Data from './data.json';
import axios from '../../axios-currency';


//OPTINAL 
//IF THE API IS NOT WORKING YOU CAN USE THIS DUMMY DATA

const connected = []
const disconnected = []

Data.map(res => {
    if (res.message === 'client is disconnected!') {
        disconnected.push(res.message)
    }
    else {
        connected.push(res.message)
    }
})


const total = connected.length + disconnected.length

const line = {
    labels: ['First', 'Connected', 'Disconnected', 'Last'],
    datasets: [{
        label: 'Online Currency Changes',
        fill: false,
        lineTension: 0.1,
        backgroundColor: 'black',
        borderColor: 'white',
        borderCapStyle: 'butt',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBorderColor: 'rgba(75,192,192,1)',
        pointBackgroundColor: '#fff',
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: 'rgba(75,192,192,1)',
        pointHoverBorderColor: 'rgba(220,220,220,1)',
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: [0, connected.length, disconnected.length, total]
    }]
}

// YOU CAN GIVE -line- AS AN ARGUMENT TO LINE / BAR

class LineBar extends React.Component {

    constructor(props) {
        super(props);
        this.getRates = this.getRates.bind(this);
    }
    state = {
        rates: []
    }

    getRates() {
        axios.get()
            .then(response => {
                const rates = response.data.rates;
                this.setState({
                    rates
                })
            })
    }

    componentDidMount() {
        this.getRates();
    }


    render() {
        const allRatesName = Object.keys(this.state.rates).map(rate => rate);
        const allRatesValue = Object.keys(this.state.rates).map(rate =>
            this.state.rates[rate] > 20 ? '' : (this.state.rates[rate].toFixed(3)));


        const Currency = {
            labels: allRatesName,
            datasets: [{
                label: 'Daily rate per Euro (EUR) ',
                axis: 'y',
                borderWidth: 1,
                fill: true,
                lineTension: 0.1,
                backgroundColor: 'rgb(0, 90, 156, 0.5)',
                borderColor: 'white',
                data: allRatesValue
            }]
        }
        return (
            <div>
                <Line
                    data={Currency}
                    ref="chart"
                />
                <Bar
                    data={Currency}
                    ref="chart"
                />
            </div >
        )
    }
}

export default LineBar;