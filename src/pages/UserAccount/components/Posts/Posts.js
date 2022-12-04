import { LoadingOutlined } from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import DaoPost from "../../../../components/DaoPost";
// import { userService } from "../../../../services/UserService";
import { getLikePostList } from "../../../../stores/actions/PostDaoAction";
import { getListPosts } from "../../../../stores/actions/userAction";
import "../PostsSaved/PostSaved";
const Posts = () => {
  const dispatch = useDispatch();
  const UserMe = useSelector((state) => state.authenticateReducer.currentUser);
  const { savedPostList } = useSelector((state) => state.userReducer);
  const { likePostList } = useSelector((state) => state.postDaoReducer);
  const [savedPosts, setSavedPosts] = useState([...savedPostList]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    dispatch(getListPosts(setLoading));
    dispatch(getLikePostList(UserMe.id));
  }, [dispatch, UserMe.id]);
  useEffect(() => {
    setSavedPosts([...savedPostList]);
  }, [savedPostList]);

  return (
    <>
      {loading ? (
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              background: "white",
              width: "fit-content",
              borderRadius: "50%",
              padding: "10px",
              margin: "10px",
            }}
          >
            <LoadingOutlined style={{ fontSize: "40px" }} />
          </div>
        </div>
      ) : (
        <>
          <h4 className="PostSaved__header">Bài viết của tôi</h4>
          <div>
            {savedPosts.map((itm, index) => (
              <div key={index} className="PostSaved__body">
                <DaoPost likePostList={likePostList} item={itm} type="post" />
              </div>
            ))}
          </div>
        </>
      )}
    </>
  );
};

export default Posts;
