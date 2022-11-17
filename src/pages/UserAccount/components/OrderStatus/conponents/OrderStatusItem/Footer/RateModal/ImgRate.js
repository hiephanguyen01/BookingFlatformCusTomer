import React, { useEffect, useState } from "react";
import UploadImage from "../../../../../../../../components/UploadImage";
import { PictureOutlined, CloseCircleOutlined } from "@ant-design/icons";
export const ImgRate = ({ setData }) => {
  const [files, setFiles] = useState([]);
  const onChangeFile = (e) => {
    if (files.length <= 1) {
      const newFiles = [...files];
      const fileList = e.target.files;

      for (let file of fileList) {
        if (
          file.type === "image/png" ||
          file.type === "image/jpeg" ||
          file.type === "image/jpg"
        ) {
          file.preview = URL.createObjectURL(file);
          newFiles.push(file);
        }
      }
      setFiles([...newFiles]);
    }
  };
  const handleRemoveImage = (index) => {
    const newFiles = [...files];
    newFiles.splice(index, 1);
    setFiles([...newFiles]);
  };
  useEffect(() => {
    setData((prevState) => ({
      ...prevState,
      image: [...files],
    }));
  }, [files, setData]);

  return (
    <div className="position-relative" style={{ position: "relative" }}>
      <UploadImage
        onChangeFile={onChangeFile}
        style={{
          width: "80px",
          height: "80px",
          border: "0.6px dashed #1FCBA2",
          borderRadius: "10px",
        }}
        multiple={false}
        accept="image/png, image/jpeg , image/jpg "
      >
        <PictureOutlined style={{ color: "#1FCBA2", fontSize: "25px" }} />
      </UploadImage>
      {files &&
        files.map((item, index) => (
          <div
            key={index}
            style={{
              position: "absolute",
              width: "80px",
              top: 0,
            }}
          >
            <img
              alt=""
              src={item.preview}
              className="w-80px h-80px"
              style={{
                objectFit: "cover",
                borderRadius: "10px",
              }}
            />
            <CloseCircleOutlined
              className="btn_close"
              style={{
                color: "#fff",
                background: "#000",
                borderRadius: "10px",
              }}
              onClick={() => handleRemoveImage(index)}
            />
          </div>
        ))}
    </div>
  );
};
