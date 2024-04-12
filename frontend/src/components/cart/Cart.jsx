import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const CardItem = ({ item }) => {
  return (
    <>
      <div className='cartItems'>
        <div>
          <h4>{item.title}</h4>
          <img src={item.image.url} alt='Burger' />
        </div>
        <div>
          <span>
            {item.quantity} x {item.price / item.quantity}
          </span>
        </div>
      </div>
    </>
  );
};

const Cart = () => {
  const [cart, setcart] = useState([]);

  let [initialTotal, setinitialTotal] = useState(0);

  useEffect(() => {
    const allKeys = Object.keys(localStorage);
    allKeys.map((key) => {
      const hello = localStorage.getItem(key);
      cart.push(JSON.parse(hello));
    });

    if (cart[0]) {
      cart.forEach((i) => setinitialTotal((initialTotal += i.price)));
    }
  }, []);

  return (
    <>
      <section className='cart'>
        <main>
          {cart && cart[0] ? (
            cart.map((item) => <CardItem item={item} key={item._id} />)
          ) : (
            <h1>No Item Yet</h1>
          )}

          {cart && cart[0] && (
            <article>
              <div>
                <h4>Sub Total</h4>
                <p>Rs. {initialTotal}</p>
              </div>
              <div>
                <h4>Delivery charges</h4>
                <p>Rs. {cart.length * 100}</p>
              </div>
              <div>
                <h4>Discount%</h4>
                <p>-5</p>
              </div>
              <div>
                <h4>Total </h4>
                <p>
                  {Math.round(
                    initialTotal +
                      cart.length * 100 -
                      ((initialTotal + cart.length * 100) * 5) / 100,
                  )}
                </p>
              </div>
              <Link to='/shipping'>Checkout</Link>
            </article>
          )}
        </main>
      </section>
    </>
  );
};

export default Cart;
