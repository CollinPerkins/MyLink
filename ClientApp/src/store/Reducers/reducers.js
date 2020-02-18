import * as AuthenticationReducer from './AuthenticationReducer';
import * as UsersReducer from './UsersReducer';
import * as AlertReducer from './AlertReducer';
import * as CounterReducer from './CounterReducer';
import * as WeatherForecastsReducer from './WeatherReducer';

const reducers = {
    counter: CounterReducer.reducer,
    alert: AlertReducer.reducer,
    authentication: AuthenticationReducer.reducer,
    users: UsersReducer.reducer,
    weatherForecasts: WeatherForecastsReducer.reducer
};

export default reducers;
