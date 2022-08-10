import { CheckOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ReactComponent as Pen } from "../../assets/pen.svg";
import DaoPost from "../../components/DaoPost";
import { getAllPostDaoAction } from "../../stores/actions/PostDaoAction";
import "./dao.scss";

const tagItems = [
  {
    id: 0,
    icon: <CheckOutlined style={{ color: "#03AC84" }} />,
    name: "Tất cả",
  },
  { id: 1, icon: <></>, name: "Studio" },
  { id: 2, icon: <></>, name: "Nhiếp ảnh" },
  { id: 3, icon: <></>, name: "Người mẫu" },
  { id: 4, icon: <></>, name: "Trang phục" },
  { id: 5, icon: <></>, name: "Trang bị" },
];

const Dao = (props) => {
  const [loadMore, setLoadMore] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState(0);
  const [page, setPage] = useState(1);
  const dispatch = useDispatch();
  const { listPost, nextPage } = useSelector((state) => state.postDaoReducer);

  useEffect(() => {
    getData(loadMore);
    setLoadMore(false);
  }, []);

  // useEffect(() => {
  //   const list = document.getElementById("infinity-list-post-dao");
  //   if (props.scrollable) {
  //     // list has fixed height
  //     list.addEventListener("scroll", (e) => {
  //       const el = e.target;
  //       if (el.scrollTop + el.clientHeight === el.scrollHeight) {
  //         setLoadMore(true);
  //       }
  //     });
  //   } else {
  //     // list has auto height
  //     window.addEventListener("scroll", () => {
  //       let win = window.scrollY + window.innerHeight;
  //       let listHeight = list.clientHeight + list.offsetTop;
  //       // console.log(win + " " + listHeight + " " + list.clientHeight);
  //       if (
  //         window.scrollY + window.innerHeight ===
  //           list.clientHeight + list.offsetTop ||
  //         (win - listHeight < 50 && win - listHeight > 0)
  //       ) {
  //         setLoadMore(true);
  //       }
  //     });
  //   }
  // }, []);

  // useEffect(() => {
  //   const list = document.getElementById("infinity-list-post-dao");
  //   window.addEventListener("scroll", () => {
  //     if (
  //       window.scrollY + window.innerHeight ===
  //       list.clientHeight + list.offsetTop
  //     ) {
  //       setLoadMore(true);
  //     }
  //   });
  // }, [listPost]);

  const getData = (loadMore) => {
    if (loadMore && nextPage) {
      dispatch(getAllPostDaoAction(listPost, 3, page));
      setPage(() => page + 1);
    }
  };

  return (
    <section className="dao d-flex justify-content-center">
      <div className="dao__container d-flex flex-column align-items-center">
        <header className="dao__container__header d-flex justify-content-between align-items">
          <h2>Dạo</h2>
          <button className="dao__container__header__button d-flex align-items-center">
            <Pen />
            <p>Tạo bài viết</p>
          </button>
        </header>
        <article className="dao__container__tag d-flex align-items-center justify-content-evenly">
          {tagItems.map((item, idx) => (
            <li
              className="dao__container__tag__item d-flex align-items-center"
              key={item.id}
              onClick={() => setSelectedCategory(item.id)}>
              {item.icon}
              <p>{item.name}</p>
            </li>
          ))}
        </article>
        <ul id="infinity-list-post-dao">
          {listPost.map((item) => {
            switch (selectedCategory) {
              case 1:
                return (
                  item.Tags.includes("studio") && (
                    <DaoPost key={item.Id} item={item} />
                  )
                );
              case 2:
                return (
                  item.Tags.includes("nhiepanh") && (
                    <DaoPost key={item.Id} item={item} />
                  )
                );
              case 3:
                return (
                  item.Tags.includes("nguoimau") && (
                    <DaoPost key={item.Id} item={item} />
                  )
                );
              case 4:
                return (
                  item?.Tags.includes("trangphuc") && (
                    <DaoPost key={item.Id} item={item} />
                  )
                );
              case 5:
                return (
                  item?.Tags.includes("trangbi") && (
                    <DaoPost key={item.Id} item={item} />
                  )
                );

              default:
                return <DaoPost key={item.Id} item={item} />;
            }
          })}
        </ul>
      </div>
    </section>
  );
};

export default Dao;
