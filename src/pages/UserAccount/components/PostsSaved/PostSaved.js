import { LoadingOutlined } from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DaoPost from "../../../../components/DaoPost";
import { getLikePostList } from "../../../../stores/actions/PostDaoAction";
import { getSavedPostList } from "../../../../stores/actions/userAction";
import "./postSaved.scss";
const PostSaved = () => {
  const dispatch = useDispatch();
  const UserMe = useSelector((state) => state.authenticateReducer.currentUser);
  const { savedPostList } = useSelector((state) => state.userReducer);
  const { likePostList } = useSelector((state) => state.postDaoReducer);
  const [savedPosts, setSavedPosts] = useState([...savedPostList]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    dispatch(getSavedPostList(19, 1, UserMe.id, setLoading));
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
          <h4 className="PostSaved__header">Bài viết đã lưu</h4>
          <div className="post-save-container">
            {savedPosts.map((itm, index) => (
              <div key={index} className="PostSaved__body">
                <DaoPost
                  item={itm}
                  likePostList={likePostList}
                  type="save-post"
                />
              </div>
            ))}
          </div>
        </>
      )}
    </>
  );
};

export default PostSaved;
