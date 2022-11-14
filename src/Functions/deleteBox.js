import axios from 'axios';

const deleteBox = (id, cid) =>{
  let lastUpdate = Date.now();
   axios.delete("http://localhost:3003/server/box/"+id)
    .then(res=>{
      lastUpdate = Date.now()
    })
    axios.put("http://localhost:3003/server/contdb/"+cid)
    .then(res=>
      lastUpdate = Date.now()
    )
    return lastUpdate;
  }

  export default deleteBox;