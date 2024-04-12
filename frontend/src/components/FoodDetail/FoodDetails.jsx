import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useItemDetailsQuery } from '../../redux/reducers/itemReducer';
import Loader from '../layout/Loader';
import toast, { Toaster } from 'react-hot-toast';
import { useLazyUpdateRatingQuery } from '../../redux/reducers/itemReducer';

const FoodDetails = () => {
  const [updateRating, result] = useLazyUpdateRatingQuery();
  let [value, setValue] = useState(0);
  useEffect(() => {
    if (result.isSuccess) {
      toast.success(result.data.message);
    }
  }, [value]);

  const { id } = useParams();
  let [quantity, setquantity] = useState(1);
  const increment = () => {
    setquantity((quantity += 1));
  };

  const decrement = () => {
    if (quantity <= 1) return;
    return setquantity(quantity - 1);
  };

  const { data, isError, isLoading } = useItemDetailsQuery(id);

  const handleOnRating = (e, rating, id) => {
    if (rating === null) {
      setValue(0);
      result.isSuccess = false;
      toast.error('Stars in empty');
    } else {
      updateRating({ id, rating });
      setValue(rating);
    }
  };

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <section className='foodDetails'>
            <div>
              <img src={data.item.image.url} alt='' />
            </div>

            <main>
              <h3>{data.item.title}</h3>
              <p>{data.item.description}</p>
              <Box
                sx={{
                  '& > legend': { mt: 2 },
                }}
              >
                <Typography component='legend'>!Rate</Typography>
                <Rating
                  name='simple-controlled'
                  value={value}
                  onChange={(event, newValue) => {
                    handleOnRating(event, newValue, data.item._id);
                  }}
                />
              </Box>

              <div>
                <button onClick={decrement}>-</button>
                <input type='num' readOnly value={quantity} />
                <button onClick={increment}>+</button>
              </div>

              <Link to={'/cart'}>
                <button
                  className='addToCart'
                  onClick={() => {
                    localStorage.setItem(
                      data.item.title,
                      JSON.stringify({
                        ...data.item,
                        quantity,
                        price: quantity * data.item.price,
                      }),
                    );
                    toast.success('Added to Cart');
                  }}
                >
                  add to cart
                </button>
              </Link>
            </main>
            <Toaster />
          </section>
        </>
      )}
    </>
  );
};

export default FoodDetails;
