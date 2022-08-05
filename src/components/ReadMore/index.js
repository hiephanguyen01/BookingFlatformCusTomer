import React, { useState } from "react";
import styles from "./ReadMore.module.scss";
import classNames from "classnames/bind";
import { DownOutlined, UpOutlined } from "@ant-design/icons";

const cx = classNames.bind(styles);

const ReadMore = ({ children }) => {
  const text = children;
  const [isReadMore, setIsReadMore] = useState(true);
  const toggleReadMore = () => {
    setIsReadMore(!isReadMore);
  };

  return (
    <div className={cx("text")}>
      <p> {isReadMore ? text.slice(0, 530) : text}</p>
      {isReadMore && <div className={cx("bg")}></div>}
      <div onClick={toggleReadMore} className={cx("read-or-hide")}>
        {isReadMore ? (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "8px",
              color: "#03AC84",
              width: "100%",
            }}
          >
            <div
              style={{
                textAlign: "center",
                backgroundColor: "transparent",
              }}
            >
              <span>Xem thêm</span>
              <DownOutlined style={{ fontSize: "10px" }} />
            </div>
          </div>
        ) : (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "8px",
              color: "#03AC84",
              width: "100%",
            }}
          >
            <div
              style={{
                textAlign: "center",
                backgroundColor: "transparent",
              }}
            >
              <span>Show less</span>
              <UpOutlined style={{ fontSize: "10px" }} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const Content = () => {
  return (
    <div className={cx("container")}>
      <ReadMore>
        GeeksforGeeks: A Computer Science portal for geeks. It contains well
        written, well thought and well explained computer science, programming
        articles and quizzes. It provides a variety of services for you to
        learn, so thrive and also have fun! Free Tutorials, Millions of
        Articles, Live, Online and Classroom Courses ,Frequent Coding
        Competitions, Webinars by Industry Experts, Internship opportunities,
        and Job Opportunities. Knowledge is power! GeeksforGeeks: A Computer
        Science portal for geeks. It contains well written, well thought and
        well explained computer science, programming articles and quizzes. It
        provides a variety of services for you to learn, so thrive and also have
        fun! Free Tutorials, Millions of Articles, Live, Online and Classroom
        Courses ,Frequent Coding Competitions, Webinars by Industry Experts,
        Internship opportunities, and Job Opportunities. Knowledge is power!
      </ReadMore>
    </div>
  );
};

export default Content;
