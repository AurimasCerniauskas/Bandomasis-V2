import { useContext } from "react";
import Container from "../../Contexts/Container";
import Line from "./Line";

function List(){
  const {cont} = useContext(Container);
  return(
    <div className="card m-4">
      <h5 className="card-header">Containers</h5>
      <div className="card-body">
        <ul className="list-group">
          {
            cont?.map(c=> <Line key={c.id} line={c} />)
          }
        </ul>
      </div>
    </div>
  )
}

export default List;