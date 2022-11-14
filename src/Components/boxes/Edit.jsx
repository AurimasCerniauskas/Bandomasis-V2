import axios from "axios";
import { useEffect, useState, useRef } from "react";
import { useContext } from "react"
import Box from "../../Contexts/Box"
import getBase64 from "../../Functions/getBase64";

function Edit(){
  const {modalData, setModalData, setEditData, containers, setLastUpdate} = useContext(Box);
  const [name, setName] = useState('');
  const [weight, setWeight] = useState('');
  const [deletePhoto, setDeletePhtoto] = useState(false);
  const fileInput = useRef();
  const [photoPrint, setPhotoPrint] = useState(null);
  const [cont, setCont] = useState('0');
  const [fire, setFire] = useState({'0': true, '1': false})
  const [perish, setPerish] = useState({'0': true, '1': false})

  const doPhoto = () => {
    getBase64(fileInput.current.files[0])
      .then((photo) => setPhotoPrint(photo))
      .catch((_) => {
        // tylim
      });
  };

  useEffect(()=>{
    if (modalData=== null) return;
    setName(modalData.name);
    setWeight(modalData.weight);
    setPhotoPrint(modalData.image);
    setDeletePhtoto(false);
    setFire({'0': !modalData.fireable ,'1': modalData.fireable});
    setPerish({'0': !modalData.perishable, '1': modalData.perishable});
  }, [modalData])

  const checkf = e =>{
    const v=e.target.value;
    setFire({0: v==='0', 1: v==='1'})
  }

  const checkp = e =>{
    const v=e.target.value;
    setPerish({0: v==='0', 1: v==='1'})
  }

  const save = () =>{
    setEditData({
      id: modalData.id,
      name,
      weight: parseFloat(weight),
      image: photoPrint,
      fireable: !fire[0],
      perishable: !perish[0],
      deletePhoto: deletePhoto ? 1 : 0,
      cont_id: cont === '0' ? modalData.cont_id : changeCon(cont)
    })
    setModalData(null);
    setDeletePhtoto(false)

  }

  const changeCon = (id) =>{
    axios.put("http://localhost:3003/server/containerb/"+id)
    .then(res=> setLastUpdate(Date.now()));
    axios.put("http://localhost:3003/server/contdb/"+modalData.cont_id)
    .then(res=> setLastUpdate(Date.now()))
    return id
  }

  if(modalData===null){
    return null;
  }
  return(
    <div className="modal">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Keisti prekę</h5>
            <button type="button" className="btn btn-close" onClick={()=> setModalData(null)}></button>
          </div>
          <div className="modal-body">
            <div className="card m-4">
              <div className="card-body">
                <div className="mb-3">
                  <label className="form-label">Prekės pavadinimas</label>
                  <input className="form-control" type='text' value={name} onChange={e=> setName(e.target.value)} />
                </div>
                <div className="mb-3">
                  <label className="form-label">Prekės svoris, kg</label>
                  <input className="form-control" type='text' value={weight} onChange={e=> setWeight(e.target.value)} />
                </div>
                <div className="mb-3">
                  <label className="form-label">Pasirinkti konteinerį</label>
                  <select className="form-control" value={cont} onChange={e=> setCont(e.target.value)}>
                  <option value={0} disabled>sąrašas</option>
                     {
                      containers?.map(c=> <option key={c.id} value={c.id}>{c.size} id: {c.indent} box: {c.box}</option>)
                    }
                  </select>
                </div>
                <div className="mb-3 d-flex gap-4">
                  <label className="form-label">Degi</label>
                  <div className="form-check">
                    <input onChange={checkf} className="form-check-input" type="checkbox" id="_1" value={0} checked={fire[0]} />
                    <label className="form-check-label" htmlFor="_1">Ne</label>
                  </div>
                  <div className="form-check">
                    <input onChange={checkf} className="form-check-input" type="checkbox" id="_1" value={1} checked={fire[1]} />
                    <label className="form-check-label" htmlFor="_1">Taip</label>
                  </div>
                </div>
              <div className="mb-3 d-flex gap-4">
                <label className="form-label">Gendanti</label>
                <div className="form-check">
                  <input onChange={checkp} className="form-check-input" type="checkbox" id="_1" value={0} checked={perish[0]} />
                  <label className="form-check-label" htmlFor="_1">Ne</label>
                </div>
                <div className="form-check">
                  <input onChange={checkp} className="form-check-input" type="checkbox" id="_1" value={1} checked={perish[1]} />
                  <label className="form-check-label" htmlFor="_1">Taip</label>
                </div>
              </div>
                <div className="mb-3">
                  <label className="form-label">Pakeisti pav.</label>
                  <input ref={fileInput} type="file" className="form-control" onChange={doPhoto}/>
                </div>
                {photoPrint ? (<div className="img-bin"> <label htmlFor="image-delete">X</label> <input id="image-delete" type="checkbox" checked={deletePhoto} onChange={()=> setDeletePhtoto(d => !d)}></input>
                    <img src={photoPrint} alt="upload imag"></img>
                  </div>
                ) : null}
              </div>
            </div>
          </div>
          <div className="modal-footer">
          <button onClick={() => setModalData(null)}type="button" className="btn btn-secondary">Uždaryti</button>
          <button onClick={save} type="button" className="btn btn-primary">Išsaugoti</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Edit;