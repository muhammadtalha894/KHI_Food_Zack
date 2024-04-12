import { motion } from "framer-motion";
import Founder from "./Founder";
import Menu from "./Menu";

const Home = () => {
  const options = {
    initial: {
      x: "-100%",
      opacity: 0,
    },
    whileInView: {
      x: 0,
      opacity: 1,
    },
  };
  return (
    <>
      {" "}
      <section className="home">
        <div>
          <motion.h1
            initial={{ x: "-100%", opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
          >
            <span style={{ color: "rgba(255, 149, 0, 0.94)" }}>KHI </span>Food
            Zack
          </motion.h1>
          <motion.p
            initial={{ x: "-100%", opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            Give Your Self a Tasty{" "}
            <span style={{ color: "rgba(255, 149, 0, 0.94)" }}>Food. </span>
          </motion.p>
        </div>

        <motion.a
          transition={{ duration: 0.5 }}
          initial={{ y: "-100%", opacity: 0 }}
          href="#menu"
          whileInView={{ y: 0, opacity: 1 }}
        >
          Explore Menu
        </motion.a>
      </section>
      <Founder />
      <Menu />
    </>
  );
};

export default Home;
