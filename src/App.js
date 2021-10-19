import "./App.css";
import { useState } from "react";

function App() {
  const [btnColor, setBtnColor] = useState("red");
  const [disabled, setDisabled] = useState(false);
  const newBtnColor = btnColor === "red" ? "green" : "red";
  return (
    <div>
      <button
        style={{ backgroundColor: btnColor }}
        onClick={() => setBtnColor(newBtnColor)}
        disabled={disabled}
      >
        Change to {newBtnColor}
      </button>
      <input
        type="checkbox"
        id="disable-btn-checkbox"
        defaultChecked={disabled}
        aria-checked={disabled}
        onChange={(e) => setDisabled(e.target.checked)}
      />
      <label htmlFor="disable-btn-checkbox">Disable button</label>
    </div>
  );
}

export default App;
