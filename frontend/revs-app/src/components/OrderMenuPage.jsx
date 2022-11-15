import "bootstrap/dist/css/bootstrap.min.css";
import Order from './Order';
import React from 'react'
import Button from "react-bootstrap/Button";
import { useState, useEffect } from 'react';

import axios from 'axios'

// Get menu items from backend then create cards from menu items
const OrderMenuPage = () => {
    const [items, setItems] = useState([]);
    const [menuOptions, setMenuOptions] = useState([]);

    useEffect(() => {
        async function fetch_data() {
            var endpoint = 'http://localhost:4173/menu'
            const res = await axios.get(endpoint)
            return res
        }

        function parse_data() {
            fetch_data().then(res => {
                let tmp_array = [];
                Object.values(res.data.rows).forEach(field => {
                    tmp_array.push({ id: field.id, name: field.description, price: field.cost })
                })
                setMenuOptions(tmp_array)
            })
        }

        parse_data();
    }, [])

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
                <div className="card text-center w-25 me-1 mb-4" key={i.id}>
                    <div className="card-body">
                        <h6 className="card-title">
                            {i.name}
                        </h6>
                        <p className="card-text"></p>
                        <Button onClick={() => addToCart(i)}>Add to order</Button>
                    </div>
                </div>
            )
        });
    };

    return (
        <div>
            <div className="d-flex justify-content-center mt-4">
                <h4>Order Creation Page</h4>
            </div>
            <div className="mt-5 me-5 ms-5">
                <div className="mb-5">
                    <Order
                        items={items}
                        addToCart={addToCart}
                        removeFromCart={removeFromCart}
                    ></Order>
                </div>
                <div className="d-flex flex-wrap justify-content-evenly align-contents-around">
                    {renderCards(menuOptions)}
                </div>
            </div>
        </div>
    )

}

export default OrderMenuPage;