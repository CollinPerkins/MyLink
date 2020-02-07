import * as Home from './HomeReducer';
import * as AuthenticationReducer from './AuthenticationReducer';
import * as UsersReducer from './UsersReducer';
import * as AlertReducer from './AlertReducer';
import * as Counter from '../Counter';
import * as WeatherForecasts from '../WeatherForecasts';

const reducers = {
    home: Home.reducer,
    counter: Counter.reducer,
    alert: AlertReducer.reducer,
    authentication: AuthenticationReducer.reducer,
    users: UsersReducer.reducer,
    weatherForecasts: WeatherForecasts.reducer
};

export default reducers;
