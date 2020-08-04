import React, { useEffect } from 'react'
import '../CurrencyElement'
import CurrencyElement from '../CurrencyElement'
import * as actionCreators from '../../store/actions';
import { connect } from 'react-redux';
import { Row, Col, Badge } from 'react-bootstrap';
import * as style from './CurrencyStyle';
import {ErrorModal} from '../../ui/ErrorModal/ErrorModal';
import {BounceLoader} from 'react-spinners';

function Currency(props)
{    
      const {
        currencyList,
        toCurrency, toCurrencyChange,
        fromCurrency, fromCurrencyChange,
        fromQuantity, toQuantity,    
        fromQuantityChange,toQuantityChange,
        storeResult,getExchangeRate,
        isError,isLoading,clearError
    } = props;     
   

    useEffect(()=>{
        storeResult()
    },[storeResult])

    useEffect(()=>{
        getExchangeRate(fromCurrency,toCurrency)
    },[fromCurrency,toCurrency,getExchangeRate])



    return (     
    <>
    
    {isError &&
    <Row>  
        <ErrorModal onClose = {clearError} /> 
    </Row>          
    } 
    
    {(isLoading && !isError) &&      
    <div className='row align-items-center' style={{height: '100vh'}}>
        <Col sm={{span: 1, offset: 6}} >  
            <BounceLoader loading size={48} />
        </Col>    
    </div> 
    }

    {!isLoading &&
    <Row>            
        <Col md={3}></Col> 
        <Col md={{ span: 6}} style={style.box}>   
            <Row style={style.rowStyle}>
                <h4>
                    Currency<Badge variant="secondary">Calculator</Badge>
                </h4>
            </Row>
            <Row style={style.rowStyle}>         
                <CurrencyElement
                    currencyList={currencyList}
                    onChangeCurrency={e => fromCurrencyChange(e.target.value)}
                    onChangeQuantity={e => fromQuantityChange(e.target.value)}
                    selectedCurrency={fromCurrency}  
                    quantity={fromQuantity}             
                />
            </Row>
            <Row style={style.rowStyle}>
                <CurrencyElement
                    currencyList={currencyList}
                    onChangeCurrency={e => toCurrencyChange(e.target.value)}
                    onChangeQuantity={e => toQuantityChange(e.target.value)}
                    selectedCurrency={toCurrency}    
                    quantity={toQuantity}            
                />
            </Row>
        </Col>

    </Row>
    }
    </>  
    )
}

const mapStateToProps = ({currency}) => ({   
    currencyList: currency.currencyList,
    fromCurrency: currency.fromCurrency,   
    toCurrency: currency.toCurrency,
    quantity: currency.quantity,
    fromQuantity: currency.fromQuantity,
    toQuantity: currency.toQuantity,
    isError: currency.isError,
    isLoading: currency.isLoading,
});

const mapDispatchToProps = dispatch => {
    return {
        storeResult: () => dispatch(actionCreators.storeResult()),
        fromCurrencyChange: payload => dispatch(actionCreators.fromCurrencyChange(payload)),
        toCurrencyChange: payload => dispatch(actionCreators.toCurrencyChange(payload)),
        fromQuantityChange: payload => dispatch(actionCreators.fromQuantityChange(payload)),
        toQuantityChange: payload => dispatch(actionCreators.toQuantityChange(payload)),
        getExchangeRate: (from, to) => dispatch(actionCreators.getExchangeRate(from, to)),
        clearError: () => dispatch(actionCreators.clearError()),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Currency);