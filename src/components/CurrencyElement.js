import React from 'react';
import { Form, FormGroup } from 'react-bootstrap';
export default function CurrencyElement(props) {

    const {
        currencyList,      
        onChangeCurrency,
        selectedCurrency,
        quantity,
        onChangeQuantity,
    } = props
        
    return (  
        
        
        <Form.Row>              
            <FormGroup>           
                <Form.Control type="number" className="input" value={quantity} onChange={onChangeQuantity} />              
            </FormGroup> 
            <FormGroup>                
                <Form.Control as="select" className="mr-sm-2" value={selectedCurrency} onChange={onChangeCurrency}>
                    {currencyList.map(option => (
                        <option key={option} value={option}>{option}</option>
                    ))}
                </Form.Control>                           
            </FormGroup>                              
        </Form.Row>
       
    )
}

