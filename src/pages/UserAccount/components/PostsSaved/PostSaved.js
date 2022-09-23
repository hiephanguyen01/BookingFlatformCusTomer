import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import DaoPost from "../../../../components/DaoPost";
import { userService } from "../../../../services/UserService";
import "./postSaved.scss";
const PostSaved = () => {
  const UserMe = useSelector((state) => state.authenticateReducer.currentUser);
  const [postSaved, setPostSaved] = useState([]);

  useEffect(() => {
    (async () => {
      const res = await userService.getListSavePost(UserMe.id, 1, 19);
      console.log(res);
      setPostSaved(res.data.data);
    })();
  }, []);
  const listSavePost = () => {
    // eslint-disable-next-line array-callback-return
    return postSaved.map((itm, index) => (
      <div key={index} className="PostSaved__body">
        <DaoPost item={itm.savedPost} />
      </div>
    ));
  };
  return (
    <>
      <h4 className="PostSaved__header">Bài viết đã lưu</h4>
      <div>{listSavePost()}</div>
    </>
  );
};

export default PostSaved;
