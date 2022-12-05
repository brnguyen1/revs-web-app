import React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { max } from 'moment';
import ClipLoader from "react-spinners/ClipLoader";
import * as credentials from './credentials.js'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
const sendOrder = (itemData) => {
  let req = axios.post('http://localhost:4173/orders', itemData)
  Promise.resolve(req)
  // props.handleComplete()
  // props.handleClose()
}

const getID = () => {
  let req = axios.get('http://localhost:4173/orders/id')
  Promise.resolve(req)
  // props.handleComplete()
  // props.handleClose()
  return req
}

//fix mapping keys accross all order menu components 
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
const calculateAddedIngredients = (arr) => {
  let ingredients = []
  arr.map((i) => {
    <li key={i.name}>
    </li>
    for (let j = 0; j < i.qty; j++) {
      // i.added.map((j) => {


      //   ingredients.push(j)

      // })
      for (let k = 0; k < i.added.length; k++) {
        ingredients.push(i.added[k])
      }
    }

  });

  return ingredients;
};
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

const calculateNetIngredients = (arr1, arr2, arr3) => {
  let result = arr1.filter((element) => !arr3.includes(element));
  result = result.concat(arr2)

  return result
}

const getDate = () => {
  var today = new Date();
  var dd = String(today.getDate()).padStart(2, '0');
  var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
  var yyyy = today.getFullYear();

  var date = yyyy + '-' + mm + '-' + dd;
  return date
}



export default function Order(props) {

  const { items, addToCart, removeFromCart, order_number, setItems } = props;
  const itemsCost = items.reduce((x, y) => x + y.qty * y.price, 0);
  const taxCost = itemsCost * 0.14;
  const totalCost = itemsCost + taxCost;
  const [maxID, setmaxID] = useState([]);
  const [loading, setLoading] = useState(true);
  // const [OrderNumber, setOrderNumber] = useState(0);

  //const ingredients = calculateNetIngredients(calculateIngredients(items), calculateAddedIngredients(items), calculateRemovedIngredients(items)) // get ingredients plus addons minus removes 
  //const menuitems = calculateMenuItems(items) // get from each item name 
  const employee_id = 0 //get from login data 
  //   async function fetch_orders() {
  //     var endpoint = 'http://localhost:4173/orders'
  //     const res = await axios.get(endpoint)
  //     return res
  // }

  // const OrderIDNumber = () =>{
  //   let max = 0;
  //   for(let i = 0; i < Orders.length; i++){
  //       if(Orders[i].id > max ){
  //           max = Orders[i].id
  //       }

  //   }

  //   max += 1
  //   return max
  // }

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

  const completeRequest = () => {
    setLoading(true);
    updateData()
  }
  // updateData();


  // }

  useEffect(() => {

    updateData();


  }, []);





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

  let order_for_db = { id: (maxID[0] + 1), order_items: calculateNetIngredients(calculateIngredients(items), calculateAddedIngredients(items), calculateRemovedIngredients(items)), order_menu_items: calculateMenuItems(items), cost: totalCost, order_time: getDate() }



  // console.log(calculateMenuItems(items))
  //console.log(calculateIngredients(items))
  //console.log(calculateAddedIngredients(items))
  //console.log(calculateRemovedIngredients(items))
  //console.log(calculateNetIngredients(calculateIngredients(items), calculateAddedIngredients(items), calculateRemovedIngredients(items)))

  //create item using {id: max id from table plus 1, ingredients, total cost, added?, removed?, time from browser}
  //sendItem(item)
  const order =
    <div >
      <div>

        {items.length !== 0 && <h2>{updateData()}Order Items</h2>}

        {/* {The line above renders Orders ids to prevent concurrency issues} */}
        {items.map((item) => (
          <div key={item.id} className="row">
            <div className="col-2">{item.name}</div>

            <div className="col-2">
              <button onClick={() => removeFromCart(item)}>
                -
              </button>{' '}
              <button onClick={() => addToCart(item)}>
                +
              </button>
            </div>
            <div className="col-2 text-right">
              {item.qty} x ${Number(item.price).toFixed(2)}
            </div>
            {renderText(item.added, "+")}
            {renderText(item.removed, "-")}


          </div>
        ))}

        {items.length !== 0 && (
          <>
            <hr></hr>
            <div className="row">
              <div className="col-4">Items Price</div>
              <div className="col-4 text-right">${itemsCost.toFixed(2)}</div>
            </div>
            <div className="row">
              <div className="col-4">Tax Price</div>
              <div className="col-1 text-right">${taxCost.toFixed(2)}</div>
            </div>

            <div className="row">
              <div className="col-4">
                <strong>Total Price</strong>
              </div>
              <div className="col-1 text-right">
                <strong>${totalCost.toFixed(2)}</strong>
              </div>
            </div>
            <hr />
            <div className="row">
              <button onClick={() => { sendOrder(order_for_db); setItems([]); completeRequest() }}>
                {/* {need to add logic that interacts with backend for placing order} */}
                Confirm Order
              </button>
            </div>
          </>
        )}
      </div>
    </div>


  return (
    <>
      {loading ? <ClipLoader /> : order}
    </>


  );
}

