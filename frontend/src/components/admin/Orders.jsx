import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineEye } from 'react-icons/ai';
import { GiArmoredBoomerang } from 'react-icons/gi';
import {
  useGetAllOrdersAdminQuery,
  useLazyUpdateOrderStatusQuery,
} from '../../redux/reducers/orderReducer';
import Loader from '../layout/Loader';
import toast, { Toaster } from 'react-hot-toast';

const Orders = () => {
  const { data, isLoading, isError } = useGetAllOrdersAdminQuery();
  const [updateStatus, result] = useLazyUpdateOrderStatusQuery();

  useEffect(() => {
    if (result.isSuccess) {
      toast.success(result.data.message);
    }
  }, [result.isSuccess]);

  const handleOnClick = (id) => {
    updateStatus(id);
  };

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          {' '}
          <section className='tableclass'>
            <main>
              <table>
                <thead>
                  <tr>
                    <th>Order Id</th>
                    <th>Status</th>
                    <th>Item Qty</th>
                    <th>Amount</th>
                    <th>User</th>
                    <th>Action</th>
                  </tr>
                </thead>

                <tbody>
                  {data &&
                    data.orders.map((i) => (
                      <tr key={i._id}>
                        <td>{i._id}</td>
                        <td>{i.orderStatus}</td>
                        <td>{i.orderItems.length}</td>
                        <td>Rs.{i.totalAmount}</td>
                        <td>{i.user.name}</td>
                        <td>
                          <Link to={`/order/${i._id}`}>
                            <AiOutlineEye />
                          </Link>

                          <button onClick={() => handleOnClick(i._id)}>
                            <GiArmoredBoomerang />
                          </button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </main>
            <Toaster />
          </section>
        </>
      )}
    </>
  );
};

export default Orders;
