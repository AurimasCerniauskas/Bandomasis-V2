import { useState } from "react";
import Box from "../../Contexts/Box";
import Create from "./Create";
import axios from 'axios';
import { useEffect } from "react";
import {authConfig} from '../../Functions/auth';
import List from "./List";
import Edit from "./Edit";

function Main(){
  const [lastUpdate, setLastUpdate] = useState(Date.now());
  const [createData, setCreateData] = useState(null);
  const [editData, setEditData] = useState(null);
  const [modalData, setModalData] = useState(null);
  const [boxes, setBoxes] = useState(null);
  const [containers, setContainers] = useState(null);
  const [cont, setCont] = useState(null);
  const [addBox, setAddBox] = useState(null);

  //read
  useEffect(()=>{
    axios.get("http://localhost:3003/server/boxes", authConfig())
    .then(res=>
      setBoxes(res.data)
    )
  }, [lastUpdate])

  useEffect(()=>{
    axios.get("http://localhost:3003/server/container")
    .then(res=>
      setCont(res.data)
    )
  }, [lastUpdate])

  useEffect(()=>{
    axios.get("http://localhost:3003/server/econtainers", authConfig())
    .then(res=>
      // console.log(res.data)
      setContainers(res.data)
    )
  }, [lastUpdate])

  //create
  useEffect(()=>{
    if(createData=== null) return;
    axios.post("http://localhost:3003/server/boxes", createData, authConfig())
    .then(res=>
      setLastUpdate(Date.now())
    )
  }, [createData])


  //delete


  //edit
  useEffect(()=>{
    if(editData=== null) return;
    axios.put("http://localhost:3003/server/eboxes/"+editData.id, editData, authConfig())
    .then(res=>
      setLastUpdate(Date.now())
    )
  }, [editData])

  useEffect(()=> {
    if(addBox===null) return;
    axios.put("http://localhost:3003/server/containerb/"+addBox.cont_id, authConfig())
    .then(res=>
      setLastUpdate(Date.now())
    )
  }, [addBox])


  return(
    <Box.Provider value={{
      setCreateData,
      setLastUpdate,
      setAddBox,
      setEditData,
      setModalData,
      cont,
      modalData,
      boxes,
      containers
    }}>
      <div className="container">
        <div className="row"> 
          <div className="col-10 col-lg-3 offset-sm-1 offset-lg-0"><Create /></div>
          <div className="col-10 col-lg-9 offset-sm-1 offset-lg-0"><List /></div>
        </div>
      </div>
      <Edit />
    </Box.Provider>
  )
}

export default Main;