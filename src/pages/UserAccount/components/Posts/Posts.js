import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import DaoPost from "../../../../components/DaoPost";
import { userService } from "../../../../services/UserService";
import { getLikePostList } from "../../../../stores/actions/PostDaoAction";
import {
  getListPosts,
  getSavedPostList,
} from "../../../../stores/actions/userAction";
import "../PostsSaved/PostSaved";
const Posts = () => {
  const dispatch = useDispatch();
  const UserMe = useSelector((state) => state.authenticateReducer.currentUser);
  const { savedPostList } = useSelector((state) => state.userReducer);
  const { likePostList } = useSelector((state) => state.postDaoReducer);
  const [savedPosts, setSavedPosts] = useState([...savedPostList]);
  console.log(savedPostList);

  useEffect(() => {
    dispatch(getListPosts(19, 1));
    dispatch(getLikePostList(UserMe.id));
  }, []);
  useEffect(() => {
    setSavedPosts([...savedPostList]);
  }, [savedPostList]);
  // const listSavePost = () => {
  //   return;
  // };
  return (
    <>
      <h4 className="PostSaved__header">Bài viết của tôi</h4>
      <div>
        {savedPosts.map((itm, index) => (
          <div key={index} className="PostSaved__body">
            <DaoPost likePostList={likePostList} item={itm} type="save-post" />
          </div>
        ))}
      </div>
    </>
  );
};

export default Posts;
