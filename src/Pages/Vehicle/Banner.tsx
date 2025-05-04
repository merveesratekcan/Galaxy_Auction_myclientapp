import React from 'react'
import './Styles/Banner.css'

function Banner() {
  return (
    <div className='custom-banner'>
        <div className='m-auto d-flex align-items-center' style={{width: '400px' ,height: '50vh'}}>
            <div className='d-flex align-items-center' style={{width: '100%'}}>
                <input type="text" className='form-control rounded-pill' style={{width: '100%', padding:"20px 20px"}} placeholder='Search Car'/>
                <span style={{position:"relative",  left:"-45px"}}>
                    <i className='bi bi-search'></i>
                </span>

            </div>
        </div>
    </div>
  )
}

export default Banner