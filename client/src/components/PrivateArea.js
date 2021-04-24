import React, { useState } from 'react'
import { connect } from 'react-redux';
import Button from 'react-bootstrap/esm/Button';
import Modal from 'react-bootstrap/Modal'
import NavBarComponent from './NavBarComponent';
import Card from 'react-bootstrap/Card'
import CardDeck from 'react-bootstrap/Card'

const PrivateArea = (props) => {
    const [urlInput, setUrleInput] = useState("")
    const [titleInput, setTitleInput] = useState("")
    // const [dateInput, setdateInput] = useState("")
    const [show, setShow] = useState(false);
    const [apiHistory, setApiHistory] = useState(0)
    const [uploads, setUploads] = useState(0)
    const token = props.auth.stsTokenManager.accessToken;

    const handleClose = () => {
        setShow(false)
        const token = props.auth.stsTokenManager.accessToken
        var imgData = JSON.stringify({ "title": `${titleInput}`, "url": `${urlInput}` });
        var requestOptions = {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: imgData
        };

        fetch(`http://localhost:8080/upload/uploadImg`, requestOptions)
            .then(
                response => {
                    debugger
                    response.text()
                })
            .catch(error => console.log('error', error));
    };
    function getHistoryApiForUser() {
        fetch('http://localhost:8080/picture/getHistoryApiForUser', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        }).then(
            (data) => data.json().then((data) => {
                debugger
                setApiHistory(data)
                console.log(apiHistory["apiHistory"])
            }).catch(err => { return err })
        )
    }
    function getMyUploads() {
        fetch('http://localhost:8080/upload/getMyUploads', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        }).then(
            (data) => data.json().then((data) => {
                debugger
                setUploads(data)
                console.log(uploads)
            }).catch(err => { return err })
        )
    }
    function upLoadImg(event) {
        debugger
        var fileReader = new FileReader()
        fileReader.onload = ((e) => {
            setUrleInput(e.target.result);
        })
        setUrleInput(fileReader.readAsDataURL(event.target.files[0]))

    }
    // const firebase = useFirebase()
    return (
        <div >
            <NavBarComponent></NavBarComponent>
            <div className="d-flex justify-content-center">
                <Button variant="primary mr-md-2" onClick={() => setShow(true)}>
                    Add image
                </Button>
                <Button onClick={getHistoryApiForUser}>get my history api</Button>
                <Button onClick={getMyUploads}>get my Uploads</Button>

            </div>
            <Modal show={show} onHide={() => setShow(false)} animation={false}>
                <Modal.Header closeButton>
                    <Modal.Title >Add New Image</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <br></br>
                    <input type="file" accept="url" onChange={upLoadImg} />
                    <br></br>

                    <div className="input-group mb-3">
                        Enter title:
                        <input type="text" className="form-control mb-3" onChange={(e) => setTitleInput(e.target.value)}></input>
                    </div>

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShow(false)}>
                        Close
                   </Button>
                    <Button variant="primary" onClick={handleClose}>
                        Save Changes
                   </Button>
                </Modal.Footer>
            </Modal>
            <div className="row">
                {
                    uploads.uploads ?
                        <>
                            <h1 className="content-center">  My Images  </h1><br></br>
                            {uploads.uploads.map((item, index) =>
                                <CardDeck key={index}>
                                    <Card className="p-3" variant="top" style={{ width: '18rem' }}>
                                        <Card.Img variant="top" src={`${item.url}`} />
                                        <Card.Body>
                                            <Card.Title>{item.title}</Card.Title>
                                        </Card.Body>
                                    </Card>
                                </CardDeck>

                            )
                            }
                        </>
                        : ""
                }
            </div>


            {/* <div className="row">
                {
                    uploads.uploads ?
                        <>
                            <h1 className="content-center">  My Images  </h1><br></br>
                            {uploads.uploads.map((item, index) =>
                                <CardDeck key={index}>
                                    <Card className="p-3" variant="top" style={{ width: '18rem' }}>
                                        <Card.Img variant="top" src={`${item.url}`} />
                                        <Card.Body>
                                            <Card.Title>{item.title}</Card.Title>
                                        </Card.Body>
                                    </Card>
                                </CardDeck>

                            )
                            }
                        </>
                        : ""
                }
            </div> */}


        </div>
    )
}

const enhance = connect(
    // Map redux state to component props
    ({ firebase: { auth, profile } }) => ({
        auth,
        profile
    })
)(PrivateArea)


export default enhance