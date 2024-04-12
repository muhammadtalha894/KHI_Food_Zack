import { Link } from 'react-router-dom';
import { Doughnut } from 'react-chartjs-2';
import { Chart as chartJS, Tooltip, ArcElement, Legend } from 'chart.js';
import { useAdminStatsQuery } from '../../redux/reducers/userReducer';
import Loader from '../layout/Loader';
import { useEffect, useState } from 'react';

chartJS.register(Tooltip, ArcElement, Legend);

const Box = ({ title, value }) => {
  return (
    <>
      <div>
        <h3>{title === 'Income' ? `Rs.${value}` : value}</h3>
        <p>{title}</p>
      </div>
    </>
  );
};

const Dashboard = () => {
  const { data, isError, isLoading } = useAdminStatsQuery();

  const [preparing, setpreparing] = useState(1);
  const [shipping, setshipping] = useState(1);
  const [delivered, setdelivered] = useState(1);

  useEffect(() => {
    if (data && data.success == true) {
      setpreparing(
        data.ordersCount.preparing == 0 ? 1 : data.ordersCount.preparing,
      );
      setshipping(
        data.ordersCount.shipping == 0 ? 1 : data.ordersCount.shipping,
      );
      setdelivered(
        data.ordersCount.delivered == 0 ? 1 : data.ordersCount.delivered,
      );
    }
    if (isError) {
      console.log(isError);
    }
  }, [data, isError]);
  const datas = {
    labels: ['Preparing', 'Shipped', 'Delivered'],
    datasets: [
      {
        label: '# of orders',
        data: [preparing, shipping, delivered],
        backgroundColor: [
          'rgba(159,63,176,0.1)',
          'rgba(78,63,176,0.2)',
          'rgba(156,0,60,0.3)',
        ],
        borderColor: ['rgb(159,63,176)', 'rgb(78,63,176)', 'rgb(156,0,60)'],
        borderWidth: 1,
      },
    ],
  };
  return (
    <>
      {!data ? (
        <Loader />
      ) : (
        <section className='dashboard'>
          <main>
            <article>
              <Box
                title={'Users'}
                value={data && data.usersCount ? data.usersCount : null}
              />
              <Box
                title={'Orders'}
                value={data && data.ordersCount ? data.ordersCount.total : null}
              />
              <Box
                title={'Income'}
                value={data && data.totalIncome ? data.totalIncome : null}
              />
            </article>

            <section>
              <div>
                <Link to={'/view/orders'}>View Orders</Link>
                <Link to={'/view/users'}>View Users</Link>
                <Link to={'/add/item'}>Add Item</Link>
              </div>

              <aside>
                <Doughnut data={datas} />
              </aside>
            </section>
          </main>
        </section>
      )}
    </>
  );
};

export default Dashboard;
