import React from 'react'
import './loaderContainerModal.css';
const LoaderContainerModal = (props) => {
  return (  
    <>
      <div className="loader-screen" style={{top:window.scrollY,left:window.scrollX}}>
        <div className="loader-container">
            <div className="loader-element">
              {props.element }
            </div>
        </div>
      </div>
    </>
  )
}

export default LoaderContainerModal;
