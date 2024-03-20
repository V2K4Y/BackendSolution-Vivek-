import { useState } from "react";

export default function RequestForm() {
    // console.log('Form renders !')
    const [formData, setFormData] = useState(new FormData());
    const [isSubmitted, setIsSubmitted] = useState(false);
    let timer;
    const handleChange = (event) => {
        const { name, value, files } = event.target;
      
        if (files) {
          setFormData((prevData) => {
            prevData.append(name, files[0]); // Handle file uploads
            return prevData;
          });
        } else {
            clearTimeout(timer);
            timer = setTimeout(()=> {
                console.log(formData)
                setFormData((prevData) => {
                    prevData.set(name, value); // Handle text input changes
                    return prevData;
                  });
            }, 1000);
        }
    };
    const handleSubmit = (event) => {
        event.preventDefault();
        fetch('http://localhost:4000/send-request', 
        {
            method: 'POST',
            body: formData,
        })
        .then(res => res.json())
        .then(data => {
            console.log("Response: ", data);
            document.getElementById('uploadForm').reset();
            setIsSubmitted(true);
        })
        .catch(err => console.log('Frontend Error: ', err));
    }

    return (
        <>
            <form id="uploadForm" encType="multipart/form-data" onSubmit={handleSubmit}
            className="flex flex-col gap-5 justify-center items-center bg-violet-400 p-5 mb-5">
                <div className="flex gap-2">
                    <label>Type of request: </label>
                    <input type="text" placeholder="Type of request." name="type" onChange={handleChange}/>
                </div>
                <div className="flex gap-2">
                    <label>Details of request: </label>
                    <textarea type="boxarea" placeholder="Details." name="details" onChange={handleChange}/>
                </div>
                <div className="flex gap-2">
                    <label>File upload: </label>
                    <input type="file" placeholder="Details." name="doc_file" onChange={handleChange}/>
                </div>
                <button type = "submit" className="px-4 bg-blue-500 rounded-md p-2">Submit</button>
            </form>
        </>
    )
}