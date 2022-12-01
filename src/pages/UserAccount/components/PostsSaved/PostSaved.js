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

  useEffect(() => {
    dispatch(getSavedPostList(19, 1, UserMe.id));
    dispatch(getLikePostList(UserMe.id));
  }, [dispatch, UserMe.id]);
  useEffect(() => {
    setSavedPosts([...savedPostList]);
  }, [savedPostList]);
  // const listSavePost = () => {
  //   return;
  // };
  return (
    <>
      <h4 className="PostSaved__header">Bài viết đã lưu</h4>
      <div className="post-save-container">
        {savedPosts.map((itm, index) => (
          <div key={index} className="PostSaved__body">
            <DaoPost item={itm} likePostList={likePostList} type="save-post" />
          </div>
        ))}
      </div>
    </>
  );
};

export default PostSaved;
