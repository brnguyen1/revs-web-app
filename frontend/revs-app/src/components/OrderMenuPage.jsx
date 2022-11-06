
import EmployeeHeader from "./EmployeeHeader";
import Order from './Order';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Card from 'react-bootstrap/Card';
import { useState } from 'react';
// import {Card} from '@mui/material';


let menu_items=[ // dummy data will be substituted for data from data base
    {
        id: 1,
        name: "Object0",
        price: 10
    },
    {
        id: 2,
        name: "Object1",
        price: 11
    },
    {
        id: 3,
        name: "Object2",
        price: 12
    },

];




function handlePress(event) {
        
    console.log('Hey there clicker!');
    event.preventDefault();

}



const OrderMenuPage = () => {
    const [items, setItems] = useState([]);
    const addToCart = (item) => {
        const validitem = items.find((i) => i.id === item.id);
        if (validitem) {
        setItems(
            items.map((i) =>
                i.id === item.id ? { ...validitem, qty: validitem.qty + 1 } : i
            )
        );
        } else {
            setItems([...items, { ...item, qty: 1 }]);
        }
    };
    const removeFromCart = (item) => {
        const validitem = items.find((i) => i.id === item.id);
        if (validitem.qty === 1) {
        setItems(items.filter((i) => i.id !== item.id));
        } else {
        setItems(
            items.map((i) =>
            i.id === item.id ? { ...validitem, qty: validitem.qty - 1 } : i
            )
        );
        }
    };
    const renderCards = (arr) => {
        return arr.map((i) => {
          return <Card style={{ width: '9rem' }} className="row">
          <Card.Body>
            <Card.Title>{i.name}</Card.Title>
           
            <Button onClick = {() => addToCart(i)}>Add to order</Button>
          </Card.Body>
        </Card>
        });
      };
    return (
        <div>
            <EmployeeHeader />
            
            <div>Order Creation Page</div>
            <Order
          items={items}
          addToCart={addToCart}
          removeFromCart={removeFromCart}
        ></Order>
            <div>{renderCards(menu_items)}</div>
           
        </div>
    )
    
}

export default OrderMenuPage;