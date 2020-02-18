import { weatherConstants } from '../constants/WeatherConstants';

const initialState = { forecasts: [], isLoading: false };
export const reducer = (state, action) => {
    state = state || initialState;
    if (action.type === weatherConstants.RequestWeatherForecastsType) {
        return {
            ...state,
            startDateIndex: action.startDateIndex,
            isLoading: true
        };
    }

    if (action.type === weatherConstants.ReceiveWeatherForecastsType) {
        return {
            ...state,
            startDateIndex: action.startDateIndex,
            forecasts: action.forecasts,
            isLoading: false
        };
    }

    return state;
};