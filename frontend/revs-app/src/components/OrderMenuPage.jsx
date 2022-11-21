import "bootstrap/dist/css/bootstrap.min.css";
import Order from './Order';
import React from 'react'
import Button from "react-bootstrap/Button";
import { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import './Styles.css';
import axios from 'axios'
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';



//Order Card Modal
const OrderModal = ({open, onClose, item, ingredients}) => {
    const renderButtons = (arr) => {
        
        
        return arr.map((i) => {
            return (
                
               <div> <Button >{i}</Button>
               
               </div>
                 
            )
        });                
    }

    let type_of_food = "Chicken Tenders"
    if(item.group === "Burgers"){
        type_of_food = "Burger"
    }
    if(item.group === "Sandwiches"){
        type_of_food = "Sandwich"
    }
    if(item.group === "Salads"){
        type_of_food = "Salad"
    }
    if(item.group === "Sides"){
        type_of_food = "Sides"
    }
    if(!open) return null
    return(
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
            <Modal.Header closeButton>
            <Modal.Title>{item.name}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <div>Ingredients</div>
            {renderButtons(ingredients.arr)}
            <div>Add to your {type_of_food}</div>
            {renderButtons(ingredients.addons)}
            <div>Sides</div>
            {renderButtons(ingredients.sides)}
            <div>Dipping Sauce/Dressing</div>
            {renderButtons(ingredients.sauces)}
            </Modal.Body>
            <Modal.Footer>
            <Button variant="secondary" onClick={onClose}>
                Close
            </Button>
            <Button variant="primary">Understood</Button>
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
    const [openOrderModal, setOpenOrderModal] = useState(false);

    const groups = ["Burgers", "Sandwiches", "Fried Chicken", "Salads", "Sides"];
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
                
                Object.values(res.data).forEach(field => {
                    menu_data.push({ id: field.id, name: field.description, price: field.cost, group: field.group })
                    ingredients.push({id: field.id, arr: field.ingredients, addons: field.addon_ingredients, sides: field.side_options, sauces: field.sauces})
                    
                })
                setMenuOptions(menu_data)
                setIngredients(ingredients)

            })
            fetch_inventory().then(res => {
                let inventory = [];
                Object.values(res.data).forEach(field => {
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
    
                    
                    
                    <Card style={{ width: '18rem' }} className="card text-center w-25 me-1 mb-4" key={i.id} onClick = {() => {setOpenOrderModal(true); setSelectedItem(i); setSelectedIngredients(Ingredients.find(element => element.id === i.id));}}>
                    <Card.Img variant="top" src="holder.js/100px180" />
                    <Card.Body>
                      <Card.Title>{i.name}</Card.Title>
                      <Card.Text>
                        ${i.price}
                      </Card.Text>
                      <Card.Text>
                        Replace with item description from database also add image for product
                      </Card.Text>
                      <div onClick={(e)=>{
                        e.stopPropagation()
                      }}>
                         <Button onClick={() => addToCart(i)}>Add to order</Button>
                      </div>
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

    const renderCategories = (groups_, arr, type) => {
        // for(let i = 0; i < groups.length; i++){
            
        //     let category_items = []
        //     for(let j = 0; j < arr.length; j++){
        //         if(arr[j].group === groups[i]){
        //             category_items.push(arr[j])
        //         }
        //     }
         

        //         <div>
        //             {groups.length}
        //             {groups[i]}
        //             {renderCards(category_items, type)}
        //         </div>
    
        // }
        return groups_.map((i) => {
            let category_items = []
            for(let j = 0; j < arr.length; j++){
                if(arr[j].group == i){
                    category_items.push(arr[j])
                }
            }
         
            return(
                <div >
                    <div class="font">
                        {i}
                    </div>
                    <div class="d-flex flex-wrap justify-content-evenly align-contents-around">
                        {renderCards(category_items, type)}
                    </div>
                    
                </div>
            )
        });  
    };

    


    return (
        <div>
            <div className="d-flex justify-content-center mt-4">
                {/*<h4>Order Creation Page</h4>*/}
            </div>
            <div className="mt-5 me-5 ms-5">
                <div className="mb-5">
                    <Order
                        items={items}
                        addToCart={addToCart}
                        removeFromCart={removeFromCart}
                    ></Order>
                </div>
                <div>
                    {/* {renderCards(menuOptions, props.type)} */}
                    {renderCategories(groups, menuOptions, props.type)}
                    <OrderModal open = {openOrderModal} onClose = {()=>setOpenOrderModal(false)} item = {selectedItem} ingredients = {selectedIngredients}/>
                </div>
            </div>
        </div>
    )

}

export default OrderMenuPage;