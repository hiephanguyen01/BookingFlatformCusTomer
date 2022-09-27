import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import DaoPost from "../../../../components/DaoPost";
import { userService } from "../../../../services/UserService";
import { getSavedPostList } from "../../../../stores/actions/userAction";
import "./postSaved.scss";
const PostSaved = () => {
  const dispatch = useDispatch();
  const UserMe = useSelector((state) => state.authenticateReducer.currentUser);
  const { savedPostList } = useSelector((state) => state.userReducer);
  const [savedPosts, setSavedPosts] = useState([...savedPostList]);
  console.log(savedPostList);

  useEffect(() => {
    dispatch(getSavedPostList(19, 1, UserMe.id));
  }, []);
  useEffect(() => {
    setSavedPosts([...savedPostList]);
  }, [savedPostList]);
  // const listSavePost = () => {
  //   return;
  // };
  return (
    <>
      <h4 className="PostSaved__header">Bài viết đã lưu</h4>
      <div>
        {savedPosts.map((itm, index) => (
          <div key={index} className="PostSaved__body">
            <DaoPost item={itm} type="save-post" />
          </div>
        ))}
      </div>
    </>
  );
};

export default PostSaved;
