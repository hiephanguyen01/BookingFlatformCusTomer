import { FolderOpenOutlined } from "@ant-design/icons";
import { useState } from "react";
import useDrivePicker from "react-google-drive-picker";
import "./googleDrivePicker.scss";

const GoogleDrivePicker = () => {
  const [openPicker, authResponse] = useDrivePicker();
  const [data, setData] = useState([]);
  // const customViewsArray = [new google.picker.DocsView()]; // custom view
  const handleOpenPicker = () => {
    openPicker({
      clientId:
        "1082256084414-9h6v2ndvh6782nhbrhg7nf4i2jotglj8.apps.googleusercontent.com",
      developerKey: "AIzaSyCkcQ9mQMakZutniH3f4dAUGYpXIrzxpys",
      viewId: "DOCS",
      // token: token, // pass oauth token in case you already have one
      showUploadView: false,
      showUploadFolders: false,
      supportDrives: true,
      multiselect: true,
      // customViews: customViewsArray, // custom view
      callbackFunction: (d) => {
        if (d.action === "cancel") {
          console.log("User clicked cancel/close button");
        }
        console.log(d.docs);
        setData([...data, ...d.docs]);
      },
    });
  };

  return (
    <div>
      <button className="btn_google_picker" onClick={() => handleOpenPicker()}>
        <FolderOpenOutlined className="icon_google_drive" />
      </button>
      {data.map((item) => (
        <img
          key={item.id}
          src={`https://drive.google.com/uc?export=view&id=${item.id}`}
          style={{ width: "100px", height: "100px", objectFit: "contain" }}
        />
      ))}
    </div>
  );
};

export default GoogleDrivePicker;
