import * as React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MailIcon from '@mui/icons-material/Mail';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { useNavigate } from "react-router-dom";
import Button from '@mui/material/Button';
import axios from 'axios';
import { PieChart } from 'react-minimal-pie-chart';
import './styles.css';

const drawerWidth = 240;

function ResponsiveDrawer(props) {

  let navigate = useNavigate();


  const routeChange = () => {
    let path = `/admindashboard`;
    navigate(path);
  }

  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [bookingdata, setBookingdata] = React.useState([]);
  const [custdata, setCustdata] = React.useState([]);

  const [idofcus, setidofcus] = React.useState('');
  const [clickedBut, setclickedBut] = React.useState('Bookings');

  const [paymentdone, setPaymentdone] = React.useState(0);
  const [paymentpending, setPaymentpending] = React.useState(0);

  React.useEffect(() => {
    logincheck();
    getbookingData();
    getcstomersData();
    getpayementstatusdata();   

  }, []);

  // checking login
  const logincheck = () => {
    let personName = sessionStorage.getItem("admin");
    if (!personName) {
      let path = `/`;
      navigate(path);
    } else {
      console.log(personName);

    }
  };

  // get booking data
  const getbookingData = () => {
    axios.get(`http://localhost:5000/booking/getBookings`)
      .then(res => {
        setBookingdata(res.data.Bookings)
        console.log(bookingdata);
      })
  };


  // get customers data
  const getcstomersData = () => {
    axios.get(`http://localhost:5000/customer/getcustomers`)
      .then(res => {
        setCustdata(res.data.customers)
        console.log(custdata);
      })
  };

  // logout function
  const logutfunction = () => {
    sessionStorage.clear();

    let path = `/`;
    navigate(path);


  };

  //getpayementstatusdata
  const getpayementstatusdata = () => {

    let num = 0;
    let numtwo = 0;

    bookingdata.map((data, index) => {

      if (data.paymentStatus == "pending") {
        num = num + 1;
      } else {
        numtwo = numtwo + 1

      }

    })
    setPaymentpending(num);

    setPaymentdone(numtwo);

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
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  // side bar nav item

  const sidebarClick = (text) => { 
    setclickedBut(text);
  };


  const drawer = (
    <div>
      <Toolbar />
      <Divider />
      <List>
        {['Bookings', 'Customers', 'Admins', 'Reports'].map((text, index) => (
          <ListItem key={text} disablePadding onClick={() => sidebarClick(text)}>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />

    </div>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <>  <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            News
          </Typography>
          <Button color="inherit" onClick={logutfunction}>Logout</Button>
        </Toolbar>
      </AppBar>
    </Box>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />

        <Box
          component="nav"
          sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
          aria-label="mailbox folders"
        >
          {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
          <Drawer
            container={container}
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
            sx={{
              display: { xs: 'block', sm: 'none' },
              '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
            }}
          >
            {drawer}
          </Drawer>
          <Drawer
            variant="permanent"
            sx={{
              display: { xs: 'none', sm: 'block' },
              '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
            }}
            open
          >
            {drawer}
          </Drawer>
        </Box>
        <Box
          component="main"
          sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
        >
          <Toolbar />
          {clickedBut == 'Bookings' ? <div class="container">
            <div class="row  ">
              <div class="col col-lg-8">
                <h2>All Bookings</h2>
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



                    {bookingdata.map((data, index) => {



                      return (

                        <tr key={data._id}>
                          {/* <td>{++index}</td> */}
                          <td>{data._id}</td>
                          <td>{data.roomID}</td>
                          <td>{data.paymentStatus}</td>
                          <td>{data.paymentStatus}</td>

                          <td>{data.bookingstartdate}</td>

                          <td>{data.bookingenddate}</td>
                          <td><button type="button" class="btn btn-danger" onClick={() => deletebooking(data._id)}>Cancle</button>
                          </td>

                        </tr>


                      );


                    })}







                  </tbody>
                </table>

              </div>


            </div>

          </div> : clickedBut == 'Customers' ? <div class="container">
            <div class="row  ">
              <div class="col col-lg-8">
                <h2>All Customers</h2>
                <table class="table">
                  <thead>
                    <tr>
                      {/* <th scope="col">#</th> */}
                      <th scope="col">ID</th>
                      <th scope="col">Full Name</th>
                      <th scope="col">Email</th>

                      <th scope="col">Contact Number</th>



                    </tr>
                  </thead>
                  <tbody>



                    {custdata.map((data, index) => {
                      return (

                        <tr key={data._id}>
                          {/* <td>{++index}</td> */}
                          <td>{data._id}</td>
                          <td>{data.firstName + " " + data.lastName}</td>
                          <td>{data.email}</td>
                          <td>{data.contactNumber}</td>



                        </tr>


                      );

                    })}


                  </tbody>
                </table>

              </div>


            </div>

          </div> : clickedBut == 'Reports' ? <>
            <div class="row ">
              <div class="col col-lg-3">
              <button type="button" className="btn btn-lg done">Payment Done: {paymentdone} </button>

              </div>
              <div class="col col-lg-3">
              <button type="button" className="btn   btn-lg pending">Payemnt Pending : {paymentpending} </button>

              </div>
            </div>
            <div class="row ">
              <div class="col col-lg-5">

              <PieChart
                  data={[
                    { title: 'One', value: paymentdone, color: 'blue', },
                    { title: 'Two', value: paymentpending, color: 'gray' },

                  ]}
                />
              </div>
            </div></> : ''}









        </Box>
      </Box>
    </>
  );
}

ResponsiveDrawer.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default ResponsiveDrawer;
