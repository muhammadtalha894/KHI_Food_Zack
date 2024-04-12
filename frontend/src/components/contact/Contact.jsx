import { motion } from "framer-motion";
import burger from "../../assets/burger2.png";
import { useEffect, useState } from "react";
import { useSendEmailMutation } from "../../redux/reducers/contactReducer";
import toast, { Toaster } from "react-hot-toast";

const Contact = () => {
  const [sendEmail, result] = useSendEmailMutation();
  const [contactdata, setcontactdata] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleOnSubmit = (e) => {
    e.preventDefault();
    sendEmail(contactdata);
    contactdata.name = "";
    contactdata.email = "";
    contactdata.message = "SS";
  };
  const handleOnChange = (e) => {
    let value = e.target.value;
    let name = e.target.name;

    setcontactdata({ ...contactdata, [name]: value });
  };

  useEffect(() => {
    if (result.isSuccess === true) {
      toast.success("Email Send Successfully");
    }
  }, [result.isSuccess]);
  return (
    <section className="contact">
      <motion.form
        initial={{
          x: "-100%",
          opacity: 0,
        }}
        whileInView={{ x: "0", opacity: 1 }}
        onSubmit={handleOnSubmit}
      >
        <h2>Contact Us</h2>
        <input
          type="text"
          placeholder="Name"
          name="name"
          value={contactdata.name}
          onChange={handleOnChange}
        />
        <input
          type="email"
          placeholder="Email"
          name="email"
          value={contactdata.email}
          onChange={handleOnChange}
        />
        <textarea
          name="message"
          placeholder="Message..."
          cols="30"
          rows="10"
          value={contactdata.message}
          onChange={handleOnChange}
        />
        <button type="submit">Email</button>
      </motion.form>

      <motion.div
        initial={{
          x: "100%",
          opacity: 0,
        }}
        whileInView={{ x: "0", opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="contactBorder"
      >
        <motion.img
          initial={{
            y: "-100%",
            x: "50%",
            opacity: 0,
          }}
          whileInView={{ y: "100%", x: "50%", opacity: 1 }}
          transition={{ duration: 1 }}
          src={burger}
          alt="Burger"
        />{" "}
      </motion.div>
      <Toaster />
    </section>
  );
};

export default Contact;
