import { FolderOpenOutlined } from "@ant-design/icons";
import { useState } from "react";
import useDrivePicker from "react-google-drive-picker";
import "./googleDrivePicker.scss";

const GoogleDrivePicker = ({ files, setFiles }) => {
  const [openPicker, authResponse] = useDrivePicker();
  const [data, setData] = useState([]);
  // const customViewsArray = [new google.picker.DocsView()]; // custom view
  const handleOpenPicker = () => {
    openPicker({
      clientId:
        "1082256084414-9h6v2ndvh6782nhbrhg7nf4i2jotglj8.apps.googleusercontent.com",
      developerKey: "AIzaSyCkcQ9mQMakZutniH3f4dAUGYpXIrzxpys",
      viewId: "DOCS",
      token:
        "ya29.a0Aa4xrXOW5SXFPnOHbAguW6b3lJzLj3fQoYp4-HZDrnh1MCaNOFM4q836GM10-T3U4Mi24m1kxt0czNof7XnO67bQG4OztcOGpQ5Zzsgt-IYC-bMbOTDG8gJNRUsNafVez2oKtFzuWVjRyE-lftlzsQDmwUNCaCgYKATASARESFQEjDvL9rZ-Bnou8CMUMgY8pGhhqvg0163", // pass oauth token in case you already have one
      showUploadView: false,
      showUploadFolders: false,
      supportDrives: true,
      multiselect: true,
      // customViews: customViewsArray, // custom view
      callbackFunction: (d) => {
        if (d.action === "cancel") {
        }
        if (d.docs !== undefined) {
          console.log(d);
          const newFiles = d.docs.reduce((newArr, item) => {
            if (item.mimeType.split("/")[0] === "image") {
              return [
                ...newArr,
                {
                  ...item,
                  preview: `https://drive.google.com/uc?export=view&id=${item.id}`, // `https://drive.google.com/file/d/${item.id}/view`
                },
              ];
            }
            return [...newArr];
          }, []);
          console.log(newFiles);
          setFiles([...files, ...newFiles]);
        }
      },
    });
  };

  return (
    <div>
      <button className="btn_google_picker" onClick={() => handleOpenPicker()}>
        <FolderOpenOutlined className="icon_google_drive" />
      </button>
      {/* {data.map((item) => (
        <img
          key={item.id}
          src={`https://drive.google.com/uc?export=view&id=${item.id}`}
          style={{ width: "100px", height: "100px", objectFit: "contain" }}
        />
      ))} */}
    </div>
  );
};

export default GoogleDrivePicker;
