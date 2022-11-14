import { useState, useContext, useRef} from "react";
import Box from "../../Contexts/Box";
import getBase64 from '../../Functions/getBase64';


function Create(){
  const {setCreateData, containers, setAddBox} = useContext(Box);
  const [name, setName] = useState('');
  const [weight, setWeight] = useState('');
  const [cont, setCont] = useState('0');
  const [fire, setFire] = useState({'0': true, '1': false})
  const [perish, setPerish] = useState({'0': true, '1': false})
  const fileInput = useRef();
  const [photoPrint, setPhotoPrint] = useState(null);

  const doPhoto = () => {
      getBase64(fileInput.current.files[0])
          .then(photo => setPhotoPrint(photo))
          .catch(_ => {
          })
  }

  const checkf = e =>{
    const v=e.target.value;
    setFire({0: v==='0', 1: v==='1'})
  }
  const checkp = e =>{
    const v=e.target.value;
    setPerish({0: v==='0', 1: v==='1'})
  }

  const saveBox = ()=>{
      setCreateData({
        name,
        weight: parseFloat(weight),
        image: photoPrint,
        fireable: !fire[0],
        perishable: !perish[0],
        cont_id: parseInt(cont)
      })
      setAddBox({
        cont_id: parseInt(cont)
      })
      setName('');
      setWeight('');
      setCont('0');
      setFire({'0': true, '1': false})
      setPerish({'0': true, '1': false})
      setPhotoPrint(null);
      fileInput.current.value = null;
  }

  return(
    <div className="card m-4">
      <h5 className="card-header">Sukurti dėžę ir priskirti konteineriui</h5>
      <div className="card-body">
        <div className="mb-3">
          <label className="form-label">Prekės pavadinimas</label>
          <input type='text' className="form-control" value={name} onChange={e=>setName(e.target.value)} />
        </div>
        <div className="mb-3">
          <label className="form-label">Svoris, kg</label>
          <input type='text' className="form-control" value={weight} onChange={e=>setWeight(e.target.value.replace(/[^\d\\.\\,]/, ''))} />
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
          <label className="form-label">Pridėti nuotrauką</label>
          <input ref={fileInput} type='file' className="form-control" onChange={doPhoto} />
        </div>
        {photoPrint ? <div className='img-bin'><img src={photoPrint} alt="upload"></img></div> : null}
        <button type="button" className="btn btn-outline-primary" onClick={saveBox}>Išsaugoti</button>
      </div>
    </div>
  )
}

export default Create;