import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { MdDashboard } from "react-icons/md";

import { useGetuserQuery } from "../../redux/reducers/userReducer";
import { useLazyUserLoggedoutQuery } from "../../redux/reducers/userReducer";
const Profile = ({ Authenticated }) => {
  const { data, error, isLoading } = useGetuserQuery();
  const [getlogout, result] = useLazyUserLoggedoutQuery();

  if (data) {
    console.log(data.user.photo);
  }
  const options = {
    initial: {
      y: "-100%",
      opacity: 0,
    },
    animate: {
      y: 0,
      opacity: 1,
    },
  };
  return (
    <>
      <section className="profile">
        <main>
          <motion.img src={data && data.user.photo} alt="User" {...options} />
          <motion.h5 {...options} transition={{ duration: 0.3 }}>
            {data && data.user.name}
          </motion.h5>
          {data && data.user.role == "admin" ? (
            <>
              <motion.div {...options} transition={{ duration: 0.5 }}>
                <Link
                  to="/admin/dashboard"
                  style={{ borderRadius: 0, background: "black" }}
                >
                  <MdDashboard />
                  Dashboard
                </Link>
              </motion.div>
            </>
          ) : null}
          <motion.div {...options} transition={{ duration: 0.5 }}>
            <Link to="/myorders">My Orders</Link>
          </motion.div>

          <Link to={"/login"}>
            {" "}
            <motion.button
              initial={{ x: "-100%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.6 }}
              onClick={() => {
                getlogout();
                Authenticated(false);
              }}
            >
              Logout
            </motion.button>
          </Link>
        </main>
      </section>
    </>
  );
};

export default Profile;
