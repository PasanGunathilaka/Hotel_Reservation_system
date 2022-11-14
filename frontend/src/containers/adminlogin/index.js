import React, { useState } from 'react';
import axios from 'axios';
import './styles.css';
import Button from '@mui/material/Button';
import { useNavigate } from "react-router-dom";
import Alert from '@mui/material/Alert';


function Index() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const [errortext, setErrortext] = useState('');
 
 
 
  const user = {
    email,
    password
  }


  let navigate = useNavigate();


  const routeChange = () => {
    let path = `/admindashboard`;
    navigate(path);
  }


  const loginfun = () => {
   
    if (email == "" || password == "") {
      setErrortext("Please enter username and password");
      setError(true);
    }
    else {
      axios.post(`http://localhost:5000/admin/signin`, user)
        .then(res => {
          if (res.status == 400) {
            console.log("Plaese check username and password")
          } else if (res.status == 200) {
            sessionStorage.setItem('admin', 'true');
            let path = `/admindashboard`;
            navigate(path); 
          }
        })
        .catch(error => {

          setErrortext("Incorrect username or password");
          setError(true);
        });
    }

  }



  return (
    <>
      <div class="container">
        <div class="row justify-content-md-center">
          <div class="card col-lg-7 cardclass"  >
            <div class="col  "   >
              <div class="mb-3 row">

              </div>
              <div class="mb-3 row">

                <h2 class="" >ABC Hotel Admin Login</h2>
              </div>

              {error ? <Alert variant="filled" className='new' severity="error">
                {errortext}
              </Alert> : ''}



              <div class="mb-3 row " >
                <label for="staticEmail" class="col-sm-2 col-form-label">User Name</label>
                <div class="col-sm-10">
                  <input type="text" class="form-control" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
              </div>
              <div class="mb-3 row">
                <label for="inputPassword" class="col-sm-2 col-form-label">Password</label>
                <div class="col-sm-10">
                  <input type="password" class="form-control" value={password}
                    onChange={(e) => setPassword(e.target.value)} />
                </div>
              </div>
              <div class="mb-3 row">
                <div class="col-sm-2">
                  <Button variant="contained" onClick={loginfun}>Log in</Button>

                </div>
                <div class="col-sm-10">
                </div>
              </div>

            </div>
          </div>

        </div>

      </div>
    </>
  )
}

export default Index