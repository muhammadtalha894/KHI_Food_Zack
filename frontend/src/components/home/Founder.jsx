import me from "../../assets/me.jpg";
import { motion } from "framer-motion";
const Founder = () => {
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
      <section className="founder">
        <motion.div {...options}>
          <img src={me} alt="Founder" width={150} height={150} />
          <h3>Muhammad Talha</h3>
          <p>
            Hi, Everyone I'm Muhammad Talha, the founder of KHI Food Zack.
            <br />
            Our aim is to surf you most tasty food in cheap price.
          </p>
        </motion.div>
      </section>
    </>
  );
};

export default Founder;
