import { useContext } from "react";
import Home from "../../Contexts/Home";

function Line({line}){
  const {setModalData} = useContext(Home);
  const svoris = w =>{
    let suma =  0;
    w.forEach(element => {
      suma += element.weight
    });
    return suma.toFixed(2)
  }
  return(
      <li className="list-group-item" onClick={()=> setModalData(line)} style={(line[0].size==="S" && line.length === 2) || (line[0].size==="M" && line.length === 4) || (line[0].size==="L" && line.length ===6) ? {backgroundColor: "cornsilk"} : {backgroundColor: "white"} }>
      <div className="line">
        <div className="line__content justify-content-between w-100 flex-column flex-md-row">
          <div className="line__content__info">
            {line[0].indent}
          </div>
          <div className="line__content__info">
            {line[0].size}
          </div>
          <div className="line__content__info">
            {line[0].box} <span>{line[0].box === 1 ? "dėžė" : line[0].box === 0 ? "dėžių" : "dėžės"}</span>
          </div>
          <div className="line__content__info">
            <span>Bendras svoris: </span>
            {svoris(line)}
          </div>
        </div>
      </div>
    </li>
  )
}

export default Line;