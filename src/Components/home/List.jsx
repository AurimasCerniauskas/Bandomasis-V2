import { useContext } from "react";
import Home from "../../Contexts/Home";
import Line from "./Line";

function List(){
  const {containers} = useContext(Home);
  return(
    <>
    <div className="card m-4">
      <h4 className="card-header">Konteinerių sąrašas</h4>
      <ul className="list-group">
        {
          containers?.map(c=> <Line key={c[0]} line={c[1]} />)
        }
      </ul>
    </div>
    <div className="m-3"><span style={{backgroundColor: 'cornsilk', color: 'cornsilk'}}>box</span><span> - pilni konteineriai</span></div>
    </>
  )
}

export default List;