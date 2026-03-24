import { createBrowserRouter } from "react-router";
import App from "./App";
import CartPage from "./CartPage";
import ShopPageAPI from "./ShopPageAPI";
import ProductPage from "./ProductPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/ShopPageAPI",
    element: <ShopPageAPI />,
  },
  {
    path: "/CartPage",
    element: <CartPage />,
  },
  {
    path: "/ProductPage",
    element: <ProductPage />,
  },
  // {
  //   path: "/ProductPage/:id",
  //   element: <ProductPage />,
  // },
]);

export default router;
