import { useContext, useEffect, useState } from 'react'
import { Container,Form,Button, Row,Card,Modal,Col,Table } from 'react-bootstrap'
import axios from 'axios'
import { useNavigate } from "react-router-dom";
import { Store } from '../Store';
import { FaEdit } from 'react-icons/fa';
import { RiDeleteBin5Fill } from 'react-icons/ri';




const Post = () => {
  const navigate = useNavigate()
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);

  const [posts,setPosts] = useState([])
  console.log(posts);

  const [activity,setActivity] = useState('')
  const [hour,setHour] = useState('')
  const [details,setDetails] = useState('')
  const [proid,setProid] = useState('')

  let handleSubmit = async (e) =>{
    e.preventDefault()
    axios.post('http://localhost:8000/api/posts',{
      activity: activity,
      hour: hour,
      details: details,
      user: userInfo._id
    })
  }
  let handleDelete = (id) =>{
    console.log(id);
    axios.post(`http://localhost:8000/api/posts/del`,{
      id: id
    })
  }

  const handleShow = async (id) =>{
    // console.log(id);
    const {data} = await axios.get(`http://localhost:8000/api/posts/${id}`)
    console.log(data);
    setActivity(data.activity)
    setHour(data.hour)
    setDetails(data.details)
    setProid(data._id)


    setShow(true)
  }
  let handleModalSubmit = async (e) =>{
    e.preventDefault()
    console.log(proid);
    let {data} = await axios.put('http://localhost:8000/api/posts/edit',{
      id: proid,
      activity: activity,
      hour: hour,
      details: details,
    })
    console.log(data);
  }

  useEffect(()=>{
    async function fetchData() {
      let {data} = await axios.get('http://localhost:8000/api/posts')
      setPosts(data);
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
      <Container className='post' style={{marginBottom: 100}} >
        <Row>
          <div style={{display: "flex",marginLeft: 230, marginBottom: 10}}>
            <div>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Control 
                  type="text" 
                  placeholder="Activity Name " 
                  onChange={(e)=> setActivity(e.target.value)}
                  className="postform"
                />
              </Form.Group>
            </div>

            <div>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Control 
                  type="text" 
                  placeholder="Hour take" 
                  onChange={(e)=> setHour(e.target.value)}
                  className="postform"
                />
              </Form.Group>
            </div>
          </div> 
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Control 
              style={{width: 895,height: 150,marginLeft: 231}}
              type="text" 
              placeholder="Activity Details" 
              onChange={(e)=> setDetails(e.target.value)}
              className="postDetails"
            />
          </Form.Group>

          <Button 
            variant="primary" 
            type="submit"
            onClick={handleSubmit}
            className='postbtn'
            style={{marginLeft: 238}}
          >
            Submit
          </Button>
        </Row>
      </Container>

      <Container>
        <Row className='post' style={{display: "flex",width: "100%",marginLeft: "95px"}}>
          <>
            <Card style={{background: "#023A92"}} className='postcard' >
              <Card.Body>
                <Card.Title className='headtxt'>
                Batch
                </Card.Title>
              </Card.Body>
            </Card>
            <Card style={{background: "#023A92"}} className='postcard'>
              <Card.Body>
                <Card.Title className='headtxt'>
                Activity
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
            <br/>
          </>
          {posts.map((item)=>(
            userInfo._id == item.user &&
            <>
              <Card style={{background: "#7968DC"}} className='postcard' >
                <Card.Body>
                  <Card.Title className='txt'>
                  {item.activity}
                  </Card.Title>
                </Card.Body>
              </Card>
              <Card style={{background: "#7968DC"}} className='postcard'>
                <Card.Body>
                  <Card.Title className='txt'>
                  {item.hour}
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
            <Modal.Title style={{marginLeft: 50,marginTop: 25}}>
              <h4>Edit Employee Info</h4>
            </Modal.Title>
          <Modal.Body className='mdl'>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Control 
                type="text" 
                placeholder="Activity Name " 
                onChange={(e)=> setActivity(e.target.value)}
                className="formModal"
                value={activity}
              />
            </Form.Group>
          
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Control 
                type="text" 
                placeholder="Hour take" 
                onChange={(e)=> setHour(e.target.value)}
                className="formModal"
                value={hour}
              />
            </Form.Group>
          
            <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Control 
              style={{
                width: "400x",
                height: "150px",
              }}
              type="text" 
              placeholder="Activity Details" 
              onChange={(e)=> setDetails(e.target.value)}
              className="formModal"
              value={details}
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

export default Post