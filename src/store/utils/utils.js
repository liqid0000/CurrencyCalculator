export function convert({ quantity, rate, from }) {    
    let result;
    if(quantity !== ''){
        if (from === true) {
            result = quantity * rate;
          }
          if (from === false) {
            result = quantity * (1 / rate);
          }
        
          return Math.round(result * 1000) / 1000;
    }   
    else return '';
  }
  

  
