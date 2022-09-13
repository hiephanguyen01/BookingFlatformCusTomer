import { SearchOutlined } from "@ant-design/icons";
import { Input, Modal } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllPostDaoAction } from "../../stores/actions/PostDaoAction";
import "../ReportPostDao/reportPostDao.scss";
import { GET_SEARCH_LIST_POST } from "../../stores/types/PostDaoType";

const DaoPostSearchModal = (props) => {
  const [keyword, setKeyword] = useState("");
  // const [searchList, setSearchList] = useState([])

  const { setSearchDaoPostVisible, searchDaoPostVisible } = props;
  const { listPostForSearching, pagination } = useSelector(
    (state) => state.postDaoReducer
  );
  const dispatch = useDispatch();

  const handleCancel = () => {
    setSearchDaoPostVisible(false);
  };
  const handleOk = () => {
    setSearchDaoPostVisible(false);
  };
  let searchList =
    listPostForSearching.length > 0
      ? listPostForSearching?.filter(
          (item, idx) =>
            item.Username.includes(keyword) || item.Tags.includes(keyword)
        )
      : [];

  useEffect(() => {
    // console.log("Giờ mới call API! ");
    if (pagination.total > 0) {
      dispatch(getAllPostDaoAction(pagination.total));
    }
    // return () => {
    //     dispatch({ type: GET_SEARCH_LIST_POST, data: [] });
    //   };
  }, [pagination.total]);
  return (
    <Modal
      visible={searchDaoPostVisible}
      onCancel={handleCancel}
      footer={[
        <button onClick={handleCancel} className="cancel-btn">
          Hủy
        </button>,
        <button onClick={handleOk} className="ok-btn">
          Xong
        </button>,
      ]}
      style={{ padding: "35px 24px 35px 24px" }}
    >
      <Input
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        prefix={<SearchOutlined />}
        placeholder="TÌm kiếm studio, người mẫu, ..."
      />
      <ul className="search-list-post">
        {searchList?.map((item, idx) => (
          <li key={item.Id}>{item.Username}</li>
        ))}
      </ul>
    </Modal>
  );
};

export default DaoPostSearchModal;
