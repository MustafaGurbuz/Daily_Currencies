import React, { useEffect, useState } from 'react';
import { Pie, Doughnut } from 'react-chartjs-2';
import Data from './data.json';
import axios from '../../axios-currency';

const pieDoughnot = () => {
    const connected = []
    const disconnected = []

    const [rates, setRates] = useState([]);

    useEffect(() => {
        axios.get()
            .then(response => {
                const rates = response.data.rates;
                setRates(rates)
            })
    }, []);

    const allRatesName = Object.keys(rates).map(rate =>
        rates[rate] > 20 ? '' : rate);
    const allRatesValue = Object.keys(rates).map(rate =>
        rates[rate] > 20 ? null : (rates[rate].toFixed(3)));

    Data.map(res => {
        if (res.message === 'client is disconnected!') {
            disconnected.push(res.message)
        }
        else {
            connected.push(res.message)
        }
    })

    const state = {
        labels: allRatesName,
        datasets: [
            {
                label: 'Online Currency',
                data: allRatesValue,
                backgroundColor: 'rgb(0, 90, 156, 0.5)',
                hoverBackgroundColor: 'white'
            }
        ]
    }

    return (
        <div>
            <Pie
                data={state}
                options={{
                    title: {
                        display: true,
                        text: 'Online Currencies Changes per Euro(EUR)',
                        fontSize: 20,
                        fontColor: 'red'
                    },
                    legend: {
                        display: false,
                        position: 'right'
                    }
                }}
            />
            <Doughnut
                data={state}
                options={{
                    title: {
                        display: true,
                        text: 'Online Currencies Changes per Euro(EUR)',
                        fontSize: 20,
                        fontColor: 'red'
                    },
                    legend: {
                        display: false,
                        position: 'right'
                    }
                }}
            />
        </div>
    )
}

export default pieDoughnot;