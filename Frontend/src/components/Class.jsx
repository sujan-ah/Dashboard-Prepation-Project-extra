import { useContext, useEffect, useState } from 'react'
import { Container,Form,Button, Row,Card,Modal,Col,Table } from 'react-bootstrap'
import axios from 'axios'
import { useNavigate } from "react-router-dom";
import { Store } from '../Store'
import { FaEdit } from 'react-icons/fa';
import { RiDeleteBin5Fill } from 'react-icons/ri';


const Class = () => {
  const navigate = useNavigate()
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);

  const [classes,setClasses] = useState([])
  console.log(classes);

  const [batch,setBatch] = useState('')
  const [time,setTime] = useState('')
  const [room,setRoom] = useState('')
  const [proid,setProid] = useState('')


  let handleSubmit = async (e) =>{
    e.preventDefault()
    axios.post('http://localhost:8000/api/classes',{
      batch: batch,
      time: time,
      room: room,
      user: userInfo._id
    })
  }

  let handleDelete = (id) =>{
    console.log(id);
    axios.post(`http://localhost:8000/api/classes/del`,{
      id: id
    })
  }

  const handleShow = async (id) =>{
    // console.log(id);
    const {data} = await axios.get(`http://localhost:8000/api/classes/${id}`)
    console.log(data);
    setBatch(data.batch)
    setTime(data.time)
    setRoom(data.room)
    setProid(data._id)


    setShow(true)
  }
  let handleModalSubmit = async (e) =>{
    e.preventDefault()
    console.log(proid);
    let {data} = await axios.put('http://localhost:8000/api/classes/edit',{
      id: proid,
      batch: batch,
      time: time,
      room: room,
    })
    console.log(data);
  }

  useEffect(()=>{
    async function fetchData() {
      let {data} = await axios.get('http://localhost:8000/api/classes')
      setClasses(data);
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
    <>
      <Container style={{marginBottom: 100}} className='mt-5'>
        <Row>
          <div style={{display: "flex",marginLeft: 315, marginBottom: 10}}>
            <div>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Control 
                  type="text" 
                  placeholder="Batch" 
                  onChange={(e)=> setBatch(e.target.value)}
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

            <div>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Control 
                  type="text" 
                  placeholder="room" 
                  onChange={(e)=> setRoom(e.target.value)}
                  className="form"
                />
              </Form.Group>
            </div>
        </div> 
        
        <Button 
          variant="primary" 
          type="submit"
          onClick={handleSubmit}
          className='button'
          style={{marginLeft: 330, width: 760}}
        >
          Submit
        </Button>
        </Row>
      </Container>

      <Container className='mt-5'>
          <Row style={{display: "flex", width: "80%", marginLeft: "270px"}}>
             <>
               <Card style={{background: "#023A92"}} className='card' >
                  <Card.Body>
                    <Card.Title className='headtxt'>
                    Batch
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
                <Card style={{background: "#023A92"}} className='card'>
                  <Card.Body>
                    <Card.Title className='headtxt' >
                    Room
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

              {classes.map((item)=>(
                userInfo._id == item.user &&
              <>
               <Card style={{background: "#7968DC"}} className='card' >
                  <Card.Body>
                    <Card.Title className='txt'>
                    {item.batch}
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
                <Card style={{background: "#7968DC"}} className='card'>
                  <Card.Body>
                    <Card.Title className='txt'>
                    {item.room}
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
            <Modal.Title style={{marginLeft: 50,marginTop: 25}}>
              Edit Today's Class
            </Modal.Title>
          <Modal.Body className='mdl'>
            <Form.Group controlId="formBasicEmail">
              <Form.Control 
                type="text" 
                placeholder="Batch" 
                onChange={(e)=> setBatch(e.target.value)}
                className="formModal"
                value={batch}
              />
            </Form.Group>
          
            <Form.Group controlId="formBasicEmail">
              <Form.Control 
                type="text" 
                placeholder="Time" 
                onChange={(e)=> setTime(e.target.value)}
                className="formModal"
                value={time}
              />
            </Form.Group>
          
            <Form.Group controlId="formBasicEmail">
              <Form.Control 
                type="text" 
                placeholder="room" 
                onChange={(e)=> setRoom(e.target.value)}
                className="formModal"
                value={room}
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
    </>
  )
}

export default Class