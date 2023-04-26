import React from 'react'
import './zmodal.css';
import {MdClose} from 'react-icons/md'
const Zmodal = (props) => {
  return (  
    <>
      <div className="zmodal-screen" style={{top:window.scrollY,left:window.scrollX}}>
        <div className="zmodal">
            <div className="btn zmodal-close" onClick={props.closeModal}><MdClose/></div>
            <div className="zmodal-element">
              <props.element closeModal={props.closeModal} extras={props.extras}/>
            </div>
        </div>
      </div>
    </>
  )
}

export default Zmodal
