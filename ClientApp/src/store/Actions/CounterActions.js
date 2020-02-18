import { counterConstants } from '../constants/CounterConstants';

export function increment() {
    return {
        type: counterConstants.incrementCountType
    };
}

export  function decrement() {
    return {
        type: counterConstants.decrementCountType
    };
}