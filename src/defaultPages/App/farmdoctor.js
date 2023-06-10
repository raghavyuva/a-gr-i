import React from "react";
import { useState } from "react";
const Farmdoctor = () => {
  const [file, setfile] = useState();

  const [ondata, setondata] = useState([]);

  return (
    <div>
      <input type="file" onChange={(e) => setfile(e.target.files[0])} />
      {/* {file.name} */}
      {ondata?.length > 0 && (
        <>
          <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded capitalize">
            cause disease
          </button>
          <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded capitalize">
            cure disease
          </button>
          <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded capitalize">
            about disease
          </button>
        </>
      )}
    </div>
  );
};

export default Farmdoctor;
