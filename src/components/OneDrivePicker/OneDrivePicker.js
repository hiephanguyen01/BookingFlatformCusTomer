import { CloudUploadOutlined } from "@ant-design/icons";
import React, { useState } from "react";
import { ReactOneDriveFilePicker } from "react-onedrive-filepicker";
import "./oneDrivePicker.scss";

export default function App() {
  const [data, setData] = useState([]);
  return (
    <>
      <ReactOneDriveFilePicker
        clientID="4a7582b1-d02d-4139-804c-6b68da19069d"
        action="share"
        multiSelect={true}
        onSuccess={(result) => {
          console.log(result.value);
          setData([...data, ...result.value]);
        }}
        // onCancel={(result) => {
        //   // alert(JSON.stringify(result));
        // }}
      >
        <button className="btn_one_drive_picker">
          <CloudUploadOutlined className="icon_one_drive" />
        </button>
      </ReactOneDriveFilePicker>
      {data.map((item) => (
        <img
          key={item.id}
          src={`${item["@microsoft.graph.downloadUrl"]}`}
          style={{ width: "100px", height: "100px", objectFit: "contain" }}
        />
      ))}
    </>
  );
}
