import { useState } from 'react';
import { useAdditemApiMutation } from '../../redux/reducers/itemReducer';
import toast, { Toaster } from 'react-hot-toast';

const AddItem = () => {
  let [additem, setadditem] = useState({
    title: '',
    description: '',
    price: '',
  });

  let [image, setimage] = useState();

  const [itemApi, result] = useAdditemApiMutation();

  if (result.isSuccess === true) {
    toast.success('Item Added Successfully');
    additem.price = '';
    additem.description = '';
    additem.title = '';
  }
  if (result.isLoading === false && result.isError === true) {
    console.log(result.error);
  }

  const handleOnChange = (e) => {
    let value = e.target.value;
    let name = e.target.name;

    setadditem({ ...additem, [name]: value });
  };

  function handleOnFile(file) {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (evt) => {
      setimage(reader.result);
    };
  }

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    itemApi({ image, additem });
  };

  return (
    <>
      <section className='additem'>
        <main>
          <h2>Add Item</h2>
          <form onSubmit={handleOnSubmit}>
            <div>
              <label>Item Name</label>
              <input
                type='text'
                name='title'
                value={additem.title}
                onChange={handleOnChange}
              />
            </div>
            <div>
              <label>Item Description</label>
              <input
                type='text'
                name='description'
                value={additem.description}
                onChange={handleOnChange}
              />
            </div>
            <div>
              <label>Item Price</label>
              <input
                type='number'
                name='price'
                value={additem.price}
                onChange={handleOnChange}
              />
            </div>
            <div>
              <label>Item image</label>
              <input
                type='file'
                accept='image/*'
                name='image'
                onChange={(e) => {
                  handleOnFile(e.target.files[0]);
                }}
              />
            </div>

            <button type='submit'>Add Item</button>
          </form>
        </main>
        <Toaster />
      </section>
    </>
  );
};

export default AddItem;
