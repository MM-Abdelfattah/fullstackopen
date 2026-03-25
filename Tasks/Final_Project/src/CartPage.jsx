import { Link, useLocation } from "react-router";
import "./App.css";
import { useState } from "react";

export default function CartPage() {
  const locator = useLocation();
  const ShopItems = locator.state?.items || [];

  let requiredItems = ShopItems.filter((element) => element.total > 0);

  const [finalItems, setFinalItems] = useState(requiredItems);

  function increaseQ(index) {
    const updatedCart = [...finalItems];
    updatedCart[index].total += 1;
    setFinalItems(updatedCart);
  }

  function decreaseQ(index) {
    const updatedCart = [...finalItems];
    updatedCart[index].total -= 1;
    setFinalItems(updatedCart);

    // To automatically remove the item if the quantity is less than 1
    const filteredCart = updatedCart.filter((item) => item.total > 0);
    setFinalItems(filteredCart);
  }

  function removeItem(itemName) {
    const updatedCart = finalItems.filter((item) => item.title !== itemName);
    setFinalItems(updatedCart);
  }

  let totalItems = 0;
  finalItems.forEach((e) => {
    totalItems += e.total;
  });

  let totalPrice = 0;
  finalItems.forEach((e) => {
    totalPrice += e.price * e.total;
  });

  return (
    <>
      <nav>
        <ul>
          <h3>This is the Crate page</h3>
          <li>
            <Link to={"/"}>Home Page</Link>
          </li>
          <li>
            <Link to={"/ShopPageAPI"}>Shop Page</Link>
          </li>
        </ul>
      </nav>
      <section className="products">
        {finalItems.map((item, index) => (
          <>
            <div key={item.title}>
              <h2>{item.title}</h2>
              <p>Quantity: {item.total}</p>
              <button className="controller" onClick={() => increaseQ(index)}>
                +
              </button>
              <button className="controller" onClick={() => decreaseQ(index)}>
                -
              </button>
              <button onClick={() => removeItem(item.title)}>
                Remove Item
              </button>
              <hr />
            </div>
          </>
        ))}
        <h2>Total products = {totalItems} </h2>
        <h2>Total Price = {totalPrice} $</h2>
      </section>
    </>
  );
}
