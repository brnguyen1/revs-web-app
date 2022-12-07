import "bootstrap/dist/css/bootstrap.min.css";
import Order from './Order';
import OrderModalSummary from './OrderModalSummary';
import React from 'react'
import Button from "react-bootstrap/Button";
import { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import './Styles.css';
import axios from 'axios'
import Modal from 'react-bootstrap/Modal';

//Order Card Modal
const OrderModal = ({ open, onClose, item, ingredients, inventory, Addons, Removes, setAddons, setRemoves, addToCart }) => {

    const addIngredientAddons = (ingredient) => {
        setAddons(current => [...current, ingredient])
    };
    const removeIngredientAddons = (ingredient) => {
        setAddons(Addons.filter((i) => i !== ingredient))
    };
    const addIngredientRemoves = (ingredient) => {
        setRemoves(current => [...current, ingredient])
    };
    const removeIngredientRemoves = (ingredient) => {
        setRemoves(Removes.filter((i) => i !== ingredient))
    };


    const clearAddons = (ingredient) => {
        setAddons([])
    };
    const clearRemoves = (ingredient) => {
        setRemoves([])
    };
    function addZeroes(num) {
        // Convert input string to a number and store as a variable.
        var value = Number(num);
        // Split the input string into two arrays containing integers/decimals
        var res = num.split(".");
        // If there is no decimal point or only one decimal place found.
        if (res.length == 1 || res[1].length < 3) {
            // Set the number to two decimal places
            value = value.toFixed(2);
        }
        // Return updated or original number.
        return value;
    }

    const renderButtons = (arr, type, inventory_) => {


        if (type === "primary") {
            return arr.map((i) => {
                return (

                    <div>
                        {/* {i + "  "} //temporary removal for testing 
                        <input type="checkbox" class="btn-check" id={i} autocomplete="off"></input>
                        <label class="btn btn-primary" for={i}>X</label> */}

                        <Button >{i}</Button>
                        <Button onClick={() => removeIngredientRemoves(i)}>Undo</Button>
                        <Button onClick={() => addIngredientRemoves(i)}>Remove Ingedient</Button>
                    </div>

                )
            });
        } else {
            if (arr === null) {
                return (<div></div>)
            }
            return arr.map((i) => {

                let price = ""
                for (let j = 0; j < inventory_.length; j++) {
                    if (inventory_[j].name === i) {
                        let num_price = inventory_[j].price
                        num_price = addZeroes(num_price)
                        price = num_price.toString();
                        price = "$" + price
                        if (price === "$0.00") {
                            price = ""
                        }

                    }
                }
                return (

                    <div>
                        <Button>{i + " "}{price}</Button>
                        <Button onClick={() => removeIngredientAddons(i)}>X</Button>
                        <Button onClick={() => addIngredientAddons(i)}>+</Button>
                    </div>

                )
            });
        }
    }

    let type_of_food = "Chicken Tenders"
    if (item.group === "Burgers") {
        type_of_food = "Burger"
    }
    if (item.group === "Sandwiches") {
        type_of_food = "Sandwich"
    }
    if (item.group === "Salads") {
        type_of_food = "Salad"
    }
    if (item.group === "Sides") {
        type_of_food = "Sides"
    }
    item.Addons = Addons;
    item.Removes = Removes;


    if (!open) return null
    return (
        <>

            <Modal
                show={open}
                onHide={onClose}
                // backdrop="static"
                keyboard={false}
                size="modal-dialog modal-xl"
                // dialogClassName="overlay"
                class="modal"

            >
                <Modal.Header closeButton onClick={() => { clearAddons(); clearRemoves() }}>
                    <Modal.Title>{item.name}</Modal.Title>

                </Modal.Header>
                <Modal.Body>
                    <OrderModalSummary item={item} addons={Addons} removes={Removes} inventory_={inventory} addToCart={addToCart} clearAddons = {clearAddons} clearRemoves = {clearRemoves} onClose = {onClose} />


                    <div>Ingredients</div>
                    {renderButtons(ingredients.arr, "primary", inventory)}
                    <div>Add to your {type_of_food}</div>
                    {renderButtons(ingredients.addons, "s", inventory)}
                    <div>Sides</div>
                    {renderButtons(ingredients.sides, "s", inventory)}
                    <div>Dipping Sauce/Dressing</div>
                    {renderButtons(ingredients.sauces, "s", inventory)}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => { onClose(); clearAddons(); clearRemoves() }}>
                        Close
                    </Button>
                </Modal.Footer>


            </Modal>


        </>
    )
}



// Get menu items from backend then create cards from menu items
const OrderMenuPage = (props) => {
    const [selectedItem, setSelectedItem] = useState([]);
    const [selectedIngredients, setSelectedIngredients] = useState([]);
    const [items, setItems] = useState([]);
    const [menuOptions, setMenuOptions] = useState([]);
    const [Ingredients, setIngredients] = useState([]);
    const [Inventory, setInventory] = useState([]);
    const [Orders, setOrders] = useState([]);
    const [queue, setQueue] = useState([])
    const [openOrderModal, setOpenOrderModal] = useState(false);
    const [Addons, setAddons] = useState([]);
    const [Removes, setRemoves] = useState([]);

    const groups = ["Burgers", "Sandwiches", "Fried Chicken", "Salads", "Sides"];
    useEffect(() => {
        async function fetch_data() {
            var endpoint = process.env.REACT_APP_BACKEND_API + 'menu'
            const res = await axios.get(endpoint)
            return res
        }
        async function fetch_inventory() {
            var endpoint = process.env.REACT_APP_BACKEND_API + 'inventory'
            const res = await axios.get(endpoint)
            return res
        }
        async function fetch_orders() {
            var endpoint = process.env.REACT_APP_BACKEND_API + 'orders'
            const res = await axios.get(endpoint)
            return res
        }
        async function fetch_queue() {
            var endpoint = process.env.REACT_APP_BACKEND_API + 'queue'
            const res = await axios.get(endpoint)
            return res
        }
        function parse_data() {
            fetch_data().then(res => {
                let menu_data = [];
                let ingredients = [];

                Object.values(res.data).forEach(field => {
                    menu_data.push({ id: field.id, name: field.description, price: field.cost, group: field.group, added: [], removed: [], ingredients: Array(field.ingredients), information: field.information, image_name: field.image_name })
                    ingredients.push({ id: field.id, arr: field.ingredients, addons: field.addon_ingredients, sides: field.side_options, sauces: field.sauces })

                })
                setMenuOptions(menu_data)
                setIngredients(ingredients)

            })
            fetch_inventory().then(res => {
                let inventory = [];
                Object.values(res.data).forEach(field => {
                    inventory.push({ name: field.description, price: field.cost })

                })
                setInventory(inventory)
            })
            fetch_orders().then(res => {
                let orders = [];
                Object.values(res.data).forEach(field => {
                    orders.push({ id: field.id, order_items: field.order_items, cost: field.cost, order_menu_items: field.order_menu_items })

                })
                setOrders(orders)
            })

            fetch_queue().then(res => {
                setQueue(res.data)
            })
        }
        parse_data();
    }, [])

    // Order/ cart functions
    const completeQueue = (itemData) => {
        removeQueueItem(itemData)
        delete itemData.id
        itemData.employee_id = localStorage.getItem("employee_id")
        axios.post(process.env.REACT_APP_BACKEND_API + 'orders', itemData)
    }

    const removeQueueItem = (itemData) => {
        axios.delete(process.env.REACT_APP_BACKEND_API + 'queue/' + String(itemData.id))
        setQueue(queue.filter(item => { return item.id !== itemData.id }));
    }

    const OrderIDNumber = () => {
        let max = 0;
        for (let i = 0; i < Orders.length; i++) {
            if (Orders[i].id > max) {
                max = Orders[i].id
            }

        }

        max += 1
        return max
    }

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
    function ButtonPress(i){
        addToCart(i);
        alert("Added Item To Cart");
    }
    // Queue function

    const renderCards = (arr, type) => {
        if (type === "customer") {
            //console.log(category)
            return arr.map((i) => {
                if(i.group !== "Sides"){
                    return (

                        <Card style={{ width: '18rem' }} className="card text-center w-25 me-1 mb-4" key={i.id} onClick={() => { setOpenOrderModal(true); setSelectedItem(i); setSelectedIngredients(Ingredients.find(element => element.id === i.id)); }}>
                            <Card.Img variant="top" src={`./Menu_Photos/${i.image_name}.jpg`} />
                            <Card.Body>
                                <Card.Title style={{ fontSize: `${parseInt(localStorage.getItem("fontsize"))}px` }}>{i.name}
                                </Card.Title>
                                <Card.Text>
                                    ${i.price}
                                </Card.Text>
                                <Card.Text>
                                    {i.information}
                                </Card.Text>
                                <div onClick={(e) => {
                                    e.stopPropagation()
                                }}>
                                    <Button style={{ fontSize: `${parseInt(localStorage.getItem("fontsize")) - 2}px` }} onClick={() => ButtonPress(i)}>Add to order</Button>
                                </div>
                            </Card.Body>
                        </Card>
    
                    )
                }
                else{
                    return (
                        <Card style={{ width: '18rem' }} className="card text-center w-25 me-1 mb-4" key={i.id} onClick={() => {  setSelectedItem(i); setSelectedIngredients(Ingredients.find(element => element.id === i.id)); }}>
                            <Card.Img variant="top" src={`./Menu_Photos/${i.image_name}.jpg`} />
                            <Card.Body>
                                <Card.Title style={{ fontSize: `${parseInt(localStorage.getItem("fontsize"))}px` }}>{i.name}
                                </Card.Title>
                                <Card.Text>
                                    ${i.price}
                                </Card.Text>
                                <Card.Text>
                                    {i.information}
                                </Card.Text>
                                <div onClick={(e) => {
                                    e.stopPropagation()
                                }}>
                                    <Button style={{ fontSize: `${parseInt(localStorage.getItem("fontsize")) - 2}px` }} onClick={() => ButtonPress(i)}>Add to order</Button>
                                </div>
                            </Card.Body>
                        </Card>
                    )
                }
            });
        }
        else {
            return arr.map((i) => {
                return (
                    <Card style={{ width: '18rem' }} className="card text-center w-25 me-1 mb-4" key={i.id} onClick={() => { setSelectedItem(i); setSelectedIngredients(Ingredients.find(element => element.id === i.id)); }}>

                        <Card.Body>
                            <Card.Title style={{ fontSize: `${parseInt(localStorage.getItem("fontsize")) + 6}px` }}>{i.name}</Card.Title>
                            <div onClick={(e) => {
                                e.stopPropagation()
                            }}>
                                <div className="row">
                                    <div className="col-6">
                                        <Button style={{ fontSize: `${parseInt(localStorage.getItem("fontsize")) - 2}px` }} onClick={() => { setOpenOrderModal(true); setSelectedItem(i); setSelectedIngredients(Ingredients.find(element => element.id === i.id)); }}>Customize</Button>
                                    </div>
                                    <div className="col-6">
                                        <Button style={{ fontSize: `${parseInt(localStorage.getItem("fontsize")) - 2}px` }} onClick={() => addToCart(i)}>Quick Add</Button>
                                    </div>
                                </div>
                            </div>
                        </Card.Body>
                    </Card>
                )
            });
        }

    };
    const renderCategories = (groups_, arr, type) => {
        return groups_.map((i) => {
            let category_items = []
            for (let j = 0; j < arr.length; j++) {
                if (arr[j].group == i) {
                    category_items.push(arr[j])
                }
            }

            return (
                <>
                    <div class="font" style={{ fontSize: `${parseInt(localStorage.getItem("fontsize")) + 16}px` }}>
                        <b>{i}</b>
                    </div>
                    <div class="d-flex flex-wrap justify-content-left pb-3" style={{ fontSize: `${parseInt(localStorage.getItem("fontsize"))}px` }}>
                        {renderCards(category_items, type)}
                    </div>

                </>
            )
        });
    };

    // Return component based on type of call
    // customer view
    if (props.type === "customer") {
        return (
            <div className="container mt-2 h-100">
                {/*<h4>Order Creation Page</h4>*/}
                <div className="mt-2">
                    <div className="mx-5" style={{ fontSize: `${parseInt(localStorage.getItem("fontsize"))}px` }}>
                        <Order
                            items={items}
                            addToCart={addToCart}
                            removeFromCart={removeFromCart}
                            order_number={OrderIDNumber()}
                            type={props.type}
                            setItems={setItems}
                        ></Order>
                    </div>
                    <div>
                        {renderCategories(groups, menuOptions, props.type)}
                        <OrderModal open={openOrderModal} onClose={() => setOpenOrderModal(false)} item={selectedItem} ingredients={selectedIngredients} inventory={Inventory} Addons={Addons} Removes={Removes} setAddons={setAddons} setRemoves={setRemoves} addToCart={addToCart} />
                    </div>
                </div>
            </div>
        )
    }

    // Employee view
    return (
        <div id="employee-container" className="container-fluid mt-2 w-100">
            <div className="row h-100">
                <div id="employee-cards" className="col-7 pb-5">
                    {renderCategories(groups, menuOptions, props.type)}
                    <OrderModal open={openOrderModal} onClose={() => setOpenOrderModal(false)} item={selectedItem} ingredients={selectedIngredients} inventory={Inventory} Addons={Addons} Removes={Removes} setAddons={setAddons} setRemoves={setRemoves} addToCart={addToCart} />
                </div>
                <div className="col-5" style={{ fontSize: `${parseInt(localStorage.getItem("fontsize"))}px` }}>
                    <div className="row">
                        <Order
                            items={items}
                            addToCart={addToCart}
                            removeFromCart={removeFromCart}
                            order_number={OrderIDNumber()}
                            type={props.type}
                            setItems={setItems}
                        ></Order>
                    </div>
                    <div className="row">
                        <div className="container-fluid">
                            <h4>Queue</h4>
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th>
                                            Queue ID
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {queue.map(item => {
                                        return (
                                            <tr>
                                                <td>
                                                    {item.id}
                                                </td>
                                                <td>
                                                    <button type="button" className="btn btn-primary btn-sm" onClick={() => completeQueue(item)}> Complete</button>
                                                </td>

                                                <td>
                                                    <button type="button" className="btn btn-danger btn-sm" onClick={() => removeQueueItem(item)}> Remove </button>
                                                </td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </table>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )



}

export default OrderMenuPage;