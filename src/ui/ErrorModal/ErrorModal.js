import  React from 'react';
import {Modal , Button} from 'react-bootstrap'


 export const ErrorModal = React.memo(props => {
  
  return (
    
   <>
   
    <Modal show={true} animation={false}  backdrop="static" >
      <Modal.Header>
        <Modal.Title>Error</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <p>Something went wrong</p>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={props.onClose}>Close</Button>   
      </Modal.Footer>
    </ Modal>
    
    </>    
    
    
  );
});

