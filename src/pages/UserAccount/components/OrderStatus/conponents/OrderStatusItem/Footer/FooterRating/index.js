import axios from "axios";
import React, { useEffect, useState } from "react";

export const FooterRating = ({ id, setVisible, visible, category }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios({
          url: `${
            process.env.REACT_APP_DB_BASE_URL
          }${"/api/studio-post/ratingByMe"}`,
          method: "GET",
          headers: {
            Authorization: "Bearer " + localStorage.getItem("access_token"),
          }, //JWT
        });
        setData(data.data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
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
          (item.StudioBookingId === id && item?.category === category) ||
          (item.PhotographerBookingId === id && item?.category === category) ||
          (item.ModelBookingId === id && item?.category === category) ||
          (item.MakeupBookingId === id && item?.category === category) ||
          (item.DeviceBookingId === id && item?.category === category) ||
          (item.ClothesBookingId === id && item?.category === category)
      ) > -1 ? (
        <></>
      ) : (
        <button
          className="FooterStatus__complete__rating"
          onClick={() => setVisible(true)}>
          Đánh giá
        </button>
      )}

      <button className="FooterStatus__complete__order">Đặt lại</button>
    </>
  );
};
