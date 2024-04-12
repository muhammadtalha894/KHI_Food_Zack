import React from "react";
import me from "../../assets/me.jpg";
import Loader from "../layout/Loader";
import { useAdminUsersQuery } from "../../redux/reducers/userReducer";

const Users = () => {
  const { data, isError, isLoading } = useAdminUsersQuery();

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <section className="tableclass">
          <main>
            <table>
              <thead>
                <tr>
                  <th>User Id</th>
                  <th>Name</th>
                  <th>Photo</th>
                  <th>Role</th>
                  <th>Since</th>
                </tr>
              </thead>
              <tbody>
                {data.users.map((i) => (
                  <tr key={i._id}>
                    <td>{i._id}</td>
                    <td>{i.name}</td>
                    <td>
                      <img src={i.photo} alt="User" />
                    </td>
                    <td>{i.role}</td>
                    <td>{i.createdAt}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </main>
        </section>
      )}
    </>
  );
};

export default Users;
