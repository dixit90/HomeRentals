import { useEffect, useState } from "react";
import {categories} from "../data"
import "../styles/Listing.scss"
import ListingCard from "./ListingCard";
import Loader from "./Loader"
import {useDispatch, useSelector} from "react-redux"
import {setListings } from "../redux/state";

const Listings = () => {
  const dispatch = useDispatch()
  const [loading,setLoading] = useState(true)

  const [selectedCategory,setSelectedCategory] = useState("All")
  const listings = useSelector((state) => state.listings)
  const getFeedlistings = async () => {
    try {
      const response = await fetch(
        selectedCategory !== "All" ?
        `http://localhost:3001/properties?category=${selectedCategory}` : "http://localhost:3001/properties",
        {
          method: "GET",
        }
      );
      const data = await response.json()
      dispatch(setListings ({listings:data}))
      setLoading(false)

        } catch (err) {
          console.log("Featch Listings Failed" , err.message)
        }
  };

  useEffect(() =>{
    getFeedlistings();

  },[selectedCategory]
);
console.log(listings)

  return (
    <>
    <div className='category-list'>
      {categories?.map((category,index) => (
        <div className={`category ${category.lable === selectedCategory? "selected" : ""}`} key={index} onClick={() => setSelectedCategory(category.label)}>
          <div className="category_icon">{category.icon}</div>
          <p>{category.label}</p>

        </div>
      ))}
    </div>

    {loading ? (
        <Loader />
      ) : (
        <div className="listings">
          {listings.map(
            ({
              _id,
              creator,
              listingPhotoPaths,
              city,
              province,
              country,
              category,
              type,
              price,
              booking=false
            }) => (
              <ListingCard
                listingId={_id}
                creator={creator}
                listingPhotoPaths={listingPhotoPaths}
                city={city}
                province={province}
                country={country}
                category={category}
                type={type}
                price={price}
                booking={booking}
              />
            )
          )}
        </div>
      )}
    </>
  );
};

export default Listings