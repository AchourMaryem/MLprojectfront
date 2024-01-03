import { useState } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const [file, setFile] = useState(null);
  const [resultPredict, setResultPredict] = useState(null);
  const [resultManip, setResultManip] = useState(null);
  function handleSubmit() {
    const form = new FormData();
    
    form.append("image", file);
    axios.post("http://127.0.0.1:3000/predict", form).then((res) => {
      console.log(res.data);
      setResultPredict(res.data)
    });
    axios.post("http://127.0.0.1:3000/detect_manipulation", form).then((res) => {
      console.log(res.data);
      setResultManip(res.data)
    });
  }
  return (
    <div style={{flex:1, flexDirection:"column", alignItems:"center", justifyContent:"center"}}>
      <h1>Detect Images Authenticity</h1>
      <p id="description">Detect if images are manipulated or AI Generated </p>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent:"center",
          gap: 20,
          padding: 5,
          borderRadius: 5,
        }}
      >
        
        {file ? 
        <>
        {(resultPredict && resultManip) ?<div style={{position:"absolute", borderRadius:20,backgroundColor:"#000000c0", zIndex:999, width:300, height:300}}>
          {
            resultPredict.prediction==="fake"?<h1>{resultPredict.prediction}</h1>
            :
            <h1>{resultManip.predicted_class}</h1>
          }
        </div>:null}
        <img style={{width:300,height:300, objectFit:'contain', borderRadius:20}} src={URL.createObjectURL(file)} />
        </>
        :
        <div style={{width:300, height:300, backgroundColor:"grey", borderRadius:20, display:"flex", justifyContent:"center", alignItems:"center"}} >
          <label className="fileUpload">
          Upload Image
          <input
            type="file"
            //value={file}
            onChange={(e) => {
              setFile(e.target.files[0]);
              console.log(e.target.files[0])
            }}
          />
        </label>
          </div>}
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
