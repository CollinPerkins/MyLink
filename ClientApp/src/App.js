import React from 'react';
import { ConnectedRouter } from 'react-router-redux';
import Home from './components/Home';
import Counter from './components/Counter';
import FetchData from './components/FetchData';
import NavMenu from './components/NavMenu';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';

import { history } from './helpers/history';
import * as alertActions from './store/Actions/AlertActions';
import { PrivateRoute } from './components/PrivateRoute';
import HomePage from './Views/HomePage/HomePage';
import LoginPage from './Views/SignupSignin/LoginPage';
import RegistrationPage from './Views/SignupSignin/RegistrationPage';
import "./App.css";


class App extends React.Component {
    constructor(props) {
        super(props);

        const { dispatch } = this.props;
        history.listen((location, action) => {
            // clear alert on location change
            dispatch(alertActions.clear());
        });
    }

    render() {
        return (
            <div>
                {this.props.alert.message &&
                    <div className={`alert ${this.props.alert.type}`}>{this.props.alert.message}</div>
                }
                <ConnectedRouter history={history}>
                    <div>
                        <NavMenu />
                        <div className="container">
                            <PrivateRoute path="/home" component={HomePage} />
                            <PrivateRoute path='/fetch-data/:startDateIndex?' component={FetchData} />
                            <Route path="/login" component={LoginPage} />
                            <Route path="/register" component={RegistrationPage} />
                            <Route exact path="/" component={Home} />
                            <Route path='/counter' component={Counter} />
                        </div>
                    </div>
                </ConnectedRouter>
            </div>
        );
    }
}


function mapStateToProps(state) {
    return {
        alert: state.alert
    };
}

export default connect(mapStateToProps)(App);