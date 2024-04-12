import "./styles/app.scss";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/layout/Header";
import Home from "./components/home/Home";
import Contact from "./components/contact/Contact";
import Cart from "./components/cart/Cart";
import FoodDetails from "./components/FoodDetail/FoodDetails";
import Footer from "./components/layout/Footer";
import Shipping from "./components/cart/Shipping";
import ConfirmOrder from "./components/cart/ConfirmOrder";
import PaymentSuccess from "./components/cart/PaymentSuccess.jsx";
import Login from "./components/login/Login";
import Profile from "./components/profile/Profile.jsx";
import MyOrders from "./components/myorders/MyOrders.jsx";
import OrderDetails from "./components/myorders/OrderDetails.jsx";
import Dashboard from "./components/admin/Dashboard.jsx";
import Users from "./components/admin/Users.jsx";
import About from "./components/about/About.jsx";
import NotFound from "./components/layout/NotFound.jsx";
import Orders from "./components/admin/Orders.jsx";
import AddItem from "./components/admin/AddItem.jsx";
import { ProtectedRoute } from "protected-route-react";

import "./styles/header.scss";
import "./styles/home.scss";
import "./styles/founder.scss";
import "./styles/menu.scss";
import "./styles/footer.scss";
import "./styles/contact.scss";
import "./styles/cart.scss";
import "./styles/food.scss";
import "./styles/shipping.scss";
import "./styles/confirmOrder.scss";
import "./styles/paymentSuccess.scss";
import "./styles/login.scss";
import "./styles/profile.scss";
import "./styles/table.scss";
import "./styles/orderDetails.scss";
import "./styles/dashboard.scss";
import "./styles/about.scss";
import "./styles/additem.scss";

import toast, { Toaster } from "react-hot-toast";
import { useEffect, useState } from "react";
import { useGetuserQuery } from "./redux/reducers/userReducer.jsx";

function App() {
  const { data, error, isLoading } = useGetuserQuery();
  const [Authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    if (error) {
      toast.error(error.data.message);
    }
    if (data && data.user) {
      toast.success("Login Successfully");
      setAuthenticated(true);
    }
  }, [data, error]);
  return (
    <>
      <BrowserRouter>
        <Header Authenticated={Authenticated} data={data} />
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/contact" element={<Contact />}></Route>
          <Route path="/about" element={<About />}></Route>
          <Route path="/cart" element={<Cart />}></Route>
          <Route path="/food/:id" element={<FoodDetails />}></Route>

          <Route
            path="/login"
            element={
              <ProtectedRoute isAuthenticated={!Authenticated} redirect="/me">
                <Login />
              </ProtectedRoute>
            }
          ></Route>

          <Route element={<ProtectedRoute isAuthenticated={Authenticated} />}>
            <Route
              path="/me"
              element={<Profile Authenticated={setAuthenticated} />}
            ></Route>

            <Route path="/shipping" element={<Shipping />}></Route>
            <Route path="/confirmorder" element={<ConfirmOrder />}></Route>
            <Route path="/paymentsuccess" element={<PaymentSuccess />}></Route>
            <Route path="/myorders" element={<MyOrders />}></Route>
            <Route path="/order/:id" element={<OrderDetails />}></Route>
          </Route>

          <Route path="/admin/dashboard" element={<Dashboard />}></Route>
          <Route path="/view/users" element={<Users />}></Route>
          <Route path="/view/orders" element={<Orders />}></Route>
          <Route path="/add/item" element={<AddItem />}></Route>
          <Route path="*" element={<NotFound />}></Route>
        </Routes>
        <Toaster />
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
