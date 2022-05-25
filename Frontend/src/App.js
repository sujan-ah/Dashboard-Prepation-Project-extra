import { BrowserRouter, Routes, Route,Link,useNavigate } from "react-router-dom";
import { Container,Navbar,Nav,NavDropdown,Card,Col,Tab,Row } from 'react-bootstrap'
import Details from './components/Details';
import Class from "./components/Class";
import Post from "./components/Post";
import Activity from "./components/Activity";
import Login from "./Auth/Login";
import Signup from "./Auth/signup";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useContext, useEffect } from "react";
import { Store } from "./Store";
import imgData from "./imgData";



function App() {
  const {state,dispatch} = useContext(Store)
  const {userInfo} = state
  console.log(userInfo);

  let handleLogout = () =>{
    dispatch({type: "USER_LOGOUT"})
    localStorage.removeItem("userInfo")
  }


  return (
    <Tab.Container id="left-tabs-example" defaultActiveKey="first">
      
      <BrowserRouter>
      
      <ToastContainer position="bottom-center" limit={1} />
        {userInfo 
        ?
          <>
            <Row style={{height: 950, }}>
              <Col sm={3} className="list">
                <div className='dealbox' style={{backgroundImage: `url(${imgData.img})`}}>
                </div> 
                <span style={{marginTop: 20}} className="upadhi2">
                  <b style={{marginLeft: 22}} className="upadhi">Name: </b> A B M Shawon Islam <br/>
                  <b className="upadhi">Designation: </b>MERN Stack Developer<br/>
                  <b className="upadhi">Office Time: </b>11am - 8pm<br/>
                  <b className="upadhi">Offday: </b>Sunday
                </span>

                <Nav variant="pills" className="flex-column">
                  
                  <div style={{marginTop: 64}}>
                    <Link className="item" to="/details">
                      <h3 className="menu" style={{marginBottom: 30}}>
                        Emplyee List
                      </h3>
                    </Link>

                    <Link className="item" to="/class">
                      <h3 className="menu"  style={{marginBottom: 20}}>
                        Today's Class
                      </h3>
                    </Link>

                    <Link className="item" to="/post">
                      <h3 className="menu"  style={{marginBottom: 20}}>
                        Post Activity
                      </h3>
                    </Link>

                    <Link className="item" to="/activity">
                      <h3 className="menu"  style={{marginBottom: 20}}>
                        Activity List
                      </h3>
                    </Link>
                  </div>
                
                </Nav>
              </Col>
              <Col sm={9}>
                <span style={{color: "#fff", marginTop: 50}}>
                  <NavDropdown 
                    title={userInfo.name} 
                    id="basic-nav-dropdown"
                  > 
                    <NavDropdown.Item 
                      onClick={handleLogout}
                    >
                      Logout
                    </NavDropdown.Item>
                  </NavDropdown>
                </span>
                <Routes>
                  <Route path="/details" element={<Details />} />
                  <Route path="/class" element={<Class />} />
                  <Route path="/post" element={<Post />} />
                  <Route path="/activity" element={<Activity />} />
                  <Route path="/signin" element={<Login />} />
                  <Route path="/" element={<Signup />} />
                </Routes>
              </Col>
            </Row>
          </>
          :
          <Routes>
            <Route path="/details" element={<Details />} />
            <Route path="/class" element={<Class />} />
            <Route path="/post" element={<Post />} />
            <Route path="/activity" element={<Activity />} /> 
            <Route path="/signin" element={<Login />} />
            <Route path="/" element={<Signup />} />
          </Routes>
        }
      </BrowserRouter>
    </Tab.Container>
  );
}

export default App;
