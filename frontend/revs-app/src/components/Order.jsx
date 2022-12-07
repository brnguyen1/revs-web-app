import React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
/**
 * this will send the order to the queue
 * @param itemData the data about the customers order
 */
const sendOrder = (itemData) => {
  axios.post(process.env.REACT_APP_BACKEND_API + 'orders', itemData)
}
/**
 * this will send the order to the queue
 * @param itemData the data about the customers order
 */
const sendQueue = (itemData) => {
  axios.post(process.env.REACT_APP_BACKEND_API + 'queue', itemData)
}
/**
 * this function will get the id for the order
 * @returns returns the id for the order
 */
const getID = () => {
  let req = axios.get(process.env.REACT_APP_BACKEND_API + 'orders/id')
  return req
}

//fix mapping keys accross all order menu components 
/**
 * this function will create an array of menu items
 * @param arr menu items 
 * @returns an array of menu items
 */
const calculateMenuItems = (arr) => {
  let menu_items = []
  arr.map((i) => {
    <li key={i.name}>
    </li>
    for (let j = 0; j < i.qty; j++) {
      menu_items.push(i.name)
    }

  });

  return menu_items;
};
/**
 * this function will create an array of ingreditents
 * @param arr menu items
 * @returns returns an array of igredients
 */
const calculateIngredients = (arr) => {
  let ingredients = []
  arr.map((i) => {
    <li key={i.name}>
    </li>
    for (let j = 0; j < i.qty; j++) {
      for (let k = 0; k < i.ingredients.length; k++) {
        for (let l = 0; l < i.ingredients[k].length; l++) {
          ingredients.push(i.ingredients[k][l])
        }
      }
    }

  });

  return ingredients;
};
/**
 * this function will create an array for all the added ingredients
 * @param arr menu items 
 * @returns returns an array of added ingredients
 */
const calculateAddedIngredients = (arr) => {
  let ingredients = []
  arr.map((i) => {
    <li key={i.name}>
    </li>
    for (let j = 0; j < i.qty; j++) {
      for (let k = 0; k < i.added.length; k++) {
        ingredients.push(i.added[k])
      }
    }

  });

  return ingredients;
};
/**
 * this function will create an array for all the removed ingredients
 * @param arr menu items 
 * @returns returns an array of removed ingredients
 */
const calculateRemovedIngredients = (arr) => {
  let ingredients = []
  arr.map((i) => {
    <li key={i.name}>
    </li>
    for (let j = 0; j < i.qty; j++) {
      for (let k = 0; k < i.removed.length; k++) {
        ingredients.push(i.removed[k])
      }
    }

  });

  return ingredients;
};
/**
 * this function will create an array for all the total ingredients
 * @param arr menu items 
 * @returns returns an array of total ingredients
 */
const calculateNetIngredients = (arr1, arr2, arr3) => {
  let result = arr1.filter((element) => !arr3.includes(element));
  result = result.concat(arr2)

  return result
}
/**
 * this function will figure out the date and return it
 * @returns returns the real time date
 */
const getDate = () => {
  var today = new Date();
  var dd = String(today.getDate()).padStart(2, '0');
  var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
  var yyyy = today.getFullYear();

  var date = yyyy + '-' + mm + '-' + dd;
  return date
}

// Order summary component
/**
 * this funciton will be used to create orders and show all associated information for the user
 * @param props parameter
 * @returns returns a working checkout view for the user to interact with
 */
export default function Order(props) {

  // Order items calcuations variables
  const { items, addToCart, removeFromCart, order_number, setItems } = props;
  const itemsCost = items.reduce((x, y) => x + y.qty * y.price, 0);
  const taxCost = itemsCost * 0.0825;
  const totalCost = itemsCost + taxCost;
  const [maxID, setmaxID] = useState([]);
  const [loading, setLoading] = useState(true);
  const [phoneNumber, setPhoneNumber] = useState(null)
  const employee_id = 0 //get from login data 

  // Modal information
  const [modalState, setModalState] = useState(false);

  // Order calculations
  /**
   * this function will update the data for the user
   */
  function updateData() {
    getID().then(req => {

      let maxid = [];

      Object.values(req.data).forEach(field => {
        maxid.push(field.max)


      })
      setmaxID(maxid)
      setLoading(false)
    })
  };
  /**
   * this function will fullfill the request and update data
   */
  const completeRequest = () => {
    setLoading(true);
    setModalState(false)
    setPhoneNumber(null)
    updateData()
  }

  useEffect(() => {
    updateData();
  }, []);

  // Phone number handler
  /**
   * this funciton will handle the phone number of the user
   * @param e event listener
   */
  const handlePhone = (e) => {
    setPhoneNumber(e.target.value)
  }
  /**
   * this function will render the text on the screen
   * @param  arr parameter
   * @param  symbol  parameter
   * @returns 
   */
  const renderText = (arr, symbol) => {
    return arr.map((i) => {
      <li key={i.name}>
      </li>

      return (
        <div className="col-0" >
          {symbol}{i}
        </div>

      )
    });

  };

  let order_for_db = {employee_id: localStorage.getItem("employee_id"), order_items: calculateNetIngredients(calculateIngredients(items), calculateAddedIngredients(items), calculateRemovedIngredients(items)), order_menu_items: calculateMenuItems(items), cost: totalCost, order_time: getDate(), phone: phoneNumber}

  // Modal function
  const showModal = () => {
    if (items.length) {
      setModalState(true)
    }
  };
  const closeModal = () => setModalState(false);

  // Customer checkout
  const checkoutModal =
    <Modal show={modalState} onHide={closeModal} style={{ fontSize: `${parseInt(localStorage.getItem("fontsize"))}px` }}>
      <Modal.Header closeButton>
        <Modal.Title>
          Complete Order
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className='container-fluid'>
          <h2>Order Items</h2>

          {items.map((item) => (
            <div key={item.id} className="row">
              <div className="col-6">{item.name}</div>

              <div className="col-3">
                <button onClick={() => {
                  removeFromCart(item)
                  if ((items.length - 1) === 0 && (items[0].qty - 1) === 0) {
                    closeModal();
                  }
                }}>
                  -
                </button>{' '}
                <button onClick={() => addToCart(item)}>
                  +
                </button>
              </div>
              <div className="col-3 text-right">
                {item.qty} x ${Number(item.price).toFixed(2)}
              </div>
              {renderText(item.added, "+")}
              {renderText(item.removed, "-")}
            </div>
          ))}

          <hr></hr>
          <div className="row">
            <div className="col-9">Items Price</div>
            <div className="col-3 text-right">${itemsCost.toFixed(2)}</div>
          </div>
          <div className="row">
            <div className="col-9">Tax Price</div>
            <div className="col-3 text-right">${taxCost.toFixed(2)}</div>
          </div>

          <div className="row justify-content-end">
            <div className="col-9">
              <strong>Total Price</strong>
            </div>
            <div className="col-3 text-right">
              <strong>${totalCost.toFixed(2)}</strong>
            </div>
          </div>
          <hr />
        </div>

        <div className='container-fluid'>
          <input type="number" class="form-control" placeholder="Phone Number" onChange={handlePhone}/>
        </div>
      </Modal.Body>

      <Modal.Footer>
        <button type='button' className='btn btn-success' onClick={() => { delete order_for_db.employee_id; delete order_for_db.id; sendQueue(order_for_db); setItems([]); completeRequest() }}>
          Confirm Order
        </button>
      </Modal.Footer>

    </Modal >

  const footer =
    <>
      {checkoutModal}
      <div id="customer-footer" className='d-flex shadow bg-light fixed-bottom p-1 mx-auto justify-content-end'>
        <button type="button" class="btn mr-4 border" onClick={showModal}>
          <div className='d-flex'>
            <div className='p-1'>
              <svg xmlns="http://www.w3.org/2000/svg" width="2rem" height="2rem" fill={items.length > 0 ? "green" : "currentColor"} class="bi bi-bag" viewBox="0 0 16 16">
                <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V5z"></path>
              </svg>
            </div>
            <div className='p-2' style={items.length > 0 ? { color: "green" } : null}>{items.length}</div>
          </div>
        </button>
      </div>
    </>

  // Employee checkout
  const summary =
    <div className='container-fluid' id="summary">
      <h4>Order Items</h4>

      {items.map((item) => (
        <div key={item.id} className="row">
          <div className="col-4">{item.name}</div>

          <div className="col-5">
            <button onClick={() => removeFromCart(item)}>
              -
            </button>{' '}
            <button onClick={() => addToCart(item)}>
              +
            </button>
          </div>
          <div className="col-3 text-right">
            {item.qty} x ${Number(item.price).toFixed(2)}
          </div>
          {renderText(item.added, "+")}
          {renderText(item.removed, "-")}
        </div>
      ))}
      <hr></hr>
      <div className="row">
        <div className="col-9">Items Price</div>
        <div className="col-3 text-right">${itemsCost.toFixed(2)}</div>
      </div>
      <div className="row">
        <div className="col-9">Tax Price</div>
        <div className="col-3 text-right">${taxCost.toFixed(2)}</div>
      </div>

      <div className="row justify-content-end">
        <div className="col-9">
          <strong>Total Price</strong>
        </div>
        <div className="col-3 text-right">
          <strong>${totalCost.toFixed(2)}</strong>
        </div>
      </div>
      <hr />
      <button type='button' className='btn btn-success' onClick={() => { sendOrder(order_for_db); setItems([]); completeRequest() }}>
        Confirm Order
      </button>
    </div >


  return (
    <>
      {props.type === "customer" ? footer : summary}
    </>


  );
}

