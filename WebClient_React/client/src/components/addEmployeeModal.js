import React, { Component } from 'react';
import {Row, Col} from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import {baseUrl} from '../utils/settings';

function AddEmployeeModal(props) {
    let handleSubmit = (event) => {
        event.preventDefault();
        fetch(baseUrl + '/employees/add',{
            method: 'POST',
            headers: {
                'Accept':'application/json',
                'Content-Type':'application/json',
            },
            body:JSON.stringify( {
                id: 0,
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
            Add Employee
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="container">
              <Row>
                <Col sm={6}>
                    <Form onSubmit={(event) => handleSubmit(event)}>
                        <Form.Group controlId="firstName">
                            <Form.Label>First Name</Form.Label>
                            <Form.Control type="text"  name="firstName" required placeholder="FirstName" />
                        </Form.Group>
                        <Form.Group controlId="lastName">
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control type="text"  name="lastName" required placeholder="LastName" />
                        </Form.Group>
                        <Form.Group controlId="email">
                            <Form.Label>E-mail</Form.Label>
                            <Form.Control type="email"  name="email" required placeholder="someone@example.com" />
                        </Form.Group>
                        <Form.Group controlId="department">
                            <Form.Label>Department</Form.Label>
                            <Form.Control as="select">
                            {props.deps.map((dep,index) => (
                                <option key={dep.id}>{dep.name}</option>
                            ))}
                            </Form.Control>
                        </Form.Group>
                        <Form.Group>
                            <Button varian="primary" type="submit">Add</Button>
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

export default AddEmployeeModal;