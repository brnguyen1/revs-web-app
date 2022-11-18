import "bootstrap/dist/css/bootstrap.min.css";
import Order from './Order';
import React from 'react'
import Button from "react-bootstrap/Button";
import { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import './Styles.css';
import axios from 'axios'

// Get menu items from backend then create cards from menu items

const ArrayDropdown = (props) => {
    const [isOpen, setOpen] = useState(false)
    const menuClass = `dropdown-menu${isOpen ? " show" : ""}`;

    const toggleDrop = () => {
        setOpen(!isOpen)
    }

    return (
        <div className="dropdown" >
            <button type="button" onMouseEnter={toggleDrop} onMouseLeave={toggleDrop} className="btn btn-secondary" id={props.id} data-togle="dropdown" aria-haspopup="true" aria-expanded="false">
                Items
            </button>
            <div className={menuClass} aria-labelledby={props.id}>
                {props.items.map(val =>
                    <button className="dropdown-item">{val}</button>
                )}
            </div>
        </div>
    )
}


const OrderMenuPage = (props) => {
    const [items, setItems] = useState([]);
    const [menuOptions, setMenuOptions] = useState([]);
    const [Ingredients, setIngredients] = useState([]);
    const [Inventory, setInventory] = useState([]);
    useEffect(() => {
        async function fetch_data() {
            var endpoint = 'http://localhost:4173/menu'
            const res = await axios.get(endpoint)
            return res
        }
        async function fetch_inventory() {
            var endpoint = 'http://localhost:4173/inventory'
            const res = await axios.get(endpoint)
            return res
        }

        function parse_data() {
            fetch_data().then(res => {
                let menu_data = [];
                let ingredients = [];
                
                Object.values(res.data.rows).forEach(field => {
                    menu_data.push({ id: field.id, name: field.description, price: field.cost })
                    ingredients.push({id: field.id, arr: field.ingredients})
                    
                })
                setMenuOptions(menu_data)
                setIngredients(ingredients)


            })
            fetch_inventory().then(res => {
                let inventory = [];
                Object.values(res.data.rows).forEach(field => {
                    inventory.push({name: field.description, price: field.price})
                    
                })
                setInventory(inventory)
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

    const itemOptionsPopUp = (id) => {

    }

    const renderCards = (arr, type) => {
        if(type === "customer"){
            return arr.map((i) => {
                return (
                    // <div className="card text-center w-25 me-1 mb-4" key={i.id} onClick={() => addToCart(i)}>
                    //     <div className="card-body">
                    //         <h6 className="card-title">
                    //             {i.name}
                    //         </h6>
                    //         <p className="card-text"></p>
                    //         {/* <Button onClick={() => addToCart(i)}>Add to order Customer</Button> */}
                    //     </div>
                    // </div>
                    <Card style={{ width: '18rem' }} className="card text-center w-25 me-1 mb-4" key={i.id} onClick={() => addToCart(i)}>
                    <Card.Img variant="top" src="holder.js/100px180" />
                    <Card.Body>
                      <Card.Title>{i.name}</Card.Title>
                      <Card.Text>
                        ${i.price}
                      </Card.Text>
                      <Card.Text>
                        Replace with item description from database also add image for product
                      </Card.Text>
                      <Button onClick={() => addToCart(i)}>Add to order</Button>
                    </Card.Body>
                  </Card>
                )
            });                
        }
        else{
            return arr.map((i) => {
                return (
                    <div className="card text-center w-25 me-1 mb-4" key={i.id} >
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
        }
        
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
                    {renderCards(menuOptions, props.type)}
                </div>
            </div>
        </div>
    )

}

export default OrderMenuPage;