import { Col, Row } from "antd";
import { useEffect, useState } from "react";
import { userService } from "../../../../services/UserService";
import { Card } from "../../../../components/Card";
import { getAllStudioLikedAction1 } from "../../../../stores/actions/studioPostAction";
import { useDispatch } from "react-redux";
import { CATEGORIES } from "../../../../utils/category";
const RecentlyViewed = () => {
  const [post, setPost] = useState([]);
  const dispatch = useDispatch();
  useEffect(() => {
    (async () => {
      const { data } = await userService.getRecentViews();
      setPost(data);
    })();
  }, []);
  useEffect(() => {
    dispatch(getAllStudioLikedAction1(+1));
    dispatch(getAllStudioLikedAction1(+2));
    dispatch(getAllStudioLikedAction1(+3));
    dispatch(getAllStudioLikedAction1(+4));
    dispatch(getAllStudioLikedAction1(+5));
    dispatch(getAllStudioLikedAction1(+6));
  });
  return (
    <div>
      <h4>Đã xem gần đây</h4>
      <Row gutter={[16, 16]}>
        {post.map((item, idx) => {
          return (
            <Col span={6}>
              <Card
                key={idx}
                value={item}
                category={{
                  id: item.category,
                  name: CATEGORIES.filter((cat) => cat.id === item.category)[0]
                    .linkTo,
                }}
              />
            </Col>
          );
        })}
      </Row>
    </div>
  );
};

export default RecentlyViewed;
