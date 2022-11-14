import { useContext } from "react"
import Home from "../../Contexts/Home"

function Boxes(){
  const {setModalData, modalData} = useContext(Home);
  if(modalData === null){
    return null;
  }
  return(
    <div className="modal">
      <div className="modal-dialog modal-dialog-centered modal-lg">
        <div className="modal-content">
          <div className="modal-header">
            <h4 className="modal-title">Prekių sąrašas</h4>
            <button className="btn btn-close" type='button' onClick={()=>setModalData(null)}></button>
          </div>
          <div className="modal-body">
            <ul className="list-group">
              {
                modalData?.map(b=> <li key={b.bid} className="list-group-item">
                  <div className="line w-100">
                    <div className="line__content gap-4">
                      <div className="line__content__info">
                        {
                          b.image ? <div className='img-bin'><img src={b.image} alt={b.name} ></img></div> : <span className="red-image">No Image</span>
                        }
                      </div>
                      <div className="line__content__info">
                        {b.name}
                      </div>
                      <div className="line__content__info">
                        {b.fireable ? "Degi" : "Nedegi"}
                      </div>
                      <div className="line__content__info">
                        {b.perishable ? "Gendanti" : "Negendanti"}
                      </div>
                      <div className="line__content__info">
                        {b.weight} kg
                      </div>
                    </div>
                  </div>
                </li>)
              }
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Boxes;