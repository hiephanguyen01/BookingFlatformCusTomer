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
  const [afterReport, setAfterReport] = useState(false);

  const onChange = (e) => {
    // console.log("radio checked", e.target.value);
    setValue(e.target.value);
  };
  const handleCancel = () => {
    props.setIsReportPostModalVisible(false);
    setAfterReport(false);
  };
  const handleOk = () => {
    props.setIsReportPostModalVisible(false);
    setAfterReport(true);
  };
  return (
    <>
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
      <Modal
        visible={afterReport}
        onCancel={handleCancel}
        footer={[
          <button onClick={() => setAfterReport(false)} className="ok-btn">
            OK
          </button>,
        ]}
      >
        <h3>Cảm ơn bạn vì đã báo cáo</h3>
        <p
          style={{
            textAlign: "justify",
            fontSize: "18px",
            fontWeight: "400",
            lineHeight: "25px",
          }}
        >
          Đăng thông tin sai sự thật là vi phạm Nguyên tắc cộng đồng của chúng
          tôi. Cảm ơn bạn đã giúp Booking Studio duy trì sự an toàn và uy tín.
        </p>
      </Modal>
    </>
  );
};

export default ReportPost;
