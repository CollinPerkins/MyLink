import * as Home from './HomeReducer';
import * as Counter from '../Counter';
import * as WeatherForecasts from '../WeatherForecasts';

const reducers = {
    home: Home.reducer,
    counter: Counter.reducer,
    weatherForecasts: WeatherForecasts.reducer
};

export default reducers;
