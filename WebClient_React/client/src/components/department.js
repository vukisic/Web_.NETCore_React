import React, { Component } from 'react';
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button'
import ButtonToolbar from 'react-bootstrap/ButtonToolbar'
import {baseUrl} from '../utils/settings';
import AddDepartmentModal from './addDepartmentModal';

class Department extends Component {
    constructor (props) {
        super(props);
        this.state = {deps: [], addModalShow: false}
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

    render() {
        return (
            <div className="container">
                <Table className="mt-4" striped bordered hover size="sma">
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Name</th>
                            <th>Main Location</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.deps.map((dep,index) => (
                            <tr key = {dep.id}>
                                
                                <td>{dep.id}</td>
                                <td>{dep.name}</td>
                                <td>{dep.mainLocation}</td>
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