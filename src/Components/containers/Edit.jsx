import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { useContext } from "react";
import Container from "../../Contexts/Container";
import {authConfig} from "../../Functions/auth";
import deleteBox from "../../Functions/deleteBox";


function Edit(){
  const {modalData, setModalData, setLastUpdate, lastUpdate} = useContext(Container);
  const [contID, setContID] = useState('');
  const [contSize, setContSize] = useState('');
  const [boxes, setBoxes] = useState(null);

   useEffect(()=>{
     if(modalData===null){
       return;
      }
      setContID(modalData.indent);
      setContSize(modalData.size)
    }, [modalData])

    
    useEffect(()=>{
      if(modalData===null) return;
      axios.get("http://localhost:3003/server/contbox/"+modalData.id, authConfig())
      .then(res=>
        setBoxes(res.data)
        )
    },[modalData, lastUpdate])

  if (modalData === null) {
    return null;
  }
  return(
    <div className="modal">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Edit Container</h5>
            <button type="button" onClick={()=>setModalData(null)} className="btn-close"></button>
          </div>
          <div className="modal-body">
            <div className="mb-3 d-flex gap-3">
              <p><b>Container</b></p> <p>{contID}</p> <p>{contSize}</p>
            </div>
            <div className="mb-3">
              <p><b>Boxes: </b></p>
              <ul className="list-group">
              {boxes?.length 
              ? boxes?.map(b=> <li className="list-group-item" key={b.id}>
                <div className="d-flex justify-content-between">
                  <div className="d-flex gap-3">
                {b.image ? <div className='img-bin'>
                            <img src={b.image} alt={b.title}>
                            </img>
                        </div> : <span className="red-image">No image</span>}
                  <p>{b.name}</p>
                  <p className="mr-auto">{b.weight} kg</p>
                  </div>
                  <button type="button" className="btn btn-danger" onClick={()=>setLastUpdate(deleteBox(b.id, modalData.id))}>Delete</button>
                </div>
              </li>) 
              
              : <span>No boxes</span>}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Edit;