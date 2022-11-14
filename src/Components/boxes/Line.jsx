import { useContext } from "react";
import Box from "../../Contexts/Box";
import deleteBox from "../../Functions/deleteBox";

function Line({line}){
  const {setLastUpdate, setModalData, cont} = useContext(Box);

  return(
    <li className="list-group-item">
      <div className="line">
        <div className="line__content gap-3">
          <div className="line__content__info">
            {
             line.image ? <div className='img-bin'><img src={line.image} alt={line.name} ></img></div> : <span className="red-image">No Image</span>
            }
          </div>
          <div className="line__content__info">
            {line.name}
          </div>
          <div className="line__content__info">
            {cont.find(c=> c.id===line.cont_id)?.indent}
          </div>
          <div className="line__content__info">
            size: {cont.find(c=> c.id===line.cont_id)?.size}
          </div>
          <div className="line__content__info">
            {line.fireable ? "Degi" : "Nedegi"}
          </div>
          <div className="line__content__info">
            {line.perishable ? "Gendanti" : "Negendanti"}
          </div>
        </div>
        <div className="line__buttons">
          <button onClick={() => setModalData(line)} type="button" className="btn btn-outline-success">Edit</button>
          <button onClick={() => setLastUpdate(deleteBox(line.id, line.cont_id))} type="button" className="btn btn-outline-danger">Delete</button>
        </div>
      </div>
    </li>
  )
}

export default Line;