import React, { Component } from 'react';

import LineBar from '../../components/Dashboard/lineBar';
import PieDoughnot from '../../components/Dashboard/pieDoughnut';
import axios from '../../axios-currency';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import { connect } from 'react-redux';
import Spinner from '../../components/UI/Spinner/Spinner';

import classes from './Dashboard.css';

class Dashboard extends Component {

    state = {
        loading: false
    }

    render() {
        let dashboard = <Spinner />;
        if (!this.state.loading) {
            dashboard = (<div className={classes.container}>
                <div className={classes.containerOne}>
                    <LineBar />
                </div>
                <div className={classes.containerTwo}>
                    <PieDoughnot />
                </div>
            </div>)
        }
        return (
            <div>
                {dashboard}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        token: state.auth.token,
        userId: state.auth.userId
    };
};



export default connect(mapStateToProps)(withErrorHandler(Dashboard, axios));