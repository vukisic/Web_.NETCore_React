import React, { Component } from 'react';
import {Row, Col} from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import {baseUrl} from '../utils/settings';

function EditEmployeeModal(props) {
    let handleSubmit = (event) => {
        event.preventDefault();
        if(event.target.firstName.value.length > 0 && event.target.lastName.value.length >0){
            fetch(baseUrl + '/employees/update',{
                method: 'POST',
                headers: {
                    'Accept':'application/json',
                    'Content-Type':'application/json',
                },
                body:JSON.stringify( {
                    id: props.employee.id,
                    firstName: event.target.firstName.value,
                    lastName: event.target.lastName.value,
                    email: event.target.email.value,
                    department: event.target.department.value
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
            Edit Employee
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="container">
              <Row>
                <Col sm={6}>
                    <Form onSubmit={(event) => handleSubmit(event)}>
                        <Form.Group controlId="firstName">
                            <Form.Label>First Name</Form.Label>
                            <Form.Control type="text" defaultValue={props.employee.firstName}  name="firstName" required placeholder="FirstName" />
                        </Form.Group>
                        <Form.Group controlId="lastName">
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control type="text" defaultValue={props.employee.lastName}  name="lastName" required placeholder="LastName" />
                        </Form.Group>
                        <Form.Group controlId="email">
                            <Form.Label>E-mail</Form.Label>
                            <Form.Control type="email" defaultValue={props.employee.email}  name="email" required placeholder="someone@example.com" />
                        </Form.Group>
                        <Form.Group controlId="department" >
                            <Form.Label>Department</Form.Label>
                            <Form.Control as="select" defaultValue={props.employee.department}>
                            {props.deps.map((dep,index) => (
                                <option key={dep.id}>{dep.name}</option>
                            ))}
                            </Form.Control>
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

export default EditEmployeeModal;