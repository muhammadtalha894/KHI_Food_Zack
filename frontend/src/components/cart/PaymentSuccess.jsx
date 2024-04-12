import { NavLink } from "react-router-dom";
import tick from "../../assets/tick.png";
import { motion } from "framer-motion";
import { duration } from "@mui/material";

const PaymentSuccess = () => {
  return (
    <section className="paymentsuccess">
      <main>
        <h1>Order Confirmed</h1>
        <p>Order Placed Successfully, You can check your order status below</p>
        <NavLink to="/myorders">Check Status</NavLink>
        <motion.img
          src={tick}
          alt=""
          width={100}
          height={100}
          initial={{ x: "-100%", opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        />
      </main>
    </section>
  );
};

export default PaymentSuccess;
