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


function App() {
  // const navigate = useNavigate()

  const {state,dispatch} = useContext(Store)
  const {userInfo} = state

  let handleLogout = () =>{
    dispatch({type: "USER_LOGOUT"})
    localStorage.removeItem("userInfo")
    // navigate('/signin')
  }


  return (
    <Tab.Container id="left-tabs-example" defaultActiveKey="first">
      
      <BrowserRouter>
      
      <ToastContainer position="bottom-center" limit={1} />
        {userInfo 
        ?
          // userInfo == userInfo._id &&
        
          <>
            <Row style={{height: 950, }}>
              <Col sm={3} className="list">
                <Nav variant="pills" className="flex-column">
                  <h3 style={{color: "#fff", marginTop: 150}}>
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
                  </h3>
                  <div style={{marginTop: 50}}>
                    <Link className="item" to="/details">
                      <h3 className="menu" style={{marginBottom: 20}}>
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
