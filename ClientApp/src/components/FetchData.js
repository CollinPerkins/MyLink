import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { weatherActions } from '../store/Actions/WeatherForecastsActions';

class FetchData extends Component {
    constructor(props) {
        super(props);

        this.state = {
        };
    }

    componentDidMount() {
        // This method is called when the component is first added to the document
        this.ensureDataFetched();
    };

    componentDidUpdate = () => {
        // This method is called when the route parameters change
        this.ensureDataFetched();
    }

    ensureDataFetched = () => {
        const { dispatch } = this.props;
        const startDateIndex = parseInt(this.props.match.params.startDateIndex, 10) || 0;
        dispatch(weatherActions.requestWeatherForecasts(startDateIndex));
    }

    

    renderForecastsTable = () => {
        return (
            <div class="table-responsive">
                <table className='table table-stripe'>
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Temp. (C)</th>
                            <th>Temp. (F)</th>
                            <th>Summary</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.weatherForecasts.forecasts.map(forecast =>
                            <tr key={forecast.dateFormatted}>
                                <td>{forecast.dateFormatted}</td>
                                <td>{forecast.temperatureC}</td>
                                <td>{forecast.temperatureF}</td>
                                <td>{forecast.summary}</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        );
    }

    renderPagination = () => {
        const prevStartDateIndex = (this.props.weatherForecasts.startDateIndex || 0) - 5;
        const nextStartDateIndex = (this.props.weatherForecasts.startDateIndex || 0) + 5;

        return <p className='clearfix text-center'>
            <Link className='btn btn-default pull-left' to={`/fetch-data/${prevStartDateIndex}`}>Previous</Link>
            <Link className='btn btn-default pull-right' to={`/fetch-data/${nextStartDateIndex}`}>Next</Link>
            {this.props.weatherForecasts.isLoading ? <span>Loading...</span> : []}
        </p>;
    }


    render() {
        return (
            <div>
                <h1>Weather forecast</h1>
                <p>This component demonstrates fetching data from the server and working with URL parameters.</p>
                {this.renderForecastsTable()}
                {this.renderPagination()}
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        weatherForecasts: state.weatherForecasts
    };
}

export default connect(mapStateToProps)(FetchData);