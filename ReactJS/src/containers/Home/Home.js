import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from '../../axios-currency';

import { Polar } from 'react-chartjs-2';
import Aux from '../../hoc/Auxiliary';
import Modal from '../../components/UI/Modal/Modal';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/index';
import classes from './Home.css';

class Home extends Component {

    constructor(props) {
        super(props);
        this.getRates = this.getRates.bind(this);
    }

    getRates() {
        axios.get()
            .then(response => {
                const rates = response.data.rates;
                this.setState({
                    rates
                })
                console.log(rates)
            })
    }

    componentDidMount() {
        this.getRates();
    }

    state = {
        purchasing: false,
        rates: []
    }

    purchaseHandler = () => {
        if (this.props.isAuthenticated) {
            this.setState({ purchasing: true });
        }
        else {
            this.props.history.push('/auth');
        }
    }

    purchaseCancelHandler = () => {
        this.setState({ purchasing: false });
    }

    render() {

        const tl = (this.state.rates['TRY'])
        Number.parseInt(tl).toFixed(2);
        const usd = (this.state.rates['USD'])
        Number.parseInt(usd).toFixed(2);
        const eur = (this.state.rates['EUR'])
        Number.parseInt(eur).toFixed(2);
        const aed = (this.state.rates['AED'])
        Number.parseInt(aed).toFixed(2);
        const cad = (this.state.rates['CAD'])
        Number.parseInt(cad).toFixed(2);
        const zar = (this.state.rates['ZAR'])
        Number.parseInt(zar).toFixed(2);

        const Currency = {
            labels: ['TL', 'USD', 'EUR', 'AED', 'CAD', 'ZAR'],
            datasets: [{
                label: 'Current Price for (EUR) ',

                backgroundColor: [
                    'rgb(255,0,0)',
                    'rgb(0,128,0)',
                    'rgb(255, 205, 86)',
                    'rgb(255,192,203)',
                    'rgb(54, 162, 235)'
                ],
                borderColor: [
                    'rgb(255, 99, 132)',
                    'rgb(255, 159, 64)',
                    'rgb(255, 205, 86)',
                    'rgb(75, 192, 192)',
                    'rgb(54, 162, 235)',
                    'rgb(153, 102, 255)',
                ],
                borderWidth: 1,
                data: [tl, usd, eur, aed, cad, zar]
            }]
        }

        let main = <div>
            <h1>..:: Welcome to GAIS Cyber Security ::..</h1>
            <h3> ..:: You can see 6 currencies here! ::..
                <p>..:: Daily exchange rates against the Euro (EUR) ::..</p>
                <p>
                    ..:: For More Currencies ::..
               </p>
                <p>Sign In! / Sign Up!</p>
            </h3>
        </div>;
        if (this.props.isAuthenticated) {
            main = <div>
                <h1>..:: Welcome to GAIS Cyber Security ::..</h1>
                <h3> ..:: You can see 6 currencies here! ::..
                <p>..:: Daily exchange rates against the Euro (EUR) ::..</p>
                    <p>..:: Thank you for Sign In! ::..</p>
                </h3>
            </div>
        }

        return (
            <Aux>
                <Modal show={this.state.purchasing}
                    modalClosed={this.purchaseCancelHandler}>
                </Modal>
                <div className={classes.Home}>
                    {main}
                    <Polar
                        data={Currency}
                        ref="chart"
                    />
                </div>

            </Aux>
        );
    }
};

const mapStateToProps = state => {
    return {
        error: state.home.error,
        isAuthenticated: state.auth.token !== null
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onSetAuthRedirectPath: (path) => dispatch(actions.setAuthRedirectPath(path))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Home, axios));