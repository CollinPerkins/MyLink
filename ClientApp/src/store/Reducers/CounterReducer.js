import { counterConstants } from '../constants/CounterConstants';

const initialState = { count: 0 };

export const reducer = (state = initialState, action) => {
    switch (action.type) {
        case counterConstants.incrementCountType:
            return {
                ...state,
                count: state.count + 1 
            };
        case counterConstants.decrementCountType:
            return {
                ...state,
                count: state.count - 1 
            };
        default:
            return state
    }
}