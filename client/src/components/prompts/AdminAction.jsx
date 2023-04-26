import React from 'react'

const AdminAction = (props) => {
  return (
    <>
      <h5 className='px-5'>Are you sure?</h5>
      <div className='d-flex justify-content-center mt-3'>
        <button className="btn btn-success mx-1" onClick={props.extras.action}>Confirm</button>
        <button className="btn btn-dark mx-1" onClick={props.closeModal}>Close</button>
      </div>
    </>
  )
}

export default AdminAction
