import  React, { useEffect, useState } from "react";

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
            credentials: 'include'
        })
        .then(res => res.json())
        .then(data => {
            console.log("Response: ", data);
            alert(data.msg);
            document.getElementById('uploadForm').reset();
            setIsSubmitted(true);
        })
        .catch(err => console.log('Frontend Error: ', err));
    }

    return (
        <>
        <div className="flex flex-col md:flex-row gap-5 bg-violet-400 mb-5 p-5 justify-between">
            <form id="uploadForm" encType="multipart/form-data" onSubmit={handleSubmit}
            className="bg-violet-300 p-5 w-full md:w-1/2 text-center">
                <p className="text-[25px] font-black text-center mb-5">Request Form</p>
                <div className="flex flex-col md:flex-row items-center md:justify-between w-full">
                    <div className="flex flex-col gap-2 w-full md:w-2/5 sm:w-1/2">
                        <label className="font-semibold">Type of request: </label>
                        <input className="outline-none p-1 px-3 rounded-md" type="text" placeholder="Type of request." name="type" onChange={handleChange} required/>
                    </div>
                    <div className="flex flex-col gap-2 w-full md:w-2/5 sm:w-1/2">
                        <label className="font-semibold">Details of request: </label>
                        <textarea className="outline-none p-1 px-3 rounded-md" type="boxarea" placeholder="Details." name="details" onChange={handleChange} required/>
                    </div>
                </div>
                <div className="flex flex-col sm:flex-row gap-2 left-0 m-5 text-center">
                    <label className="font-semibold">File upload: </label>
                    <input className="outline-none p-1 w-full sm:w-1/3 rounded-md bg-gray-400 text-white" type="file" placeholder="Details." name="doc_file" onChange={handleChange}/>
                </div>
                <button type = "submit" className="px-4 bg-blue-500 rounded-md p-2 text-white mx-auto">Submit</button>
            </form>
            <UserRequests />
        </div>
            <GetRequest />
        </>
    )
}

const GetRequest = React.memo(() => {
    const [status, setStatus] = useState('');
    const color = (status == 'InProgress') ? 'via-orange-600'
        : status == 'Pending' ? 'via-red-600' : status == 'Reoslved' ? 'via-green-500' : null;
    console.log("color: ", color, " With status: ", status)
    const handleRequest =(event) => {
        event.preventDefault();
        const inputText = document.getElementById('inputText').value;
        fetch('http://localhost:4000/request?id='+inputText, {
            method:"GET",
            headers: {'Content-Type':'application/json'},
            credentials: 'include',
        }).then(res => res.json())
        .then(data => {
            console.log(data);
            if(data.msg != 'Succesfull!') return console.log(data.msg);
            setStatus(data.request.status);
            document.getElementById('getForm').reset();
        })
        .catch(err => console.log('Errors: ', err))
    }
    return (
        <div className="bg-pink-300 h-1/3 flex flex-col justify-center items-center gap-10 p-5">
            <p className="text-[30px] font-semibold">Check the status of your request</p>
            <form id='getForm' onSubmit={handleRequest} className="flex gap-3 flex-col sm:flex-row">
                <label>Enter request ID :</label>
                <input className="outline-none p-1 px-3 rounded-md" type="text" id="inputText" name="inputText" />
                <button className="outline-none p-2 px-3 bg-purple-400 text-white rounded-md" type="submit">Submit</button>
            </form>
            <div id = 'content' 
                className={`w-2/5 text-center p-2 px-4 cursor-default text-white mb-4 
                bg-gradient-to-r from-pink-300 from-10% ${color} via-50% to-pink-300 to-90%`}
            >
                {status ? 'Your application status is ' + status : null}
                </div>
            
        </div>
    )
})

function UserRequests() {
    const [requests, setRequests] = useState([]);
    useEffect(()=>{
        fetch('http://localhost:4000/getUserRequest',{
            method: 'GET',
            credentials: 'include'
        }).then(res => res.json())
        .then(data => {
            console.log('Recieved!')
            setRequests(data.requests);
        }).catch(err => console.log('Error while fetching requestList: ', err));
    }, []);
    return(
        <div className="w-full md:w-1/2 bg-green-200 cursor-default">
            <table className="table-auto w-full bg-green-300 rounded-md p-3 whitespace-nowrap overflow-hidden">
                <thead className="bg-green-400">
                    <tr className="border-4 border-r-white">
                        <th>Request ID</th>
                        <th className="border-2 border-l-white w-1/2">Request Type</th>
                    </tr>
                </thead>
                <thead>
                    {requests.map((request, index) => (
                        <tr key={index} className="text-center border-2 border-l-white">
                            <td>{request._id}</td>
                            <td>{request.type}</td>
                        </tr>
                    ))}
                </thead>
            </table>
        </div>
    )
}