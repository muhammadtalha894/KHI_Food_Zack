import { motion } from "framer-motion";
import { FcGoogle } from "react-icons/fc";
const Login = () => {
  const loginHandler = () => {
    window.open("http://localhost:8000/api/v1/googlelogin", "_self");
  };
  return (
    <section className="login">
      <motion.button
        initial={{ y: "-100%", opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        onClick={loginHandler}
      >
        Login With Google
        <FcGoogle />
      </motion.button>
    </section>
  );
};

export default Login;
