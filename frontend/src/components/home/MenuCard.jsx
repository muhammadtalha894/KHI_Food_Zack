import { motion } from 'framer-motion';
import { useState } from 'react';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';

const MenuCard = ({ food }) => {
  return (
    <>
      <motion.div
        className='menuCard'
        initial={{ x: '-100%', opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
      >
        <div>Item {food.itemNum}</div>
        <main>
          <motion.img src={food.image.url} alt='' />
          <h5>Rs. {food.price}</h5>
          <p>{food.title}</p>
          <Box
            sx={{
              '& > legend': { mt: 2 },
            }}
          >
            <Typography component='legend'>Rating</Typography>
            <Rating
              name='simple-controlled'
              value={food.overAllRating}
              ha
              readOnly
              onChange={(event, newValue) => {
                setValue(newValue);
              }}
            />{' '}
          </Box>
          <Link to={`/Food/${food._id}`}>
            <button>Buy Now</button>
          </Link>
        </main>
      </motion.div>
    </>
  );
};

export default MenuCard;
