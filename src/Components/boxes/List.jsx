import { useContext } from "react";
import Box from "../../Contexts/Box";
import Line from "./Line";

function List(){
  const {boxes} = useContext(Box);
  return(
    <div className="card m-4">
     <h5 className="card-header">Prekių sąrašas</h5>
     <div className="card-body">
      <ul className="list-group">
        {
          boxes?.map(b=> <Line key={b.id} line={b} />)
        }
      </ul>
     </div>
    </div>
  )
}

export default List;