import React from 'react';
export default function Order(props) {
  const { items, addToCart, removeFromCart } = props;
  const itemsCost = items.reduce((x, y) => x + y.qty * y.price, 0);
  const taxCost = itemsCost * 0.14;
  const totalCost = itemsCost + taxCost;
  return (
    <div >
      <div>
        {items.length !== 0 && <h2>Order Items</h2>}
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
          </div>
        ))}

        {items.length !== 0 && (
          <>
            <hr></hr>
            <div className="row">
              <div className="col-2">Items Price</div>
              <div className="col-1 text-right">${itemsCost.toFixed(2)}</div>
            </div>
            <div className="row">
              <div className="col-2">Tax Price</div>
              <div className="col-1 text-right">${taxCost.toFixed(2)}</div>
            </div>

            <div className="row">
              <div className="col-2">
                <strong>Total Price</strong>
              </div>
              <div className="col-1 text-right">
                <strong>${totalCost.toFixed(2)}</strong>
              </div>
            </div>
            <hr />
            <div className="row">
              <button onClick={() => alert('Implement Checkout!')}>
                {/* {need to add logic that interacts with backend for placing order} */}
                Confirm Order
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

