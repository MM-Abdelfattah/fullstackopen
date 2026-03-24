// import { useState } from "react";
import { Link } from "react-router";
import "./App.css";

function App() {
  return (
    <>
      <nav>
        <ul>
          <h2>This is the home page</h2>
          <li>
            <Link to={"/ShopPageAPI"}>Shop Page</Link>
          </li>
        </ul>
      </nav>
      <section>
        <p>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Harum
          laboriosam nihil officia illo placeat temporibus maxime consequatur
          dicta ipsum, eaque sapiente non neque, iste quisquam excepturi, quidem
          suscipit ad. Reprehenderit?
        </p>
        <p>efakbk</p>
      </section>
    </>
  );
}

export default App;
