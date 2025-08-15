// import React, { useState } from 'react'
// import { useSignUpMutation } from '../../Api/accountApi'
// //css
// import './Styles/Register.css'
// import { SD_ROLES } from '../../Interfaces/enums/SD_ROLES';
// import { apiResponse } from '../../Interfaces/apiResponse';

// function Register() {

//    const [useData,setUserDataState]=useState({
//     userName:"",
//     password:"",
//     userType:"",
//     fullName:"",
    
//    });


//    console.log(useData);
   
//    const [userRegisterMutation]=useSignUpMutation();
//    const handleRegistrationSubmit= async ()=>{
//         const response:apiResponse= await userRegisterMutation({
//             username:useData.userName,
//             fullname:useData.fullName,
//             password:useData.password,
//             userType:useData.userType
//         });
//         console.log(response);
//    }



//    return (
//      <section>
//     <div className="container">
      
//       <div className="alert alert-warning text-center my-4">
//         For Example
//       </div>
      
//       <div className="row justify-content-center">
//         <div className="col-12 col-md-8 col-lg-8 col-xl-6">
//           <div className="row">
//             <div className="col text-center">
//               <h1>Register</h1>
//               <p className="text-h3">Far far away, behind the word mountains, far from the countries Vokalia and Consonantia. </p>
//             </div>
//           </div>
//           <div className="row align-items-center">
//             <div className="col mt-4">
//               <input type="text" className="form-control" placeholder="Fullname" onChange={(e)=>
//                 setUserDataState((prevState) => ({ ...prevState, fullname: e.target.value }))}/>
//             </div>
//           </div>
//           <div className="row align-items-center mt-4">
//             <div className="col">
//               <input type="email" className="form-control" placeholder="Email" onChange={(e)=>
//                 setUserDataState((prevState) => ({ ...prevState, username: e.target.value }))}/>
//             </div>
//           </div>
//           <div className="row align-items-center mt-4">
//             <div className="col">
//               <input type="password" className="form-control" placeholder="Password" onChange={(e)=>
//                 setUserDataState((prevState) => ({ ...prevState, password: e.target.value }))}/>
//             </div>
//             <div className="col">
//               <select className='form-control'  onChange={(e)=>
//                 setUserDataState((prevState) => ({ ...prevState, userType: e.target.value }))} aria-placeholder='Select Role'>

//                 <option value={SD_ROLES.Seller}>Seller</option>
//                 <option value={SD_ROLES.NormalUser}>Normally</option>
//               </select>
//             </div>
//           </div>
//           <div className="row justify-content-start mt-4">
//             <div className="col">
//               <div className="form-check">
//                 <label className="form-check-label">
//                   <input type="checkbox" className="form-check-input"/>
//                   I Read and Accept <a href="https://www.froala.com">Terms and Conditions</a>
//                 </label>
//               </div>

//               <button className="btn btn-primary mt-4" onClick={()=>handleRegistrationSubmit()}>Submit</button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   </section>
//   )
// }

// export default Register


import React, { useState } from 'react';
import { useSignUpMutation } from '../../Api/accountApi';
//css
import './Styles/Register.css';
import { SD_ROLES } from '../../Interfaces/enums/SD_ROLES';
import { apiResponse } from '../../Interfaces/apiResponse';
import { useNavigate

 } from 'react-router-dom';
import { ToastrNotify } from '../../Helper';

function Register() {
  const Navigate = useNavigate();
  const [useData, setUserDataState] = useState({
    userName: '',
    password: '',
    userType: '',
    fullName: '',
  });

  const [errorMessages, setErrorMessages] = useState<string[]>([]); // Hata mesajlarını tutmak için state
  const [userRegisterMutation] = useSignUpMutation();

  const handleRegistrationSubmit = async () => {
  const payload = {
    userName: useData.userName.trim(),
    fullName: useData.fullName.trim(),
    password: useData.password.trim(),
    userType: useData.userType, // trim gerekmez
  };

  try {
    const data = await userRegisterMutation(payload).unwrap(); // body döner
    if (data?.isSuccess) {
      ToastrNotify('Registration successful', 'success');
      Navigate('/');
    } else {
      const msg = data?.errorMessages?.[0] ?? 'Registration failed';
      ToastrNotify(msg, 'error');
      setErrorMessages(data?.errorMessages ?? [msg]);
    }
  } catch (err: any) {
    const msg = err?.data?.errorMessages?.[0] ?? 'Registration failed';
    ToastrNotify(msg, 'error');
    setErrorMessages(err?.data?.errorMessages ?? [msg]);
  }
};

  return (
    <section>
      <div className="container">
        <div className="alert alert-warning text-center my-4">For Example</div>

        <div className="row justify-content-center">
          <div className="col-12 col-md-8 col-lg-8 col-xl-6">
            <div className="row">
              <div className="col text-center">
                <h1>Register</h1>
                <p className="text-h3">
                  Far far away, behind the word mountains, far from the countries Vokalia and Consonantia.
                </p>
              </div>
            </div>
            <div className="row align-items-center">
              <div className="col mt-4">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Fullname"
                  onChange={(e) =>
                    setUserDataState((prevState) => ({ ...prevState, fullName: e.target.value }))
                  }
                />
              </div>
            </div>
            <div className="row align-items-center mt-4">
              <div className="col">
                <input
                  type="email"
                  className="form-control"
                  placeholder="Email"
                  onChange={(e) =>
                    setUserDataState((prevState) => ({ ...prevState, userName: e.target.value }))
                  }
                />
              </div>
            </div>
            <div className="row align-items-center mt-4">
              <div className="col">
                <input
                  type="password"
                  className="form-control"
                  placeholder="Password"
                  onChange={(e) =>
                    setUserDataState((prevState) => ({ ...prevState, password: e.target.value }))
                  }
                />
              </div>
              <div className="col">
                <select
                  className="form-control"
                  onChange={(e) =>
                    setUserDataState((prevState) => ({ ...prevState, userType: e.target.value }))
                  }
                  aria-placeholder="Select Role"
                >
                  <option value={SD_ROLES.Seller}>Seller</option>
                  <option value={SD_ROLES.NormalUser}>Normally</option>
                </select>
              </div>
            </div>
            <div className="row justify-content-start mt-4">
              <div className="col">
                <div className="form-check">
                  <label className="form-check-label">
                    <input type="checkbox" className="form-check-input" />
                    I Read and Accept <a href="https://www.froala.com">Terms and Conditions</a>
                  </label>
                </div>

                <button className="btn btn-primary mt-4" onClick={handleRegistrationSubmit}>
                  Submit
                </button>
              </div>
            </div>
            {/* Hata mesajlarını ekranda göster */}
            {errorMessages.length > 0 && (
              <div className="alert alert-danger mt-4">
                <ul>
                  {errorMessages.map((msg, index) => (
                    <li key={index}>{msg}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Register;