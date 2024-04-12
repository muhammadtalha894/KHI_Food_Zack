import MenuCard from "./MenuCard";
import { useGetAllItemQuery } from "../../redux/reducers/itemReducer";
import Loader from "../layout/Loader";
const Menu = () => {
  const { data, isError, isLoading } = useGetAllItemQuery();

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <section id="menu">
          <h1>MENU</h1>
          <div>
            {data && data.items[0]
              ? data.items.map((foods) => (
                  <MenuCard key={foods._id} food={foods} />
                ))
              : null}

            {/* handler={handleAddToCard} */}
          </div>
        </section>
      )}
    </>
  );
};

export default Menu;
