import { useContext } from "react";
import Container from "../../Contexts/Container";
// import sizes from '../../Data/sizes'

function Line({line}){
  const {setDeleteData, setModalData} = useContext(Container);

  return(
    <li className="list-group-item">
      <div className="line">
        <div className="line__content">
          <div className="line__content__info">{line.size}</div>
        </div>
        <div className="line__content">
          <div className="line__content__info">{line.indent}</div>
        </div>
        <div className="line__content">
          <div className="line__content__info">{line.box}</div>
        </div>
        <div className="line__buttons">
          <button onClick={() => setModalData(line)} type="button" className="btn btn-outline-success">Edit</button>
          <button onClick={() => setDeleteData(line)} type="button" className="btn btn-outline-danger">Delete</button>
        </div>
      </div>
    </li>
  )
}

export default Line;