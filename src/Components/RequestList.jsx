import axios from "axios";
import { useEffect, useState } from "react"

export default function RequestList() {
    // console.log('List renders !')
    const [lists, setList] = useState([]);
    const [change, setChange] = useState('');
    const backendUrl = 'http://localhost:4000';

    const handleForward = (item,id) => {
        if(item == 'Pending') {
            axios.put(backendUrl+"/update-in-progress", {id}, {withCredentials: true})
            .then(res => {
                setChange(Math.random());
                console.log(res.data.msg);
            })
            .catch(err => console.log('Error while updating!', err));
        }
        else if(item == 'InProgress') { 
            axios.put(backendUrl+"/update-resolved", {id}, {withCredentials: true})
            .then(res => {
                setChange(Math.random());
                console.log(res.data.msg);
            })
            .catch(err => console.log('Error while updating!', err));
         }
        else return console.log('Wrong Input')
    }

    useEffect(()=> {
        fetch(backendUrl+'/requests', {
            method: 'GET',
            credentials: 'include'
        })
        .then(res => res.json())
        .then(data => setList(data))
        .catch(err => console.log('List Erro: ', err));
    }, [change]);
    return (
        <div className="text-white text-center items-center justify-center flex flex-col gap-5">
            <table className="table-fixed w-3/4">
                <thead>
                    <tr className="bg-pink-400 text-left pl-2">
                        <th className="p-2 rounded-tl-md w-1/4">Type of request</th>
                        <th className="w-1/2">Request details</th>
                        <th className="w-1/4">Status</th>
                        <th className=" rounded-tr-md w-1/4">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {lists.map((item, index)=> (
                        <tr className="bg-slate-400 text-left border border-b-white" key={index}>
                            <td className="p-2 border border-b-white">{item.type}</td>
                            <td className="border border-b-white p-2">
                                <div className="truncate hover:whitespace-normal cursor-default">{item.details}</div>
                            </td>
                            <td className={`p-2 
                                ${item.status == "InProgress" ? 'bg-orange-300 text-black':
                                 item.status == 'Resolved' ? 'bg-green-400 text-black': null}`}>
                                    {item.status}
                            </td>
                            {item.status != "Resolved" ? 
                                <td className="p-2 cursor-pointer text-" onClick={() => handleForward(item.status, item._id)}>Forward Application...</td> :
                                <td className="p-2 cursor-default text-"></td>
                            }
                            {/* <td className="p-2 cursor-pointer text-">{item.status != "Resolved" ? 'Forward Application...': null}</td> */}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}