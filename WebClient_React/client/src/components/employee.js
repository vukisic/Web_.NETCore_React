import React, { Component } from 'react';
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button'
import ButtonToolbar from 'react-bootstrap/ButtonToolbar'
import {baseUrl} from '../utils/settings';
import AddEmployeeModal from './addEmployeeModal';
import EditEmployeeModal from './editEmployeeModal';

class Employee extends Component {
    constructor (props) {
        super(props);
        this.state = {emps: [], deps: [], addModalShow: false, editModalShow: false, id: 0, firstName: '', lastName: '', email: '' , department: ''}
    }

    componentDidMount() {
        this.refreshList();
        fetch(baseUrl + '/departments/all')
        . then(res => res.json())
        .then(data => {
            this.setState({deps: data});
        }).catch(err => console.log(err));
    }

    componentDidUpdate(){
        this.refreshList();
    }

    refreshList(){
        fetch(baseUrl + '/employees/all')
        . then(res => res.json())
        .then(data => {
            this.setState({emps: data});
        }).catch(err => console.log(err))
       
    }

    addModalClose() {
        this.setState({addModalShow: false});
    }

    
    editModalClose() {
        this.setState({editModalShow: false});
    }

    remove(id){
        fetch(baseUrl + '/employees/delete/' + id,{
            method: 'DELETE',
            headers: {
                'Accept':'application/json',
                'Content-Type':'application/json',
            }
        }).then(res => res.json())
        .then((result)=> {
           alert(result);
        }, (error) => {
            alert(error);
        });
    }

    render() {
        return (
            <div className="container">
                 <Table className="mt-4" striped bordered hover size="sma">
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>E-mail</th>
                            <th>Department</th>
                            <th>Options</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.emps.map((emp,index) => (
                            <tr key = {emp.id}>
                                
                                <td>{emp.id}</td>
                                <td>{emp.firstName}</td>
                                <td>{emp.lastName}</td>
                                <td>{emp.email}</td>
                                <td>{emp.department.name}</td>
                                <td>
                                    <Button variant="danger" className="btm-sm mr-3" onClick={() => this.remove(emp.id)} >Delete</Button>
                                    <Button variant="warning" className="btm-sm mr-3" onClick={() => this.setState({editModalShow: true, firstName: emp.firstName, lastName: emp.lastName, id: emp.id, email: emp.email, department: emp.department.name})}>Modify</Button>
                                    <EditEmployeeModal deps={this.state.deps} employee={{firstName: this.state.firstName, lastName: this.state.lastName, id: this.state.id, email: this.state.email, department: this.state.department}} onHide={() => this.editModalClose()} show = {this.state.editModalShow} />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
                <ButtonToolbar>
                    <Button variant="primary" onClick={() => this.setState({addModalShow: true})}>Add</Button>
                    <AddEmployeeModal deps={this.state.deps} onHide={() => this.addModalClose()} show = {this.state.addModalShow} />
                </ButtonToolbar>
            </div>
        );
    }
}

export default Employee;