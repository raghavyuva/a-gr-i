import React, { useState } from "react";

const FarmDoc = () => {
  const [file, setFile] = useState();

  const [ondata, setondata] = useState([]);
  const [details,setDetails] = useState()
    const [loading,setLoading] = useState(false);

  const uploadFile = async (e) => {
    e.preventDefault();
    console.log(file);
    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await fetch("http://localhost:8000/predict", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      console.log(data);
      if (data.success) {
        setondata(data.prediction);
      } else {
        alert(data.message);
      }
    } catch (error) {
      // Handle error
    }
  };

  const getDetails = async (reqController) => {
    try {
        setLoading(true)
        const response = await fetch(`http://localhost:8000/predict/${reqController}/${ondata}`)
        const data = await response.json()
        console.log(data)
        setLoading(false)
        if(data){
            if (reqController === 'details') setDetails(data.Details)
            else if(reqController === 'cure') setDetails(data.cure)
            else if(reqController === 'cause') setDetails(data.cause)
        }
        else {
            alert('something went wrong')
        }
    } catch (error) {
        console.log(error)
        alert(error)
    }
  }
  return (
    <div className="w-screen h-screen bg-slate-100 flex justify-center items-center">
      <div className="bg-white p-5 rounded-sm sapce-y-5">
        <div>
          <p className="font-mono my-2">
            Upload the image to find out the disease
          </p>
          <form onSubmit={uploadFile} className="flex flex-col space-y-10">
            <input type="file" onChange={(e) => setFile(e.target.files[0])} />
            <button
              type="submit"
              className="px-3 py-1 bg-purple-800 text-white rounded-sm hover:bg-purple-900 font-mono hover:underline"
            >
              Predict
            </button>
          </form>
        </div>
        {/* {file.name} */}
        {ondata?.length > 0 && (
          <div className="flex flex-col justify-center items-center  space-y-5 my-5">
            <p>Predicted disease: {ondata}</p>
            <div className="space-x-5">
              <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded capitalize"
              onClick={()=> getDetails("cause")}
              >
                cause disease
              </button>
              <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded capitalize"
              onClick={()=> getDetails("cure")}
              >
                cure disease
              </button>
              <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded capitalize"
              onClick={()=> getDetails("details")}
              >
                about disease
              </button>
            </div>
            {
                loading && (
                    <div> loading ... </div>
                )
            }
            {
                details && (
                    <p>
                        {details}
                    </p>
                )
            }
          </div>
        )}
      </div>
    </div>
  );
};

export default FarmDoc;
