import { Link } from "react-router";

function ProductPage() {
  return (
    <>
      <nav>
        <ul>
          <h3>This is the Product page</h3>
          <li>
            <Link to={"/"}>Home Page</Link>
          </li>
          <li>
            <Link to={"/ShopPageAPI"}>Shop Page</Link>
          </li>
        </ul>
      </nav>
      <section>
        <h1>
          I have the Idea, but I will build this page another day, because I
          don't have time right now 😅😅
        </h1>
      </section>
    </>
  );
}

export default ProductPage;
