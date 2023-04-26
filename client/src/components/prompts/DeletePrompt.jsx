import React from 'react'

const DeletePrompt = (props) => {

  // const deleteHandler=()=>{
  //   props.extras.deleteHandler();
  // }
  return (
    <>
      <h5 className='px-5'>Are you sure?</h5>
      <div className='d-flex justify-content-center mt-3'>
        <button className="btn btn-success mx-1" onClick={props.extras.deleteHandler}>Confirm</button>
        <button className="btn btn-dark mx-1" onClick={props.closeModal}>Close</button>
      </div>
    </>
  )
}

export default DeletePrompt
