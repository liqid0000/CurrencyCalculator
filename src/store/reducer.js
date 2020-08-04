import * as actionTypes from './actions';
import { convert } from '../store/utils/utils';

const initialState = {
    currencyList: [],
    fromCurrency: '',
    toCurrency: '',
    fromQuantity: '',
    toQuantity: '',
    currencyRate: '',
    checkFrom: true,
    isLoading: true,
    isError: false,
};

const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case actionTypes.STORE_RESULT:
            return {
                ...state,
                isLoading: false,
                currencyList: action.payload,              
            } 
        case actionTypes.FROM_CURRENCY_CHANGE:
            return {
                ...state,
                checkFrom: true,
                fromCurrency: action.payload
            }       
        case actionTypes.TO_CURRENCY_CHANGE:
            return {
                ...state,
                checkFrom: false,
                toCurrency: action.payload
            }       
        case actionTypes.FROM_QUANTITY_CHANGE:
            return {
                ...state,
                fromQuantity: action.payload,
                toQuantity: convert({quantity: action.payload, rate: state.currencyRate , from: true})
            }       
        case actionTypes.TO_QUANTITY_CHANGE:
            return {
                ...state,
                toQuantity: action.payload,
                fromQuantity: convert({quantity: action.payload, rate: state.currencyRate , from: false})
            }       
        case actionTypes.SET_EXCHANGE_RATE:
            return {
                ...state,
                currencyRate: action.payload,
                fromQuantity: state.checkFrom ? convert({quantity: state.toQuantity, rate: action.payload,from: false}) : state.fromQuantity,
                toQuantity: state.checkFrom ? state.toQuantity : convert({quantity: state.fromQuantity, rate: action.payload,from:true })
            }
        case actionTypes.SET_ERROR:
            return {
                ...state,
                isError: true
            }
        case actionTypes.CLEAR_ERROR:
            return {
                ...state,
                fromQuantity: 0,
                toQuantity: 0,
                currencyRate:0,
                fromCurrency: 'PLN',
                toCurrency: 'PLN',
                isError: false
            }
        default: 
            return state;
    }  
};

export default reducer;

