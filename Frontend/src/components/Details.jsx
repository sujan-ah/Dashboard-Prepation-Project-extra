import { useEffect, useState,useContext } from 'react'
import { Container,Form,Button, Row,Card,Modal,Col,Table, CardImg } from 'react-bootstrap'
import axios from 'axios'
import { useNavigate } from "react-router-dom";
import { Store } from "../Store.js";
import { FaEdit } from 'react-icons/fa';
import { RiDeleteBin5Fill } from 'react-icons/ri';


const Details = () => {
  const navigate = useNavigate()
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);

  const [details,setDetails] = useState([])

  const [name,setName] = useState('')
  const [designation,setDesignation] = useState('')
  const [officetime,setOfficetime] = useState('')
  const [dayoff,setOffday] = useState('')
  const [proid,setProid] = useState('')

  let handleSubmit = async (e) =>{
    e.preventDefault()
    axios.post('http://localhost:8000/api/details',{
      name: name,
      designation: designation,
      officetime: officetime,
      dayoff: dayoff,
      user: userInfo._id
    })
  }
  let handleDelete = (id) =>{
    console.log(id);
    axios.post(`http://localhost:8000/api/details/del`,{
      id: id
    })
  }

  const handleShow = async (id) =>{
    // console.log(id);
    const {data} = await axios.get(`http://localhost:8000/api/details/${id}`)
    setShow(true)

    setName(data.name)
    setDesignation(data.designation)
    setOfficetime(data.officetime)
    setOffday(data.dayoff)
    
    setProid(data._id)
  }
  let handleModalSubmit = async (e) =>{
    e.preventDefault()
    setShow(false)
    console.log(proid);
    let {data} = await axios.put('http://localhost:8000/api/details/edit',{
      id: proid,
      name: name,
      designation: designation,
      officetime: officetime,
      dayoff: dayoff,
    })
    console.log(data);
  }

  useEffect(()=>{
    async function fetchData() {
      let {data} = await axios.get('http://localhost:8000/api/details')
      setDetails(data);
    }
    fetchData()
  },[])

  const {state,dispatch} = useContext(Store)
  const {userInfo} = state

  useEffect(() => { /* video no: 36 */ 
  if(!userInfo){
    navigate('/signin')
  }
  }, [])

  return (
    <Container>
      <Row>
        <Container style={{marginBottom: 100}}>
          <Row className='Form'>
          <div style={{display: "flex",marginLeft: 450, marginBottom: 10}}>
            <div>
              <Form.Group className="form" controlId="formBasicEmail">
              <Form.Control 
                type="text" 
                className="form"
                placeholder="Name" 
                onChange={(e)=> setName(e.target.value)}
              />
              </Form.Group>
              <Form.Group controlId="formBasicEmail">
                <Form.Control 
                  type="text" 
                  className="form"
                  placeholder="Designation" 
                  onChange={(e)=> setDesignation(e.target.value)}
                />
              </Form.Group>
            </div> 
            <div>
              <Form.Group controlId="formBasicEmail">
                <Form.Control 
                  type="text" 
                  className="form"
                  placeholder="Office Time" 
                  onChange={(e)=> setOfficetime(e.target.value)}
                />
              </Form.Group>
              <Form.Group controlId="formBasicEmail">
                <Form.Control 
                  type="text" 
                  className="form"
                  placeholder="Offday" 
                  onChange={(e)=> setOffday(e.target.value)}
                />
              </Form.Group>
            </div>
          </div>
          <Button 
            variant="primary" 
            className='button'
            style={{marginLeft: 463}}
            type="submit"
            onClick={handleSubmit}
          >
            Submit
          </Button>
          </Row>
        </Container>

        <Container>
          <Row style={{display: "flex", width: "100%",    marginLeft: "112px"}}>
            <>
              <Card style={{background: "#023A92"}} className='card' >
                <Card.Body>
                  <Card.Title className='headtxt'>
                    Name
                  </Card.Title>
                </Card.Body>
              </Card>
              <Card style={{background: "#023A92"}} className='card'>
                <Card.Body>
                  <Card.Title className='headtxt'>
                    Designation
                  </Card.Title>
                </Card.Body>
              </Card>
              <Card style={{background: "#023A92"}} className='card'>
                <Card.Body>
                  <Card.Title className='headtxt' >
                    Officetime
                  </Card.Title>
                </Card.Body>
              </Card>
              <Card style={{background: "#023A92"}} className='card'>
                <Card.Body>
                  <Card.Title className='headtxt'>
                    Offday
                  </Card.Title>
                </Card.Body>
              </Card>
              <Card style={{background: "#023A92"}} className='cardact' >
                <Card.Body>
                  <Card.Title className='headact'>
                  Action
                  </Card.Title>
                </Card.Body>
              </Card>
              <br/>
            </>
            <br/>

            {details.map((item)=>(
              userInfo._id == item.user &&
              <>
               <Card style={{background: "#7968DC"}} className='card' >
                  <Card.Body>
                    <Card.Title className='txt'>
                      {item.name}
                    </Card.Title>
                  </Card.Body>
                </Card>
                <Card style={{background: "#7968DC"}} className='card'>
                  <Card.Body>
                    <Card.Title className='txt'>
                      {item.designation}
                    </Card.Title>
                  </Card.Body>
                </Card>
                <Card style={{background: "#7968DC"}} className='card'>
                  <Card.Body>
                    <Card.Title className='txt'>
                      {item.officetime}
                    </Card.Title>
                  </Card.Body>
                </Card>
                <Card style={{background: "#7968DC"}} className='card'>
                  <Card.Body>
                    <Card.Title className='txt'>
                      {item.dayoff}
                    </Card.Title>
                  </Card.Body>
                </Card>
                
                <Button 
                  variant="primary" 
                  type="submit"
                  onClick={()=> handleShow(item._id)}
                  style={{marginRight: 10,background: "#3F0082"}}
                  className='delDetails'
                  
                >
                  <FaEdit/>
                </Button>
                <Button 
                  variant="danger"
                  type="submit"
                  onClick={()=>handleDelete(item._id)}
                  className='delDetails'
                  style={{background: "#3F0082"}}
                >
                  <RiDeleteBin5Fill/>
                </Button>
                <br/>
              </>
            ))} 
          </Row>

          <Row>
          <Modal show={show} onHide={handleClose}>
          
            <Modal.Title style={{marginLeft: 50,marginTop: 25}}>
              <h4>Edit Employee Info</h4>
            </Modal.Title>
          
          <Modal.Body className='mdl'>
            <Form.Group  controlId="formBasicEmail">
            <Form.Control 
              type="text" 
              className="formModal"
              placeholder="Name" 
              onChange={(e)=> setName(e.target.value)}
              value={name}
            />
            </Form.Group>
            <Form.Group controlId="formBasicEmail">
              <Form.Control 
                type="text" 
                className="formModal"
                placeholder="Designation" 
                onChange={(e)=> setDesignation(e.target.value)}
                value={designation}
              />
            </Form.Group>
            <Form.Group controlId="formBasicEmail">
              <Form.Control 
                type="text" 
                className="formModal"
                placeholder="Office Time" 
                onChange={(e)=> setOfficetime(e.target.value)}
                value={officetime}
              />
            </Form.Group>
            <Form.Group controlId="formBasicEmail">
              <Form.Control 
                type="text" 
                className="formModal"
                placeholder="Offday" 
                onChange={(e)=> setOffday(e.target.value)}
                value={dayoff}
              />
            </Form.Group>

            <Button 
              variant="primary" 
              type="submit"
              onClick={handleModalSubmit}
              className='btnMdl'
              style={{background: "#7968DC"}}
            >
              Submit
            </Button>
            <Button 
              variant="secondary" 
              onClick={handleClose}
              className='ms-2 btnMdl'
              style={{background: "#3F0082"}}
            >
              Close
            </Button>
          </Modal.Body>
          </Modal>
        </Row>
        </Container>
    </Row>
    </Container>
    
  )
}

export default Details