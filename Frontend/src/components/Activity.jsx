import { useContext, useEffect, useState } from 'react'
import { Container,Form,Button, Row,Card,Modal,Col,Table } from 'react-bootstrap'
import axios from 'axios'
import { useNavigate } from "react-router-dom";
import { Store } from '../Store';
import { FaEdit } from 'react-icons/fa';
import { RiDeleteBin5Fill } from 'react-icons/ri';


const Activity = () => {
  const navigate = useNavigate()
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);

  const [activities,setActivites] = useState([])
  // console.log(activities);

  const [name,setName] = useState('')
  const [time,setTime] = useState('')
  const [details,setDetails] = useState('')
  const [proid,setProid] = useState('')

  let handleSubmit = async (e) =>{
    e.preventDefault()
    axios.post('http://localhost:8000/api/activities',{
      name: name,
      time: time,
      details: details,
      user: userInfo._id
    })
  }
  let handleDelete = (id) =>{
    // console.log(id);
    axios.post(`http://localhost:8000/api/activities/del`,{
      id: id
    })
  }

  
  const handleShow = async (id) =>{
    // console.log(id);
    const {data} = await axios.get(`http://localhost:8000/api/activities/${id}`)
    console.log(data);
    setName(data.name)
    setTime(data.time)
    setDetails(data.details)
    setProid(data._id)


    setShow(true)
  }
  let handleModalSubmit = async (e) =>{
    e.preventDefault()
    console.log(proid);
    let {data} = await axios.put('http://localhost:8000/api/activities/edit',{
      id: proid,
      name: name,
      time: time,
      details: details,
    })
    console.log(data);
  }
  
  useEffect(()=>{
    async function fetchData() {
      let {data} = await axios.get('http://localhost:8000/api/activities')
      setActivites(data);
    }
    fetchData()
  },[])


  

  

  const {state,dispatch} = useContext(Store)
  const {userInfo} = state
  // console.log(userInfo._id);

  useEffect(() => {
  if(!userInfo){
    navigate('/signin')
  }
  }, [])


  return (
    <>
      <Container style={{marginBottom: 100}} className='mt-5'>
      <Row>
        <div style={{display: "flex",marginLeft: 480, marginBottom: 10}}>
          <div>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Control 
                type="text" 
                placeholder="Name" 
                onChange={(e)=> setName(e.target.value)}
                className="form"
              />
            </Form.Group>
          </div> 

          <div>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Control 
                type="text" 
                placeholder="Time" 
                onChange={(e)=> setTime(e.target.value)}
                className="form"
              />
            </Form.Group>
          </div> 
          
        </div>
        <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Control 
                type="text" 
                placeholder="Details" 
                onChange={(e)=> setDetails(e.target.value)}
                className="formDtals"
              />
            </Form.Group>
          <Button 
            variant="primary" 
            type="submit"
            onClick={handleSubmit}
            style={{marginLeft: 495, width: 495}}
            className='button'
          >
            Submit
          </Button>
      </Row>
      </Container>

      <Container className='mt-5 active'>
        <Row style={{display: "flex", width: "100%", marginLeft: "100px"}}>
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
                Time
                </Card.Title>
              </Card.Body>
            </Card>
            <Card style={{background: "#023A92"}} className='postcardDtails'>
              <Card.Body>
                <Card.Title className='headtxt' >
                Details
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
          </>

          {activities.map((item)=>(
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
                {item.time}
                </Card.Title>
              </Card.Body>
            </Card>
            <Card style={{background: "#7968DC"}} className='postcardDtails'>
              <Card.Body>
                <Card.Title className='txt'>
                {item.details}
                </Card.Title>
              </Card.Body>
            </Card>
            <br/>

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
        
          </>
          ))} 

        </Row>

        <Row>
          <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Modal heading</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Control 
                type="text" 
                placeholder="Name" 
                onChange={(e)=> setName(e.target.value)}
                className="form"
                value={name}
              />
            </Form.Group>
          
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Control 
                type="text" 
                placeholder="Time" 
                onChange={(e)=> setTime(e.target.value)}
                className="form"
                value={time}
              />
            </Form.Group>
          
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Control 
                type="text" 
                placeholder="Details" 
                onChange={(e)=> setDetails(e.target.value)}
                className="form"
                value={details}
              />
            </Form.Group>

            <Button 
              variant="primary" 
              type="submit"
              onClick={handleModalSubmit}
            >
              Submit
            </Button>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={handleClose}>
              Save Changes
            </Button>
          </Modal.Footer>
          </Modal>
        </Row>
      </Container>
    </>
    
  )
}

export default Activity