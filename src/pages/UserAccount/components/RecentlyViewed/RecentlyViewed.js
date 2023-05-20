import { Col, Grid, Row } from "antd";
import { useEffect, useState } from "react";
import { userService } from "../../../../services/UserService";
import { Card } from "../../../../components/Card";
import { getAllStudioLikedAction1 } from "../../../../stores/actions/studioPostAction";
import { useDispatch } from "react-redux";
import { CATEGORIES } from "../../../../utils/category";
import BackNav from "../../../../components/BackNav/BackNav";

const { useBreakpoint } = Grid;

const RecentlyViewed = () => {
  const screens = useBreakpoint();
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
      {screens?.xs ? (
        <>
          <BackNav title="Đã xem gần đây" to="/home/user" />
          <div style={{ height: "10px", backgroundColor: "#f6f6f6" }}></div>
        </>
      ) : (
        <h4>Đã xem gần đây</h4>
      )}{" "}
      <Row gutter={[16, 16]} style={{ backgroundColor: "#f6f6f6" }}>
        {post.map((item, idx) => {
          return (
            <Col lg={6} md={6} sm={12} xs={24} key={idx}>
              <Card
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
