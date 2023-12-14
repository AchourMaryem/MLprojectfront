import { useState } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const [file, setFile] = useState(null);
  function handleSubmit() {
    const form = new FormData();
    form.append("file", file);
    axios.post("http://127.0.0.1:5000/predict", form).then((res) => {
      console.log(res.data);
    });
  }
  return (
    <div>
      <h1>Title</h1>
      <p id="description">description</p>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          gap: 20,
          padding: 5,
          borderRadius: 5,
        }}
      >
        <label className="fileUpload">
          Upload Image
          <input
            type="file"
            value={file}
            onChange={(e) => {
              setFile(e.target.value);
            }}
          />
        </label>
        <p
          style={{
            width: 200,
            backgroundColor: "#1d1d1d",
            padding: 10,
            borderRadius: 5,
            color: file ? "white" : "gray",
          }}
        >
          {file ? file.split("\\").pop() : "no file selected"}
        </p>
      </div>
      <button
        onClick={() => {
          handleSubmit();
        }}
        className="button"
      >
        Submit
      </button>
    </div>
  );
}

export default App;
