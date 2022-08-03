import "./dao.scss";
import { CheckOutlined } from "@ant-design/icons";
import { ReactComponent as Pen } from "../../assets/pen.svg";
import { posts } from "../../examples_data/DaoPost/daopost";
import DaoPost from "../../components/DaoPost";

const tagItems = [
  { icon: <CheckOutlined style={{ color: "#03AC84" }} />, name: "Tất cả" },
  { icon: <></>, name: "Studio" },
  { icon: <></>, name: "Nhiếp ảnh" },
  { icon: <></>, name: "Người mẫu" },
  { icon: <></>, name: "Trang phục" },
  { icon: <></>, name: "Trang bị" },
];

const Dao = () => {
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
              key={idx}
            >
              {item.icon}
              <p>{item.name}</p>
            </li>
          ))}
        </article>
        {posts.map((item) => (
          <DaoPost key={item.Id} item={item} />
        ))}
      </div>
    </section>
  );
};

export default Dao;
