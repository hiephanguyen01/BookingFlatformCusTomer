import React, { useState } from "react";
import UploadImage from "../../../../../../../../components/UploadImage";
import { VideoCameraOutlined, CloseCircleOutlined } from "@ant-design/icons";
export const VideoRate = () => {
  const [files, setFiles] = useState([]);
  const [srccc, setSrc] = useState();
  const onChangeFile = async (e) => {
    if (files.length <= 1) {
      const newFiles = [...files];
      const fileList = e.target.files;
      for (let file of fileList) {
        if (file.type === "video/mp4" || file.type === "video/x-m4v") {
          const [file] = e.target.files;
          const fileUrl = URL.createObjectURL(file);
          const thumbUrl = await getThumbnailForVideo(fileUrl);
          setSrc(thumbUrl);
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
  async function getThumbnailForVideo(videoUrl) {
    const video = document.createElement("video");
    const canvas = document.createElement("canvas");
    video.style.display = "none";
    canvas.style.display = "none";

    // Trigger video load
    await new Promise((resolve, reject) => {
      video.addEventListener("loadedmetadata", () => {
        video.width = video.videoWidth;
        video.height = video.videoHeight;
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        // Seek the video to 25%
        video.currentTime = video.duration * 0.25;
      });
      video.addEventListener("seeked", () => resolve());
      video.src = videoUrl;
    });

    // Draw the thumbnailz
    canvas
      .getContext("2d")
      .drawImage(video, 0, 0, video.videoWidth, video.videoHeight);
    const imageUrl = canvas.toDataURL("image/png");
    return imageUrl;
  }
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
        accept="video/mp4,video/x-m4v,video/*"
      >
        <VideoCameraOutlined style={{ color: "#1FCBA2", fontSize: "25px" }} />
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
              className="w-80px h-80px"
              src={srccc}
              style={{
                objectFit: "cover",
                borderRadius: "10px",
              }}
            ></img>

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
