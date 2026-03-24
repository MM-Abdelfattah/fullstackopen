import { Link, Outlet } from "react-router";
import { useState, useEffect } from "react";

export default function ShopPageAPI() {
  const [ShopItems, setShopItems] = useState([]);

  useEffect(() => {
    async function getProducts() {
      try {
        const response = await fetch(
          "https://api.escuelajs.co/api/v1/products",
        );
        const data = await response.json();

        // add total property to each product because it is not in the data I will get from the API
        const productsWithQuantity = data.map((product) => ({
          ...product,
          total: 0,
        }));
        setShopItems(productsWithQuantity);
      } catch (error) {
        console.log(error);
      }
    }
    getProducts();
  }, []);

  function ProductHandeler({ item, index }) {
    const [quantity, setQuantity] = useState(0);

    function addToCart() {
      const updatedList = [...ShopItems];
      updatedList[index].total = quantity;
      setShopItems(updatedList);
      alert(`Added ${quantity} of ${item.title} to cart!`);
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
              <div className="card" key={item.title}>
                <img src={item.images} width="100px" />
                <h3>{item.title}</h3>
                {/* <p>{item.description}</p> */}
                {/* <Link to={`/ProductPage/${item.id}`}>View details</Link> */}
                <Link to={"/ProductPage"}>View details</Link>
                <ProductHandeler item={item} index={index} />
              </div>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}
