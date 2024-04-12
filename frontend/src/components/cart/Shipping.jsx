import { City, State } from 'country-state-city';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCreateOrderMutation } from '../../redux/reducers/orderReducer';
import toast, { Toaster } from 'react-hot-toast';

const Shipping = () => {
  const navigate = useNavigate();
  const [createOrder, result] = useCreateOrderMutation();
  const [cart, setcart] = useState([]);
  useEffect(() => {
    const allKeys = Object.keys(localStorage);
    allKeys.map((key) => {
      const hello = localStorage.getItem(key);
      cart.push(JSON.parse(hello));
    });

    if (result.isSuccess) {
      navigate('/paymentsuccess');
    }
  }, [result.isSuccess]);

  const option = useRef();
  const [details, setdetails] = useState({
    hNO: '',
    area: '',
    pCode: '',
    pNo: '',
  });

  if (result.isSuccess) {
    toast.success(result.data.message);
    localStorage.clear();
    details.hNO = '';
    details.area = '';
    details.pCode = '';
    details.pNo = '';
  }

  const handleOnChange = (e) => {
    let value = e.target.value;
    let name = e.target.name;

    setdetails({ ...details, [name]: value });
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    const city = option.current.value;
    createOrder({ cart, details, city });
  };
  return (
    <>
      <section className='shipping'>
        <main>
          <h1>Shipping Details</h1>
          <form onSubmit={handleOnSubmit}>
            <div>
              <label>H No.</label>
              <input
                type='text'
                name='hNO'
                value={details.hNO}
                placeholder='Enter House NO'
                onChange={handleOnChange}
              />
            </div>
            <div>
              <label>Area</label>
              <input
                value={details.area}
                type='text'
                name='area'
                placeholder='Enter area'
                onChange={handleOnChange}
              />
            </div>
            <div>
              <label>City</label>
              <select name='' id='' ref={option}>
                {City.getCitiesOfState('PK', 'SD').map((i, index) => (
                  <option value={i.isoCode} key={index}>
                    {i.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label>Postal Code</label>
              <input
                value={details.pCode}
                type='number'
                name='pCode'
                placeholder='Enter postal code'
                onChange={handleOnChange}
              />
            </div>
            <div>
              <label>Phone No.</label>
              <input
                value={details.pNo}
                type='number'
                name='pNo'
                placeholder='Enter phone no'
                onChange={handleOnChange}
              />
            </div>

            <button type='submit'>Confirm Order</button>
          </form>
        </main>
        <Toaster />
      </section>
    </>
  );
};

export default Shipping;
