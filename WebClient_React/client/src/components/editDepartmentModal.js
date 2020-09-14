import React, { Component } from 'react';
import {Row, Col} from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import {baseUrl} from '../utils/settings';

function EditDepartmentModal(props) {
    let handleSubmit = (event) => {
        event.preventDefault();
        if(event.target.name.value.length > 0 && event.target.name.value.length >0){
            fetch(baseUrl + '/departments/update',{
                method: 'POST',
                headers: {
                    'Accept':'application/json',
                    'Content-Type':'application/json',
                },
                body:JSON.stringify( {
                    id: props.department.id,
                    name: event.target.name.value,
                    mainLocation: event.target.mainLocation.value
                })
            }).then(res => res.json())
            .then((result)=> {
               alert(result);
               props.onHide();
            }, (error) => {
                alert(error);
                props.onHide();
            });
        } else {
            alert("Name/MainLocation cannot be empty!");
        }
        
    }
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Edit Department
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="container">
              <Row>
                <Col sm={6}>
                    <Form onSubmit={(event) => handleSubmit(event)}>
                        <Form.Group controlId="name">
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="text" defaultValue={props.department.name}  name="name" required placeholder="Some Name" />
                        </Form.Group>
                        <Form.Group controlId="mainLocation">
                            <Form.Label>MainLocation</Form.Label>
                            <Form.Control type="text" defaultValue={props.department.mainLocation} name="mainLocation" required placeholder="Some Location" />
                        </Form.Group>
                        <Form.Group>
                            <Button varian="primary" type="submit">Save</Button>
                        </Form.Group>
                    </Form>
                </Col>
              </Row>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }

export default EditDepartmentModal;