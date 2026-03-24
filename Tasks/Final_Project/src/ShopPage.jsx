import { Link, Outlet } from "react-router";
import { useState } from "react";

export default function ShopPage() {
  const [ShopItems, setShopItems] = useState([
    { Name: "item 1", icon: "⚙️", description: "aeavaev", total: 0 },
    { Name: "item 2", icon: "⚙️", description: "veavaa", total: 0 },
    { Name: "item 3", icon: "⚙️", description: "aeva", total: 0 },
    { Name: "item 4", icon: "⚙️", description: "aegbvsdb", total: 0 },
    { Name: "item 5", icon: "⚙️", description: "wtw4ywre", total: 0 },
    { Name: "item 6", icon: "⚙️", description: "wtyw5ywr", total: 0 },
    { Name: "item 7", icon: "⚙️", description: "wytwryy", total: 0 },
  ]);

  function ProductHandeler({ item, index }) {
    const [quantity, setQuantity] = useState(0);

    function addToCart() {
      const updatedList = [...ShopItems];
      updatedList[index].total = quantity;
      setShopItems(updatedList);
      alert(`Added ${quantity} of ${item.Name} to cart!`);
    }

    return (
      <div className="ProductHandeler">
        <input
          type="number"
          value={quantity}
          placeholder="Number of items required"
          onChange={(e) =>
            setQuantity(Math.max(0, parseInt(e.target.value) || 0))
          }
        />
        <button onClick={addToCart}>Add to cart</button>
      </div>
    );
  }

  return (
    <>
      <nav>
        <ul>
          <h2>This is the shoping page</h2>
          <li>
            <Link to={"/"}>Home Page</Link>
          </li>
          <li>
            <Link to={"/CartPage"} state={{ items: ShopItems }}>
              Cart Page
            </Link>
          </li>
        </ul>
      </nav>
      <main>
        <section className="products">
          <h2>Products</h2>
          <p>Here are our awesome products</p>
          <div className="grid">
            {ShopItems.map((item, index) => (
              <div className="card" key={item.Name}>
                <div className="icon">{item.icon}</div>
                <h3>{item.Name}</h3>
                <p>{item.description}</p>
                <Link to="#">View details</Link>
                <ProductHandeler item={item} index={index} />
              </div>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}
