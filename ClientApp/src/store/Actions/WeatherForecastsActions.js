import axios from 'axios';
import { weatherConstants } from '../constants/WeatherConstants';
import { authHeader, ROOT_API_URL } from '../../helpers/auth-header';

export const weatherActions = {
    requestWeatherForecasts
};


function requestWeatherForecasts(startDateIndex) {
    return (dispatch, getState) => {

        if (startDateIndex === getState().weatherForecasts.startDateIndex) {
            // Don't issue a duplicate request (we already have or are loading the requested data)
            return;
        }

        dispatch({
            type: weatherConstants.RequestWeatherForecastsType,
            startDateIndex
        });


        axios.get(`${ROOT_API_URL}/SampleData/WeatherForecasts?startDateIndex=${startDateIndex}`, { headers: authHeader() }).then((response) => {
            const forecasts = response.data;

            dispatch({
                type: weatherConstants.ReceiveWeatherForecastsType,
                startDateIndex, forecasts
            });
        });
    };
}
