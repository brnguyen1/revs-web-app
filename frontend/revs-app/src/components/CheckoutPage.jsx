import CustomerHeader from "./CustomerHeader";
import Cart from './Cart';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Card from 'react-bootstrap/Card';
import { useState } from 'react';
// import {Card} from '@mui/material';


// let menu_items=[ // dummy data will be substituted for data from data base
//     {
//         id: 1,
//         name: "Object0",
//         price: 10
//     },
//     {
//         id: 2,
//         name: "Object1",
//         price: 11
//     },
//     {
//         id: 3,
//         name: "Object2",
//         price: 12
//     },

// ];

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



const CheckoutPage = () => {
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
          return <Card style={{ width: '18rem' }} className="row">
          <Card.Img variant="top" src="holder.js/100px180" />
          <Card.Body>
            <Card.Title>{i.name}</Card.Title>
            <Card.Text>
            Description of menu item
            </Card.Text>
            <Card.Text>
            {i.price}$
            </Card.Text>
            <Button onClick = {() => addToCart(i)}>Add to order</Button>
          </Card.Body>
        </Card>
        });
      };
    return (
        <div>
            <CustomerHeader />
            
            <div>Checkout Page</div>
            <Cart
          items={items}
          addToCart={addToCart}
          removeFromCart={removeFromCart}
        ></Cart>
            <div>{renderCards(menu_items)}</div>
           
        </div>
    )
    
}

export default CheckoutPage;