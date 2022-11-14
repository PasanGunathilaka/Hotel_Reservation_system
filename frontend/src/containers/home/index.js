import React, { useState, useEffect } from 'react';
import ResponsiveAppBar from '../../components/navigation';
import './styles.css'
import MyImage from '../../../src/Visit.png'
import oneImage from '../../../src/one.png'
import twoImage from '../../../src/two.png'

import threeImage from '../../../src/three.png'
import TextField from '@mui/material/TextField';

import Alert from '@mui/material/Alert';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

import SendIcon from '@mui/icons-material/Send';
import BedroomParentIcon from '@mui/icons-material/BedroomParent';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import dayjs from 'dayjs';

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import LogoutIcon from '@mui/icons-material/Logout';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
 import Stack from '@mui/material/Stack';
 import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
 import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 700,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};
function Index() {

  // date widjet
  const [dateOne, setdateOne] = React.useState(new Date());
  const [dateTwo, setdateTwo] = React.useState(new Date());

  const handleChangeOne = (newValue) => {
    setdateOne(newValue);
  };
  const handleChangetwo = (newValue) => {
    setdateTwo(newValue);
  };

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const [errortext, setErrortext] = useState('');

  const [logincheck, setLogincheck] = useState(false);


  // create new accout states

  const [firstnamee, setFirstname] = useState('');
  const [lastnamee, setLastname] = useState('');
  const [newEmaile, setnewEmail] = useState('');
  const [contactNumbere, setContactNumber] = useState('');
  const [newPassworde, setnewPassword] = useState('');






  // model one
  const [open, setOpen] = React.useState(false);
  
  const handleClose = () => setOpen(false);

  // model two
  const [opentwo, setOpentwo] = React.useState(false);
  const handleOpetwo = () => setOpentwo(true);
  const handleClosetwo = () => setOpentwo(false);

  // model three
  const [openthree, setOpenthree] = React.useState(false);
  const handleOpethree = () => setOpenthree(true);
  const handleClosethree = () => setOpenthree(false);
  const [roomtype, setRoomtype] = useState('');
  const [roomclieked, setRoomclieked] = React.useState(false);
  const [loguserName, setloguserName] = useState('');
  const [loguserID, setloguserID] = useState('');
  const [loguserContact, setloguserContact] = useState('');

// model four
const [openfour, setOpenfour] = React.useState(false);
const handleOpefour = () => setOpenfour(true);
const handleClosefour = () => setOpenfour(false);



// payment gateway

const [payone, setPayone] = useState('');

const [paytwo, setPaytwo] = useState('');


  // login function

  let navigate = useNavigate();

  useEffect(() => {
    logincheckfun();


  }, []);

  // function to check login

  const handleOpen = () => {

    setRoomclieked(false);
    setOpen(true);


  }


  // checking login
  const logincheckfun = () => {

    let personName = sessionStorage.getItem("user_id");
    if (personName) {
      setLogincheck(true);
    } else {
      setLogincheck(false);

    }
  };


  const user = {
    email,
    password
  }





  // login function
  const loginfun = () => {


    if (email == "" || password == "") {
      setErrortext("Please enter username and password");
      setError(true);
    }
    else {
      debugger;
      axios.post(`http://localhost:5000/customer/signin`, user)
        .then(res => {
          if (res.status == 400) {
            console.log("Plaese check username and password")
          } else if (res.status == 200) {

            sessionStorage.setItem('user_id', res.data.customer._id);
            sessionStorage.setItem('user', res.data.customer.fullName);
            sessionStorage.setItem('contact', res.data.customer.contactNumber);
            setloguserID(res.data.customer._id);
            setloguserName(res.data.customer.fullName);
            setloguserContact(res.data.customer.contactNumber);


            afterfunction();
          }
        })
        .catch(error => {
          setErrortext("Incorrect username or password");
          setError(true);
        });
    }


  }




  const afterfunction = () => {
    let personName = sessionStorage.getItem("user_id");
    console.log(personName);
    if (!personName) {
      setLogincheck(false);
    } else {
      setLogincheck(true)
    }
    setOpen(false);
    setOpentwo(false);

    if (roomclieked) {
      setOpenthree(true);
    } else {
      setRoomclieked(false);

    }

  }

  // function to logout
  const logutfunction = () => {
    sessionStorage.clear();
    setLogincheck(false);
    setPassword("");
    setEmail("");
    setloguserName("");
    setloguserID("");
    setloguserContact("");


  };

  // create new customer button click

  const createnewAcc = () => {
    setError(false);
    setOpen(false);
    setOpentwo(true);


  };

  // function to open the  booking modal
  function bookingModelopen(roomnumber) {


    setRoomclieked(true);


    if (roomnumber == 1) {
      setRoomtype("single");
    } else if (roomnumber == 2) {
      setRoomtype("double");

    } else if (roomnumber == 3) {
      setRoomtype("family");

    }

    let personName = sessionStorage.getItem("user_id");
    if (personName) {
      setOpenthree(true);

    } else {
      setOpen(true);


    }


  }





  // registerfun

  const registerfun = () => {
    sessionStorage.clear();

    let firstName = firstnamee;
    let lastName = lastnamee;
    let email = newEmaile;
    let password = newPassworde;
    let contactNumber = contactNumbere;


    const newuser = {
      firstName,
      lastName,
      email,
      password,
      contactNumber
    }

    console.log(newuser);
    if (firstName == "" || lastName == "" || email == "" || password == "" || contactNumber == "") {
      setErrortext("Please Fill all the fields");
      setError(true);
    }
    else {
      debugger;
      axios.post(`http://localhost:5000/customer/signup`, newuser)
        .then(res => {
          if (res.status == 400) {
            console.log("Registration Failed")
          } else if (res.status == 201) {

            sessionStorage.setItem('user_id', res.data.customer._id);
            sessionStorage.setItem('user', res.data.customer.firstName + " " + res.data.customer.lastName);
            sessionStorage.setItem('contact', res.data.customer.contactNumber);

            setloguserID(res.data.customer._id);
            setloguserName(res.data.customer.firstName + " " + res.data.customer.lastName);
            setloguserContact(res.data.customer.contactNumber);
            afterfunction();
          }
        })
        .catch(error => {
          setErrortext("Please try again");
          setError(true);
        });
    }

  };

 //booking function

 const bookdone = () => {
  

  let customerID = sessionStorage.getItem("user_id");;
  let roomID = roomtype;
  let bookingstartdate = dateOne;
  let bookingenddate = dateTwo;
  let paymentStatus;
  let contactNumber = sessionStorage.getItem("contact");
  if(payone=="" || paytwo == ""){
    paymentStatus = "pending";
  }else{
    paymentStatus = "done";

  }
 

  const newbooking = {
    customerID,
    roomID,
    paymentStatus,
    bookingstartdate,
    bookingenddate,
    contactNumber
  }

  console.log(newbooking);
  if (bookingstartdate == "" || bookingenddate == "") {
    setErrortext("Please Select the dates");
    setError(true);
  }
  else {
    debugger;
    axios.post(`http://localhost:5000/booking/register`, newbooking)
      .then(res => {
        if (res.status == 400) {
          console.log("Registration Failed")
        } else if (res.status == 201) {
          bookingsuccess();
        }
      })
      .catch(error => {
        setErrortext("Somthing wrong");
        setError(true);
      });
  }

};

//openfour function
const bookingsuccess  = () => {
  setError(false);
  setOpenthree(false);
  setOpenfour(true);

};

//go to my bookings
const gotoMybookingsfunction  = () => {
  let path = `/bookings`;
  navigate(path);

};



  return (
    <>
      <nav class="navbar navbar-expand-lg navbar-dark  cback"   >
        <div class="container-fluid">
          <a class="navbar-brand" >Hotel ABC</a>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
              <li class="nav-item">
                <a class="nav-link active" aria-current="page">Home</a>
              </li>
              <li class="nav-item">
                <a class="nav-link active" aria-current="page" >About us</a>
              </li>
            </ul>
            <form class="d-flex">

              {logincheck ? <Button variant="contained" endIcon={<SendIcon />}onClick={gotoMybookingsfunction} >
                Check Bookings
              </Button> : ''}

              {!logincheck ? <Button variant="contained" endIcon={<SendIcon />} onClick={handleOpen}>
                Log in
              </Button> : <Button variant="contained" endIcon={<LogoutIcon />} onClick={logutfunction} >
                Logout
              </Button>}


            </form>
          </div>
        </div>
      </nav>
      <img src={MyImage} width="100%"></img>

      <div class="container">
        <div class="row justify-content-md-center">

          <div class="col-md-auto midtitle">
            <h1><BedroomParentIcon fontSize="large" /> Room types</h1>
          </div>

        </div>

        <div class="row align-items-center">
          <div class="col">
            <Card sx={{ maxWidth: 345 }}>
              <CardMedia
                component="img"
                height="140"
                image={oneImage}
                alt="green iguana"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Single Room 
                </Typography>
                <Typography variant="body2" color="text.secondary">
                <h3>1000/= Per Night</h3>
                  Lizards are a widespread group of squamate reptiles, with over 6,000
                  species, ranging across all continents except Antarctica
                </Typography>
              </CardContent>
              <CardActions>
                <Button variant="contained" size="small" onClick={() => bookingModelopen(1)}>Book this room</Button>
              </CardActions>
            </Card>
          </div>
          <div class="col">
            <Card sx={{ maxWidth: 345 }}>
              <CardMedia
                component="img"
                height="140"
                image={twoImage}
                alt="green iguana"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Double Room
                </Typography>
                <Typography variant="body2" color="text.secondary">
                <h3>2000/= Per Night</h3>

                  Lizards are a widespread group of squamate reptiles, with over 6,000
                  species, ranging across all continents except Antarctica
                </Typography>
              </CardContent>
              <CardActions>
                <Button variant="contained" size="small" onClick={() => bookingModelopen(2)}>Book this room</Button>
              </CardActions>
            </Card>
          </div>
          <div class="col">
            <Card sx={{ maxWidth: 345 }}>
              <CardMedia
                component="img"
                height="140"
                image={threeImage}
                alt="green iguana"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Family Room
                </Typography>
                <Typography variant="body2" color="text.secondary">
                <h3>5000/= Per Night</h3>

                  Lizards are a widespread group of squamate reptiles, with over 6,000
                  species, ranging across all continents except Antarctica
                </Typography>
              </CardContent>
              <CardActions>
                <Button variant="contained" size="small" onClick={() => bookingModelopen(3)}>Book this room</Button>
              </CardActions>
            </Card>
          </div>
        </div>

      </div>
      
      {/* model one */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {roomclieked ? <span>Please log in to continue</span> : <span>  Customer Log in </span>}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 4 }}>
            {error ? <Alert variant="filled" className='new' severity="error">
              {errortext}
            </Alert> : ''}
            <div class="mb-3 row">
              <label for="staticEmail" class="col-sm-2 col-form-label">Email</label>
              <div class="col-sm-10">
                <input type="text" readonly class="form-control" value={email} onChange={(e) => setEmail(e.target.value)} />
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
              <div class="col-sm-5">
                <Button variant="contained" onClick={loginfun}>Log in</Button>
              </div>
              <div class="col-sm-3">
                Dont have an account?
              </div>   <div class="col-sm-4">
                <Button variant="outlined" onClick={createnewAcc}>Create New Accout </Button>
              </div>
            </div>
          </Typography>
        </Box>
      </Modal>
      {/* model two  */}
      <Modal
        open={opentwo}
        onClose={handleClosetwo}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {roomclieked ? <span>Please Register to continue</span> : <span>Customer Register</span>}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 4 }}>
            {error ? <Alert variant="filled" className='new' severity="error">
              {errortext}
            </Alert> : ''}
            <div class="mb-3 row">
              <label for="staticEmail" class="col-sm-2 col-form-label">First Name</label>
              <div class="col-sm-10">
                <input type="text" readonly class="form-control" value={firstnamee} onChange={(e) => setFirstname(e.target.value)} />
              </div>
            </div>
            <div class="mb-3 row">
              <label for="staticEmail" class="col-sm-2 col-form-label">Last Name</label>
              <div class="col-sm-10">
                <input type="text" readonly class="form-control" value={lastnamee} onChange={(e) => setLastname(e.target.value)} />
              </div>
            </div>
            <div class="mb-3 row">
              <label for="staticEmail" class="col-sm-2 col-form-label">email</label>
              <div class="col-sm-10">
                <input type="text" readonly class="form-control" value={newEmaile} onChange={(e) => setnewEmail(e.target.value)} />
              </div>
            </div>
            <div class="mb-3 row">
              <label for="staticEmail" class="col-sm-2 col-form-label">Contact Number</label>
              <div class="col-sm-10">
                <input type="text" readonly class="form-control" value={contactNumbere} onChange={(e) => setContactNumber(e.target.value)} />
              </div>
            </div>
            <div class="mb-3 row">
              <label for="inputPassword" class="col-sm-2 col-form-label">Password</label>
              <div class="col-sm-10">
                <input type="password" class="form-control" value={newPassworde}
                  onChange={(e) => setnewPassword(e.target.value)} />
              </div>
            </div>
            <div class="mb-3 row">
              <div class="col-sm-5">
                <Button variant="contained" onClick={registerfun}>Register</Button>
              </div>
              <div class="col-sm-3">
              </div>   <div class="col-sm-4">
              </div>
            </div>
          </Typography>
        </Box>
      </Modal>


      {/* model three hotel room model  */}
      <Modal
        open={openthree}
        onClose={handleClosethree}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {roomtype == "single" ? <span>Single Room Booking </span> : roomtype == "double" ? <span>Double Room Booking </span> : roomtype == "family" ? <span>Family Room Booking </span> : ''}

             hi {loguserName}
          </Typography>

          <Typography id="modal-modal-description" sx={{ mt: 4 }}>
            {error ? <Alert variant="filled" className='new' severity="error">
              {errortext}
            </Alert> : ''}

            {roomtype == "single" ? <img src={oneImage} class="rounded mx-auto d-block" alt="..." /> : roomtype == "double" ? <img src={twoImage} class="rounded mx-auto d-block" alt="..." /> : roomtype == "family" ? <img src={threeImage} class="rounded mx-auto d-block" alt="..." /> : ''}

            <div class="mb-3 row">

            </div>
            <div class="mb-3 row">
              <label for="staticEmail" class="col-sm-2 col-form-label">Bookig Start Date</label>
              <div class="col-sm-10">
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <Stack spacing={3}>
                  <DesktopDatePicker
                      label="Startin Date"
                      inputFormat="MM/DD/YYYY"
                      value={dateOne}
                      onChange={handleChangeOne}
                      renderInput={(params) => <TextField {...params} />}
                    />
                    
               
                   
                  </Stack>
                </LocalizationProvider>      </div>
            </div>
            <div class="mb-3 row">
              <label for="staticEmail" class="col-sm-2 col-form-label">Booking End Date</label>
              <div class="col-sm-10">
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <Stack spacing={3}>
               

                    <DesktopDatePicker
                      label="End Date"
                      inputFormat="MM/DD/YYYY"
                      value={dateTwo}
                      onChange={handleChangetwo}
                      renderInput={(params) => <TextField {...params} />}
                    />
                   
                  </Stack>
                </LocalizationProvider>               </div>
            </div>

            <div class="mb-3 row">
              <label for="staticEmail" class="col-sm-8 col-form-label">Payment Details (*Not Required)</label>
            
            </div>

            <div class="mb-3 row">
              <label for="staticEmail" class="col-sm-2 col-form-label">Card Number</label>
              <div class="col-sm-4">
                <input type="text" readonly class="form-control" onChange={(e) => setPayone(e.target.value)} />
              </div>
              <label for="staticEmail" class="col-sm-2 col-form-label">CVV</label>
              <div class="col-sm-4">
                <input type="text" readonly class="form-control" onChange={(e) => setPaytwo(e.target.value)} />
              </div>
            </div>
            <div class="mb-3 row">
             
            </div>


          
            <div class="mb-3 row">
              <div class="col-sm-5">
                <Button variant="contained" onClick={bookdone}>Book</Button>
              </div>
              <div class="col-sm-3">
              </div>   <div class="col-sm-4">
              </div>
            </div>
          </Typography>
        </Box>
      </Modal>

  {/* model four */}
  <Modal
        open={openfour}
        onClose={handleClosefour}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>

          <Typography id="modal-modal-description" sx={{ mt: 4 }}>
          
          <Alert severity="success">This booking is succesfully done.!</Alert>

          </Typography>
        </Box>
      </Modal>

    </>

  )
}

export default Index