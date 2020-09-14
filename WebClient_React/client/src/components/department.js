import React, { Component } from 'react';
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button'
import ButtonToolbar from 'react-bootstrap/ButtonToolbar'
import {baseUrl} from '../utils/settings';
import AddDepartmentModal from './addDepartmentModal';
import EditDepartmentModal from './editDepartmentModal';

class Department extends Component {
    constructor (props) {
        super(props);
        this.state = {deps: [], addModalShow: false, editModalShow: false}
    }

    componentDidMount() {
        this.refreshList();
    }

    componentDidUpdate(){
        this.refreshList();
    }

    refreshList(){
        fetch(baseUrl + '/departments/all')
        . then(res => res.json())
        .then(data => {
            this.setState({deps: data});
        }).catch(err => console.log(err));
    }

    addModalClose() {
        this.setState({addModalShow: false});
    }

    
    editModalClose() {
        this.setState({editModalShow: false});
    }

    remove(id){
        fetch(baseUrl + '/departments/delete/' + id,{
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
                            <th>Name</th>
                            <th>Main Location</th>
                            <th>Options</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.deps.map((dep,index) => (
                            <tr key = {dep.id}>
                                
                                <td>{dep.id}</td>
                                <td>{dep.name}</td>
                                <td>{dep.mainLocation}</td>
                                <td>
                                    <Button variant="danger" className="btm-sm mr-3" onClick={() => this.remove(dep.id)}>Delete</Button>
                                    <Button variant="warning" className="btm-sm mr-3" onClick={() => this.setState({editModalShow: true, name: dep.name, id: dep.id, mainLication: dep.mainLocation})}>Modify</Button>
                                    <EditDepartmentModal department={{name: this.state.name, id: this.state.id, mainLocation: this.state.mainLication}} onHide={() => this.editModalClose()} show = {this.state.editModalShow} />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
                <ButtonToolbar>
                    <Button variant="primary" onClick={() => this.setState({addModalShow: true})}>Add</Button>
                    <AddDepartmentModal onHide={() => this.addModalClose()} show = {this.state.addModalShow} />
                </ButtonToolbar>
            </div>
            
        );
    }
}

export default Department;