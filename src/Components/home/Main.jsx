import List from "./List";
import axios from 'axios';
import { useState, useEffect } from "react";
import Home from "../../Contexts/Home";
import Boxes from "./Boxes";

function Main(){
  const [containers, setContainers] = useState(null);
  const [modalData, setModalData] = useState(null);
  const [lastUpdate, setLastUpdate] = useState(Date.now());

  const reList = (data) =>{
    const d = new Map();
    data.forEach(line=> {
      if(d.has(line.indent)){
        d.set(line.indent, [...d.get(line.indent), line]);
      }else{
        d.set(line.indent, [line]);
      }
  });
    return [...d];
  }

  useEffect(()=>{
    axios.get("http://localhost:3003/home/all")
    .then(res=> {
      setContainers(reList(res.data))
  })
  }, [lastUpdate])

  return(
    <Home.Provider value={{
      containers,
      setModalData,
      modalData,
      setLastUpdate
    }}>
      <div className="container">
        <div className="row">
          <div className="col-12">
            <List />
          </div>
        </div>
      </div>
      <Boxes />
    </Home.Provider>
  )
}

export default Main;