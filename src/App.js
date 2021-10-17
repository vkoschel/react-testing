import "./App.css";
import { useState } from "react";

function App() {
  const [btnColor, setBtnColor] = useState("red");
  const newBtnColor = btnColor === "red" ? "green" : "red";
  return (
    <div>
      <button
        style={{ backgroundColor: btnColor }}
        onClick={() => setBtnColor(newBtnColor)}
      >
        Change to {newBtnColor}
      </button>
    </div>
  );
}

export default App;
