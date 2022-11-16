import axios from "axios";
import React, { useEffect, useState } from "react";

export const FooterRating = ({ id, setVisible, visible }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  console.log("djkhsakjdhskja", data);
  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios({
          url: `${
            process.env.REACT_APP_DB_BASE_URL
          }${"/api/studio-post/ratingByMe"}`,
          method: "GET",
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          }, //JWT
        });
        console.log("first", data.data);
        setData(data.data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.log(error);
      }
    })();
  }, [id, visible]);
  if (loading) {
    return <></>;
  }
  return (
    <>
      {data.findIndex(
        (item) =>
          item.StudioBookingId === id ||
          item.PhotographerBookingId === id ||
          item.ModelBookingId === id ||
          item.MakeupBookingId === id ||
          item.DeviceBookingId === id ||
          item.ClothesBookingId === id
      ) > -1 ? (
        <></>
      ) : (
        <button
          className="FooterStatus__complete__rating"
          onClick={() => setVisible(true)}
        >
          Đánh giá
        </button>
      )}

      <button className="FooterStatus__complete__order">Đặt lại</button>
    </>
  );
};
