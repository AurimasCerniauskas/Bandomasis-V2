import { useEffect } from "react";
import { useState } from "react";
import Container from "../../Contexts/Container";
import Create from "./Create";
import Edit from "./Edit";
import List from "./List";
import {authConfig} from '../../Functions/auth';
import axios from 'axios';

function Main(){
  const [lastUpdate, setLastUpdate] = useState(Date.now());
  const [editData, setEditData] = useState(null);
  const [createData, setCreateData] = useState(null);
  const [deleteData, setDeleteData] = useState(null);
  const [modalData, setModalData] = useState(null);
  const [cont, setCont] = useState(null);


  //read
  useEffect(()=>{
    axios.get("http://localhost:3003/server/container", authConfig())
    .then(res=>
      setCont(res.data)
    )
  }, [lastUpdate])

  //delete
  useEffect(()=>{
    if(deleteData===null){
      return;
    }
    axios.delete("http://localhost:3003/server/container/"+deleteData.id, authConfig())
    .then(res=>
      setLastUpdate(Date.now())
    )
  },[deleteData])

  //create
  useEffect(()=>{
    if(createData===null){
      return;
    }
    axios.post("http://localhost:3003/server/container", createData, authConfig())
    .then(res=>
      setLastUpdate(Date.now())
    )
  }, [createData])

  //edit
  useEffect(()=>{
    if(editData===null){
      return;
    }
    setLastUpdate(Date.now())
  }, [editData])

  return(
    <Container.Provider value={{
      setLastUpdate,
      lastUpdate,
      setCreateData,
      setDeleteData,
      setModalData,
      setEditData,
      modalData,
      cont
    }}>
      <div className="container">
        <div className="row">
          <div className="col-9 col-lg-4 offset-sm-1 offset-lg-0"><Create /></div>
          <div className="col-9 col-lg-8 offset-sm-1 offset-lg-0"><List /></div>
        </div>
      </div>
      <Edit />
    </Container.Provider>
  )
}

export default Main;