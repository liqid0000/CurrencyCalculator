import apisCurrency from '../apis/apisCurrency';

export const STORE_RESULT = 'STORE_RESULT';
export const FROM_CURRENCY_CHANGE = 'FROM_CURRENCY_CHANGE';
export const TO_CURRENCY_CHANGE = 'TO_CURRENCY_CHANGE';
export const FROM_QUANTITY_CHANGE = 'FROM_QUANTITY_CHANGE';
export const TO_QUANTITY_CHANGE = 'TO_QUANTITY_CHANGE';
export const SET_EXCHANGE_RATE = 'GET_EXCHANGE_RATE';
export const SET_ERROR = 'SET_ERROR';
export const CLEAR_ERROR = 'CLEAR_ERROR';

const saveResult = ( res ) => {
    return {
        type: STORE_RESULT,
        payload: res
    };
}

const setExchangeRate = ( res ) => {
    return {
        type: SET_EXCHANGE_RATE,
        payload: res
    };
}

const setError = () =>{
    return {
        type: SET_ERROR        
    };
}

const fetchCurrency = (query) => {   
    return apisCurrency.get(apisCurrency.baseUrl)
}

const fetchRate = (query) =>{
    return apisCurrency.get(apisCurrency.baseUrl , {params: query})
}

export const storeResult = () => async dispatch => {  
    try{
        const {data} = await fetchCurrency();
        dispatch(saveResult([data.base, ...Object.keys(data.rates)]));     
        dispatch(fromCurrencyChange(data.base));
        dispatch(toCurrencyChange(Object.keys(data.rates)[19]));
    }catch{                
        dispatch(setError());
    }
}            

export const getExchangeRate = (fromCurrency,toCurrency) => async dispatch => {
    if (fromCurrency !== '' && toCurrency !== '') {
        try{
            const query = {
                base: fromCurrency,
                symbols: toCurrency
            }            
            const {data} = await fetchRate(query);
            dispatch(setExchangeRate(data.rates[toCurrency]));
        }catch{
            dispatch(setError())
        }
    }  
};

export const fromCurrencyChange = payload => {
    return {
        type: FROM_CURRENCY_CHANGE,
        payload
    }
}

export const toCurrencyChange = payload => {
    return {
        type: TO_CURRENCY_CHANGE,
        payload
    }
}

export const fromQuantityChange = payload => {
    return {
        type: FROM_QUANTITY_CHANGE,
        payload
    }
}

export const toQuantityChange = payload => {
    return {
        type: TO_QUANTITY_CHANGE,
        payload
    }
}

export const clearError = () =>{
    return{
        type: CLEAR_ERROR
    }
}


