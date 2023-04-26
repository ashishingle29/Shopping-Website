import React from 'react';
import './registerSecretWordModal.css'
const RegisterSecretWordModal = ({secretWords,closeModal}) => {
  return (
    <>
    <div className="swm vh-100 vw-100">
      <div className="modal-container">
        <h1 className='text-center'>Secret Word list</h1>
        <ol>
          {secretWords.map((item)=>(
            <li>{item}</li>
          ))
          }
        </ol>
        <p>Please note down the secret word list in the exact given order. You will need this list to reset your password in case you forget it.</p>
        <button className='m-auto d-block btn btn-success w-25' onClick={closeModal}>Done</button>
      </div>
    </div>
    </>
  )
}

export default RegisterSecretWordModal;
