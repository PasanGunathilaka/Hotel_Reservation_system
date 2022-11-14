import React, { useState, useEffect } from 'react';

import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import Box from '@mui/material/Box';
 import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

function Index() {
  const [bookingdata, setBookingdata] = useState([]);
  const [idofcus, setidofcus] = useState('');
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  let navigate = useNavigate();

  //onload function

  React.useEffect(() => {
    logincheck();

    getbookingData();


  }, []);

  // checking weather login or not

  // checking login
  const logincheck = () => {
    var personName = sessionStorage.getItem("user_id");
    setidofcus(personName);
    if (!personName) {
      let path = `/`;
      navigate(path);
    } else {


    }
  };

  // getting booking data


  const getbookingData = () => {
    axios.get(`http://localhost:5000/booking/getBookings`)
      .then(res => {
        setBookingdata(res.data.Bookings)
        console.log(bookingdata);
      })
  };


  // logout function
  const logutfunction = () => {
    sessionStorage.clear();

    let path = `/`;
    navigate(path);

  };

  //deletebooking function
  const deletebooking = (_id) => {

    const newdelete = {
      _id
    }

    axios.post(`http://localhost:5000/booking/deletBooking`, newdelete)
      .then(res => {
        if (res.status == 400) {
          console.log("Plaese check username and password")
        } else if (res.status == 201) {

          getbookingData();


        }
      })
      .catch(error => {
        console.log("error while deleting")
      });



  };

   //deletebooking function
   const editbooking = (_id) => {
    handleOpen();
     alert(_id);



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

              <Button variant="contained" endIcon={<SendIcon />}>
                Check Bookings
              </Button>

              <Button variant="contained" endIcon={<LogoutIcon />} onClick={logutfunction} >
                Logout
              </Button>


            </form>
          </div>
        </div>
      </nav>
      <div class="container">
        <div class="row  ">
          <div class="col col-lg-10">
            <h2>My Bookings</h2>
            <table class="table">
              <thead>
                <tr>
                  {/* <th scope="col">#</th> */}
                  <th scope="col">Booking ID</th>
                  <th scope="col">Room Type</th>

                  <th scope="col">Payement Status</th>

                  <th scope="col">Booking Started Date</th>
                  <th scope="col">Booking End Date</th>
                  <th scope="col">Cancle The Booking</th>
 
                </tr>
              </thead>
              <tbody>




                {/* {
          bookingdata
            .map(dataa =>
              
              <tr  key={dataa._id}>
              <td>{dataa.paymentStatus}</td>
              <td>{dataa.bookingenddate}</td>
              <td>{dataa.contactNumberofcustomer}</td>
              </tr>
            )
          }
           */}

                {bookingdata.map((data, index) => {

                  if (data.customerID == idofcus) {

                    return (

                      <tr key={data._id}>
                        {/* <td>{++index}</td> */}
                        <td>{data._id}</td>
                        <td>{data.roomID}</td>
                        <td>{data.paymentStatus}</td>
                        <td>{data.bookingstartdate}</td>

                        <td>{data.bookingenddate}</td>
                        <td><button type="button" class="btn btn-danger" onClick={() => deletebooking(data._id)}>Cancle</button>
                        </td>
                      

                      </tr>


                    );
                  }

                })}





              </tbody>
            </table>
            <ul>
              {/* {
          bookingdata
            .map(person =>
              <li key={person.paymentStatus}>{person.paymentStatus}</li>
            )
        } */}
            </ul>
          </div>


        </div>

      </div>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Edit This
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </Typography>
        </Box>
      </Modal>


    </>
  )
}

export default Index