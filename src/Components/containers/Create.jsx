import { useState } from "react";
import { useEffect } from "react";
import { useContext } from "react";
import Container from "../../Contexts/Container";
import conId from "../../Functions/conId";
// import sizes from "../../Data/sizes.js";

function Create(){
  const {setCreateData} = useContext(Container);
  const [containerId, setContainerId] = useState('');
  const [containerSize, setContainerSize] = useState('0');

  useEffect(()=>{
    if (containerSize !== '0'){
      const indent = conId(3)+'-'+conId(6);
      setContainerId(indent);
    }else{
      setContainerId('')
    }
  }, [containerSize])


  const add = () =>{
    setCreateData({
      indent: containerId,
      size: containerSize
    });
    setContainerId('');
    setContainerSize('0');
  }
  return(
    <div className="card m-4">
      <h5 className="card-header">Create new Container</h5>
      <div className="card-body">
        <div className="mb-3">
          <label className="form-label">Container size</label>
          <select className="form-control" value={containerSize} onChange={e=>setContainerSize(e.target.value)}>
            <option value={0} disabled>Choose from list</option>
            <option value={'S'}>S</option>
            <option value={'M'}>M</option>
            <option value={'L'}>L</option>
            {/* {
              sizes.map(s=> <option key={s.id} value={s.id}>{s.type}</option>)
            } */}
          </select>
        </div>
        <div className="mb-3">
          <label className="form-label">Container ID</label>
          <input type="text" className="form-control" value={containerSize !== '0' ? containerId : ''} readOnly={true}/>
        </div>
        <button onClick={add} type='button' className='btn btn-outline-success'>Add</button>
      </div>
    </div>
  )
}

export default Create;