import { useRef } from "react";

import "./uploadImage.scss";

const DropFileInput = ({ onChangeFile, children, image, multiple }) => {
  const wrapperRef = useRef(null);
  const onDragEnter = () => wrapperRef.current.classList.add("dragover");
  const onDragLeave = () => wrapperRef.current.classList.remove("dragover");
  const onDrop = () => wrapperRef.current.classList.remove("dragover");

  return (
    <div
      ref={wrapperRef}
      className="d-flex flex-column w-100 h-100 justify-content-center align-items-center drop-file-input"
      onDragEnter={onDragEnter}
      onDragLeave={onDragLeave}
      onDrop={onDrop}
    >
      {/* <i className='fa-solid fa-cloud-arrow-up mb-3 text-primary' style={{fontSize: '100px'}}></i> */}
      {image ? (
        <img
          src={image}
          alt=""
          className="w-100 h-100"
          style={{ objectFit: "cover" }}
        />
      ) : (
        children
      )}

      <input
        type="file"
        multiple={multiple}
        value={""}
        className="w-100 h-100 input_file"
        style={{ opacity: "0", top: "0", left: "0" }}
        onChange={(e) => onChangeFile(e)}
      />
    </div>
  );
};

export default DropFileInput;
