import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import {
  ClassicEditor,
  Bold,
  Essentials,
  Heading,
  Indent,
  IndentBlock,
  Italic,
  Link,
  List,
  MediaEmbed,
  Paragraph,
  Table,
  Undo,
} from "ckeditor5";

import "ckeditor5/ckeditor5.css";

const AboutForm = () => {
  const [about, setAbout] = useState("");

  const handleChange = (event, editor) => {
    const data = editor.getData();
    setAbout(data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(about);
    await axios
      .patch(
        "http://localhost:8000/api/v1/update-about-details",
        { about },
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        console.log(res);
        toast("Updation successful");
      })
      .catch((err) => {
        console.log(err);
        toast("Updation failed");
      });
  };

  return (
    <div className="w-full flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-screen-lg p-6 mx-auto bg-white rounded-lg shadow-md">
        <h2 className="mt-4 mb-4 text-center text-2xl">About us Details</h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <CKEditor
              editor={ClassicEditor}
              config={{
                toolbar: [
                  "undo",
                  "redo",
                  "|",
                  "heading",
                  "|",
                  "bold",
                  "italic",
                  "|",
                  "link",
                  "insertTable",
                  "mediaEmbed",
                  "|",
                  "bulletedList",
                  "numberedList",
                  "indent",
                  "outdent",
                ],
                plugins: [
                  Bold,
                  Essentials,
                  Heading,
                  Indent,
                  IndentBlock,
                  Italic,
                  Link,
                  List,
                  MediaEmbed,
                  Paragraph,
                  Table,
                  Undo,
                ],
              }}
              id="about"
              name="about"
              data={about}
              onChange={handleChange}
              style={{ maxHeight: "500px" }}
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            Update details
          </button>
        </form>
      </div>
    </div>
  );
};

export default AboutForm;
