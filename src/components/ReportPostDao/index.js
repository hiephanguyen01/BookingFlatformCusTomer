import "./reportPostDao.scss";
import { useState } from "react";
import { Modal, Input, Radio, Space } from "antd";

const options = [
  "Nội dung trùng lặp, spam",
  "Thông tin sai sự thật",
  "Lộ thông tin cá nhân, vd: Số điện thoại,...",
  "Ngôn từ gây thù ghét",
  "Khác",
];

const ReportPost = (props) => {
  const [value, setValue] = useState(1);

  const onChange = (e) => {
    // console.log("radio checked", e.target.value);
    setValue(e.target.value);
  };
  const handleCancel = () => {
    props.setIsReportPostModalVisible(false);
  };
  const handleOk = () => {
    props.setIsReportPostModalVisible(false);
  };
  return (
    <Modal
      visible={props.isReportPostModalVisible}
      onCancel={handleCancel}
      footer={[
        <button onClick={handleCancel} className="cancel-btn">
          Hủy
        </button>,
        <button onClick={handleOk} className="ok-btn">
          Báo cáo
        </button>,
      ]}
      className="report-post-dao"
    >
      <h3>Lý do báo cáo bài viết</h3>
      <Radio.Group onChange={onChange} value={value}>
        <Space direction="vertical">
          {options.map((item, idx) => (
            <Radio key={idx} value={idx}>
              {item}
              {value === 4 && idx === 4 && (
                <Input
                  style={{
                    width: 100,
                    marginLeft: 10,
                  }}
                />
              )}
            </Radio>
          ))}
        </Space>
      </Radio.Group>
    </Modal>
  );
};

export default ReportPost;
