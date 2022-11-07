
import EmployeeHeader from "./EmployeeHeader";
import Order from './Order';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Card from 'react-bootstrap/Card';
import { useState } from 'react';
// import {Card} from '@mui/material';

import axios from 'axios'
let array = []
async function fetch_data() {
    var endpoint = 'http://localhost:4173/' + 'menu'
    console.log(endpoint)
    const res = await axios.get(endpoint)
    return res
}

function parse_data() {
    fetch_data().then(res => {
        //console.log(res)
        let tmp_headers = []
        for (const [idx, field] of Object.entries(res.data.fields)) {
            tmp_headers.push(field.name)
        }
        //console.log(tmp_headers)
        // setHeaders(tmp_headers)
        // setTData(res.data.rows)
        //console.log(res.data.rows)
       
        
        // data.push(parse_data());
        // let tmp_rows = []
        for(const [idx, field] of Object.entries(res.data.rows)){
            //var row =  res.data.rows[idx];
            // let object_array = Object.values(row);
            // let iter = new MenuItem(array[0], array[1], array[2], array[3], array[4]);

            // array.push({id: object_array[0], name: object_array[1], price: object_array[3]});
            array.push({id: field.id, name: field.description, price: field.cost})
        
        }
        //console.log(tmp_rows)
        // return tmp_rows;
        // for(var i = 0; i < tmp_rows.length(); i++){
            
        // }

    })

}

console.log(array);
parse_data();

console.log(array);

let menu_items = array;







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