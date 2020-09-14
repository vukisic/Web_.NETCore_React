import React, { Component } from 'react';
import {Row, Col} from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import {baseUrl} from '../utils/settings';

function AddDepartmentModal(props) {
    let handleSubmit = (event) => {
        event.preventDefault();
        fetch(baseUrl + '/departments/add',{
            method: 'POST',
            headers: {
                'Accept':'application/json',
                'Content-Type':'application/json',
            },
            body:JSON.stringify( {
                id: 0,
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
            Add Department
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="container">
              <Row>
                <Col sm={6}>
                    <Form onSubmit={(event) => handleSubmit(event)}>
                        <Form.Group controlId="name">
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="text" name="name" required placeholder="Some Name" />
                        </Form.Group>
                        <Form.Group controlId="mainLocation">
                            <Form.Label>MainLocation</Form.Label>
                            <Form.Control type="text" name="mainLocation" required placeholder="Some Location" />
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

export default AddDepartmentModal;