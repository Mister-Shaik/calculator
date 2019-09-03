import React,{Component} from 'react';
import Report from './reports.json';
import axios from 'axios';

class Calculation extends Component{

    constructor()
    {
        super();
        this.state = {
            name:'',
            reports:[]
        }
    }

    componentDidMount()
    {
        this.setState({reports:Report});
        console.log(Report)
    }
    
    redirect(){
        console.log(this.props.location.state.name);
        this.props.history.push({
            pathname:'/pdfgen',
            state:{name: this.props.location.state.name}
        });
    }

    render(){
        return (
            <div>
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
                            <td><button onClick={() => this.redirect(report.name)}><i className="fa fa-download"></i></button></td>
                        </tr>
                        );
                    })
                }
                </tbody>
            </table>
            </div>
        );
    }
}


export default Calculation;