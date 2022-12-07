import React from 'react';
import { useState, useEffect } from 'react';
// import { v4 as uuid } from 'uuid';
const renderText = (arr, symbol, inventory_, quantity) => {
  function addZeroes(num) {
    // Convert input string to a number and store as a variable.
        var value = Number(num);      
    // Split the input string into two arrays containing integers/decimals
        var res = num.split(".");     
    // If there is no decimal point or only one decimal place found.
        if(res.length == 1 || res[1].length < 3) { 
    // Set the number to two decimal places
            value = value.toFixed(2);
        }
    // Return updated or original number.
    return value;
}

  return arr.map((i) => {
    let price = ""
    for(let j = 0; j < inventory_.length; j++){
        if(inventory_[j].name === i){
            let num_price = inventory_[j].price
            num_price = addZeroes(num_price)
            price = num_price.toString();
            price = "$" + price
            if(price === "$0.00"){
                price = ""
            }
            if(symbol === "-"){
              price = "$0.00"
            }
            
        }
    }
 
    return(

      <>
      <div className="row">
             <div class = "col-sm">
                {symbol}{i}
            </div>
            <div class = "col-sm">
            </div>
            <div class = "col-sm" >
            {/* {quantity} x {price} */}
            {"   " +price}
            </div>
            </div>
      </>
    )
});
};

const calculateTotalPrice = (arr, initial,  inventory_, quantity) => {
  function addZeroes(num) {
    // Convert input string to a number and store as a variable.
        var value = Number(num);      
    // Split the input string into two arrays containing integers/decimals
        var res = num.split(".");     
    // If there is no decimal point or only one decimal place found.
        if(res.length == 1 || res[1].length < 3) { 
    // Set the number to two decimal places
            value = value.toFixed(2);
        }
    // Return updated or original number.
    return value;
  }
  let price_num = Number(initial)
  arr.map((i) => {
    <li key={i}>
  </li>
    let price = ""
    for(let j = 0; j < inventory_.length; j++){
        if(inventory_[j].name === i){
            let num_price = inventory_[j].price
            num_price = addZeroes(num_price)
            price = num_price.toString();
            
        }
    }
    price_num += Number(price)
  });
  price_num = price_num * quantity;
  return price_num;
};



export default function OrderModalSummary(props){
    const {item, addons, removes, inventory_, addToCart, clearAddons, clearRemoves, onClose} = props;
    const [quantity, setQuantity] = useState(1);
    // const [price, setPrice] = useState(0);
    // const [price, setPrice] = useState(item.price)

    const incrementQuantity = () => {
      // Update state with incremented value
      setQuantity(quantity + 1);
    };
    const decrementQuantity = () => {
      // Update state with incremented value
      if(quantity > 1){
        setQuantity(quantity - 1);
      }
      
    };
    

    

    // const [price, setPrice] = useState(0)
    // for(let i = 0; i < addons.length; i++){
    //   for(let j = 0; j < inventory_.length; j++){
    //     if(inventory_[j].name === addons[i]){
    //       setPrice(price + Number(inventory_[j].price))
          
          
    //     }
    //   }
    // }
    // setPrice(price + item.price)
    // let price = item.price
    let price = Number(calculateTotalPrice(addons, item.price, inventory_, quantity)).toFixed(2)
    console.log(price)
    let item_for_cart = {id: item.id, name: (item.name + "-Customized"), price: price, group: item.group, added: addons, removed: removes, ingredients: item.ingredients}
    // function sendItem(){
    //   for(let i = 0; i < quantity; i++){
        
    //   }
    // }
    
    return (
      <div >
        <div>
      
          
            {/* <div key={item.id} className="row">
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
            </div> */}

            <div key={item.id} className="row">
              <div className="col-sm">{item.name}</div>
              
                <div className="col-sm">
                  {/* <button  onClick={decrementQuantity}>
                    -
                  </button>{' '}
                  <button onClick={incrementQuantity}>
                    +
                  </button> */}
                </div>
              <div class = "col-sm">
              {/* {quantity} x ${Number(item.price).toFixed(2)} */}
               ${Number(item.price).toFixed(2)}
              
              </div>
            {renderText(addons, "+", inventory_, quantity) }
            {renderText(removes, "-", inventory_, quantity) }
            <hr></hr>
            <div class = "col-sm">
              Total Price of Customized Menu Items: ${Number(calculateTotalPrice(addons, item.price, inventory_, quantity)).toFixed(2)}
            </div>
            
          </div>
  
        
            
  

              </div>
              <hr />
              <div className="row">
                <button onClick={() => {addToCart(item_for_cart);  onClose(); clearAddons(); clearRemoves()}}>
                    {/* {need to add logic that interacts with backend for placing order} */}
                  Add to cart
                </button>
              </div>
          
        </div>
    );
}
