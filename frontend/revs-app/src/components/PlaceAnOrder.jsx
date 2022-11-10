import Cart from './Cart';
import Button from "react-bootstrap/Button";
import React from 'react'
import { useState } from 'react';

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
        let tmp_headers = []
        for (const [idx, field] of Object.entries(res.data.fields)) {
            tmp_headers.push(field.name)
        }
        for (const [idx, field] of Object.entries(res.data.rows)) {
            array.push({ id: field.id, name: field.description, price: field.cost })

        }
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



const PlaceAnOrder = () => {
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
            return (
                <div class="card text-center w-25 me-1 mb-4">
                    <img src="holder.js/100px180" alt="image" />
                    <div class="card-body">
                        <h6 class="card-title">
                            {i.name}
                        </h6>
                        <p class="card-text">
                            Description of Menu Item
                        </p>
                        <p class="card-text">
                            ${i.price}
                        </p>
                        <Button onClick={() => addToCart(i)}>Add to order</Button>
                    </div>
                </div>
            )
        });
    };
    return (
        <div>
            <div class="d-flex justify-content-center mt-4">
                <h4>Place an Order</h4>
            </div>
            <div class="mt-5 me-5 ms-5 mb-5">
                <div class="mb-5">
                    <Cart
                        items={items}
                        addToCart={addToCart}
                        removeFromCart={removeFromCart}
                    ></Cart>
                </div>
                <div class="d-flex flex-wrap justify-content-evenly align-contents-around">
                    {renderCards(menu_items)}
                </div>
            </div>
        </div>
    )

}

export default PlaceAnOrder;