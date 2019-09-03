import React,{Component} from 'react';
import {Link} from 'react-router-dom';
import './components.css';
import Report from './reports.json';
import axios from 'axios';

export default class Home extends Component{

    constructor()
    {
        super();
        this.state = {
            name:'',
            reports:[]
        }
    }

    componentWillMount()
    {
        this.setState({reports:Report});
        console.log(Report)
    }

    createReport(){
        let reportName = document.getElementById('name').value;
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = (today.getFullYear().toString()).substr(2);

        today = mm + '/' + dd + '/' + yyyy;

        axios.get('http://localhost:8080/addReport', {
            params: {
            name: reportName,
            date: today
            }
        })
        .then(res => 
            console.log(res.data)
        )
        .catch(() =>
            console.log('error')
        ).finally(() => {
            this.setState({reports:require('./reports.json')})
            this.props.history.push({
                pathname:'/reports',
                state:{name: reportName}
            });
        })   
    }

    deleteReport(name, date){
        
        var index = this.state.reports.findIndex(x => x.name === name);
        var x = this.state.reports;
        console.log(this.state.reports);

        axios.get('http://localhost:8080/delReport', {
            params: {
              name: name
            }
          })
        .then(res => 
            console.log(res.data)
        )
        .catch(() =>
            console.log('error')
        ).finally(() => {
            x.splice(index,1);
            this.setState({reports:x})
        })
    }
    
    render(){
        return (
            <div className="ma0">
            <table className="table w-100 home-table">
                <thead>
                    <tr>
                        <th scope="col">Name</th>
                        <th scope="col">Date</th>
                        <th scope="col">Edit</th>
                    </tr>
                </thead>
                <tbody>
                {
                    this.state.reports.map(report => {
                        return(
                        <tr>
                            <td>{report.name}</td>
                            <td>{report.date}</td>
                            <td><Link to={{
                                pathname:"/reports",
                                state:{
                                name:report.name
                                }
                                }
                                }><i className="fas fa-edit"></i></Link> -- <a type="submit" onClick={() => this.deleteReport(report.name, report.date)}><i className="fa fa-trash" aria-hidden="true"></i></a> --  
                                <Link to={{
                                pathname:"/calc",
                                state:{
                                name:report.name
                                }
                                }
                                }><i className="fa fa-download"></i></Link>
                                </td>
                        </tr>
                        );
                    })
                }
                </tbody>
            </table>
            
            <input 
            required
            type="text" 
            id="name" 
            className="form-control fixed-bottom w-90 center" 
            placeholder="Enter Name" 
            style={{marginBottom:'45px'}} />

            <button type="button" className="btn btn-primary fixed-bottom center w-100 pb0 pv2" onClick={() => this.createReport()}>
                NEW REPORT
            </button>
            </div>
        );
    }
};