import { useEffect, useState } from "react"
import RequestForm from "../RequestForm"
import RequestList from "./RequestList"

export default function Dashboard({admin}) {
    if(admin) {
        return <RequestList />
    }
    else {
        return <RequestForm />
    }

}
