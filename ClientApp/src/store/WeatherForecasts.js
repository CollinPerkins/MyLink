import { authHeader, ROOT_API_URL } from '../helpers/auth-header';
import axios from 'axios';

const requestWeatherForecastsType = 'REQUEST_WEATHER_FORECASTS';
const receiveWeatherForecastsType = 'RECEIVE_WEATHER_FORECASTS';

export const actionCreators = {
    requestWeatherForecasts: startDateIndex => async (dispatch, getState) => {
        if (startDateIndex === getState().weatherForecasts.startDateIndex) {
            // Don't issue a duplicate request (we already have or are loading the requested data)
            return;
        }

        dispatch({ type: requestWeatherForecastsType, startDateIndex });


        axios.get(`${ROOT_API_URL}/SampleData/WeatherForecasts?startDateIndex=${startDateIndex}`, { headers: authHeader() }).then((response) => {
            const forecasts = response.data;

            dispatch({ type: receiveWeatherForecastsType, startDateIndex, forecasts });
        });
    }
};


const initialState = { forecasts: [], isLoading: false };
export const reducer = (state, action) => {
  state = state || initialState;
  if (action.type === requestWeatherForecastsType) {
    return {
      ...state,
      startDateIndex: action.startDateIndex,
      isLoading: true
    };
  }

  if (action.type === receiveWeatherForecastsType) {
    return {
      ...state,
      startDateIndex: action.startDateIndex,
      forecasts: action.forecasts,
      isLoading: false
    };
  }

  return state;
};
