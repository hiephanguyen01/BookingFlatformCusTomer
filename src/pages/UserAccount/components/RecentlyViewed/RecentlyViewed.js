import { Col, Row } from "antd";
import { useEffect, useState } from "react";
import { userService } from "../../../../services/UserService";
import { Card } from "../../../../components/Card";
const RecentlyViewed = () => {
  const [post, setPost] = useState([]);
  useEffect(() => {
    (async () => {
      const { data } = await userService.getRecentViews();
      setPost(data);
    })();
  }, []);

  return (
    <div>
      <h4>Đã xem gần đây</h4>
      <Row gutter={[16, 16]}>
        {post.map((item, idx) => {
          return (
            <Col span={6}>
              <Card key={idx} value={item} category={post.category} />
            </Col>
          );
        })}
      </Row>
    </div>
  );
};

export default RecentlyViewed;
