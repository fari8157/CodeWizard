import { useState } from "react";
import { ScaleLoader } from "react-spinners";
import './Spinner.css'
function Spinner() {
 

  return (
    <div className="sweet-loading">
      <div className="loader-container">
        <ScaleLoader
           size={150}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      </div>
    </div>
  );
}

export default Spinner;
