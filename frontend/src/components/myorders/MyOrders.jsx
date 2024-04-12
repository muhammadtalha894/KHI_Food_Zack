import React from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineEye } from 'react-icons/ai';
import Loader from '../layout/Loader';
import { useMyOrdersQuery } from '../../redux/reducers/orderReducer';

const MyOrders = () => {
  const { data, isError, isLoading } = useMyOrdersQuery();

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <>
            {data && data.order[0] ? (
              <section className='tableclass'>
                <main>
                  <table>
                    <thead>
                      <tr>
                        <th>Order Id</th>
                        <th>status</th>
                        <th>Item Qty</th>
                        <th>Amount</th>

                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.order.map((i) => (
                        <tr key={i._id}>
                          <td>{i._id}</td>
                          <td>{i.orderStatus}</td>
                          <td>{i.orderItems.length}</td>
                          <td>{i.totalAmount}</td>

                          <td>
                            <Link to={`/order/${i._id}`}>
                              {' '}
                              <AiOutlineEye />
                            </Link>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </main>
              </section>
            ) : (
              <h1
                style={{
                  textAlign: 'center',
                  height: '100vh',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                No Order Yet
              </h1>
            )}
          </>{' '}
        </>
      )}
    </>
  );
};

export default MyOrders;
