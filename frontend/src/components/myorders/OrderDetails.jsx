import { useParams } from 'react-router-dom';
import { useOrderDetailsQuery } from '../../redux/reducers/orderReducer';
import Loader from '../layout/Loader';

const OrderDetails = () => {
  const { id } = useParams();

  const { data, isError, isLoading } = useOrderDetailsQuery(id);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <section className='orderdetails'>
          <main>
            <h1>Order Details</h1>
            <div>
              <h1>Shipping</h1>
              <p>
                <strong>Address</strong>
                {`Hno ${data.order.shippingInfo.hNo}, Area ${data.order.shippingInfo.area}, City ${data.order.shippingInfo.city}  `}
              </p>
            </div>
            <div>
              <h1>Contact</h1>
              <p>
                <strong>Name</strong>
                {data.order.user.name}
              </p>
              <p>
                <strong>Phone</strong>
                {data.order.shippingInfo.phone}
              </p>
            </div>
            <div>
              <h1>Status</h1>
              <p>
                <strong>Order Status</strong>
                {data.order.orderStatus}
              </p>
              <p>
                <strong>Placed At</strong>
                {data.order.placedAt}
              </p>
              <p>
                <strong>Delivery At</strong>
                {data.order.deliveredAt}
              </p>
            </div>

            <div>
              <h1>Amount</h1>
              <p>
                <strong>Items Total</strong>
                Rs.{data.order.subTotal}
              </p>
              <p>
                <strong>Delivery Charges</strong>
                Rs.{data.order.deliveryCharges}
              </p>
              <p>
                <strong>Discount</strong>
                5%
              </p>
            </div>

            <article>
              <h1>Ordered Items</h1>

              {data.order.orderItems.map((i) => (
                <div key={i._id}>
                  <h4>{i.item}</h4>
                  <div>
                    <span>{i.quantity}</span> x <span>{i.price}</span>
                  </div>
                </div>
              ))}

              <div>
                <h4 style={{ fontWeight: '800' }}>Total Amount</h4>
                <div style={{ fontWeight: '800', fontFamily: 'Roboto' }}>
                  Rs. {data.order.totalAmount}
                </div>
              </div>
            </article>
          </main>
        </section>
      )}
    </>
  );
};

export default OrderDetails;
