import React, { useEffect, useState } from "react";
import { IoMdCloseCircle } from "react-icons/io";

const PreviewImage = ({ file, handleSingleClose, single = false }) => {
  const [preview, setPreview] = useState(null);

  const handlePreviewImage = () => {
    if (typeof file.name === "string") {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        setPreview(reader.result);
      };
    } else {
      setPreview(single ? file : file.url);
    }
  };

  useEffect(() => {
    handlePreviewImage();
  }, [file]);
  return (
    <>
      {preview ? (
        <div style={{ position: "relative" }}>
          {typeof file.name !== "string" && !single &&(
            <span
              className="preImagebtnClose"
              onClick={() => handleSingleClose(file.id)}
            >
              <IoMdCloseCircle />
            </span>
          )}

          <img
            src={preview}
            alt="preview"
            width="150px"
            height="150px"
            style={{ objectFit: "cover" }}
          />
        </div>
      ) : (
        <div class="spinner-grow text-success" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
      )}
    </>
  );
};

export default PreviewImage;
