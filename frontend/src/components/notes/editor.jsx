import React, { useCallback, useMemo, useRef, useState } from "react";

import html2pdf from 'html2pdf.js';
import QuillEditor from "react-quill";

import "./notes.scss";
import "react-quill/dist/quill.snow.css";

const Editor = ({data,setdata,update_note,delete_note}) => {
  const quillRef = useRef(null);


  

  const imageHandler = useCallback(() => {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();

    input.onchange = () => {
      const file = input.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = () => {
          const imageUrl = reader.result;
          const quillEditor = quillRef.current.getEditor();
          const range = quillEditor.getSelection(true);
          quillEditor.insertEmbed(range.index, "image", imageUrl, "user");
        };
        reader.readAsDataURL(file);
      }
    };
  }, []);

  const modules = useMemo(() => ({
    toolbar: {
      container: [
        [{ font: [] }],
        [{ header: [1, 2, 3, false] }],
        ["bold", "italic", "underline", "strike"],
        [{ color: [] }, { background: [] }],
        [{ script: "sub" }, { script: "super" }],
        ["blockquote", "code-block"],
        [{ list: "ordered" }, { list: "bullet" }],
        [{ indent: "-1" }, { indent: "+1" }, { align: [] }],
        ["link", "image", "video"],
        ["clean"],
      ],
      handlers: {
        image: imageHandler,
      },
    },
    clipboard: {
      matchVisual: true,
    },
  }), [imageHandler]);

  const formats = [
    "font",
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "color",
    "background",
    "script",
    "blockquote",
    "code-block",
    "list",
    "bullet",
    "indent",
    "align",
    "link",
    "image",
    "video",
    "clean",
  ];

  const [isEditing, setIsEditing] = useState(true);

  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };

  const options = {
    filename: data.title + '.pdf',
    margin: 1,
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { scale: 2 },
    jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' },
  };
  const convertToPdf = () => {
    html2pdf().set(options).from(value).save();
  };
  const HandleChange = (id, value) => {
    setdata((prevdata) => {
      return {
        ...prevdata,
        [id]: value,
      };
    });
  };
  return (
    <>
      <div className={"wrapper"}>
      <div className="action-buttons">
      <input
  id="title"
  className="label"
  value={data.title}
  disabled={isEditing}
  onChange={(content) => HandleChange("title", content.target.value)}
/>
  <button className="action-button" onClick={toggleEdit}>{isEditing ? "Edit" : "Save"}</button>
  <button className="action-button" onClick={update_note}>Save changes</button>
  <button className="action-button" onClick={convertToPdf}>Save PDF</button>
  <button className="delete-button" onClick={delete_note}>Delete</button>
</div>
<QuillEditor
  ref={quillRef}
  className={"editor"}
  theme="snow"
  value={data.content}
  formats={formats}
  modules={modules}
  onChange={(content) => HandleChange("content", content)}
/>
      </div>
    </>
  );
};

export default Editor;
