import React, { useEffect, useRef, useState } from "react";
import { Collapse } from "antd";
import "./helpCenterContent.scss";
import { CaretRightOutlined, UpOutlined } from "@ant-design/icons";
import { askedQuestions } from "../../../../services/AskedQuestions";
import { Element } from "react-scroll";

const { Panel } = Collapse;
const HelpCenterContent = ({ ref }) => {
  const [questions, setQuestions] = useState([]);
  useEffect(() => {
    const getQuestions = async () => {
      const res = await askedQuestions.getAllAskedQuestions();
      setQuestions([...res.data.data]);
    };
    getQuestions();
  }, []);

  const CollapseItem = ({ title, text }) => (
    <Collapse
      bordered={false}
      defaultActiveKey={[""]}
      expandIconPosition="end"
      expandIcon={({ isActive }) => <UpOutlined rotate={isActive ? 180 : 0} />}
    >
      <Panel className="collapse-item" header={title} key="1">
        {text}
      </Panel>
    </Collapse>
  );
  return (
    <div className="help-center-content">
      <h4>Câu hỏi thường gặp</h4>
      <Element name="1-item" className="mb-25">
        <h5>I. Về hủy đơn đặt</h5>
        <ul className="answer-list">
          {questions
            .filter((item) => item.AskedQuestionCategory === 1)
            .map((item, index) => (
              <li className="answer-item" key={item.id}>
                <CollapseItem
                  title={`${index + 1}. ${item.Question}`}
                  text={`${item.Answer}`}
                />
              </li>
            ))}
        </ul>
      </Element>

      <Element name="2-item" className="mb-25">
        <h5>II. Về thanh toán</h5>
        <ul className="answer-list">
          {questions
            .filter((item) => item.AskedQuestionCategory === 2)
            .map((item, index) => (
              <li className="answer-item" key={item.id}>
                <CollapseItem
                  title={`${index + 1}. ${item.Question}`}
                  text={`${item.Answer}`}
                />
              </li>
            ))}
        </ul>
      </Element>
      <Element name="3-item" className="mb-25">
        <h5>III. Về chi tiết đơn đặt</h5>
        <ul className="answer-list">
          {questions
            .filter((item) => item.AskedQuestionCategory === 3)
            .map((item, index) => (
              <li className="answer-item" key={item.id}>
                <CollapseItem
                  title={`${index + 1}. ${item.Question}`}
                  text={`${item.Answer}`}
                />
              </li>
            ))}
        </ul>
      </Element>
      <Element name="4-item" className="mb-25">
        <h5>IV. Về giá trị đơn đặt</h5>
        <ul className="answer-list">
          {questions
            .filter((item) => item.AskedQuestionCategory === 4)
            .map((item, index) => (
              <li className="answer-item" key={item.id}>
                <CollapseItem
                  title={`${index + 1}. ${item.Question}`}
                  text={`${item.Answer}`}
                />
              </li>
            ))}
        </ul>
      </Element>
      <Element name="5-item" className="mb-25">
        <h5>V. Về bảo mật và nhận thức</h5>
        <ul className="answer-list">
          {questions
            .filter((item) => item.AskedQuestionCategory === 5)
            .map((item, index) => (
              <li className="answer-item" key={item.id}>
                <CollapseItem
                  title={`${index + 1}. ${item.Question}`}
                  text={`${item.Answer}`}
                />
              </li>
            ))}
        </ul>
      </Element>
    </div>
  );
};

export default HelpCenterContent;
