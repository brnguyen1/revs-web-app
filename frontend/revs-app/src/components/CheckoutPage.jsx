import CustomerHeader from "./CustomerHeader";
import Form from "react-bootstrap/Form";

import Button from "react-bootstrap/Button";
import Card from 'react-bootstrap/Card';
// import {Card} from '@mui/material';

let menu_items=[ // dummy data will be substituted for data from data base
    {
        name: "Object0",
        price: 10
    },
    {
        name: "Object1",
        price: 11
    },
    {
        name: "Object2",
        price: 12
    },

];


function handlePress(event) {
        
    console.log('Hey there clicker!');
    event.preventDefault();

}


const renderCards = (arr) => {
    return arr.map((i) => {
      return <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src="holder.js/100px180" />
      <Card.Body>
        <Card.Title>{i.name}</Card.Title>
        <Card.Text>
        Description of menu item
        </Card.Text>
        <Card.Text>
        {i.price}$
        </Card.Text>
        <Button variant="primary">Add to order</Button>
      </Card.Body>
    </Card>
    });
  };
const CheckoutPage = () => {
    return (
        <div>
            <CustomerHeader />
            
            <div>Checkout Page</div>
            <div>{renderCards(menu_items)}</div>
            {/* <div>{renderButtons(menu_items, selected)}</div> */}
        </div>
    )
    
}

export default CheckoutPage;