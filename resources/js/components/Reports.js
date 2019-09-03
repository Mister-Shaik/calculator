import React,{Component} from 'react';
import './components.css';
import {Link} from 'react-router-dom';
import calculation from './calculations.json';
import axios from 'axios';
let temp;
let temptotal;

class Reports extends Component{

    constructor(){
        super();
        this.state = {
            calculations:[],
            data:{
                name:'',
                calculation:'',
                total:''
            },
            reportTotal:0,
            reportname:'',
            delid:0
        }
    }

    componentWillMount(){
        this.setState({reportname:this.props.location.state.name});
        this.setState({calculations:calculation[this.props.location.state.name]});

        temptotal = 0;
        for(var x in calculation[this.props.location.state.name])
        {
            temptotal += parseFloat(calculation[this.props.location.state.name][x].total);
        }
        this.setState({reportTotal:temptotal.toFixed(2)});
        
    }

    AddCalculation(){
        let tempvar = this.state.calculations === undefined ? [] : this.state.calculations;
        let name = document.getElementById('name').value + ' ' + (document.getElementById('suffix').value === '' ? '' : document.getElementById('suffix').value);
        let calculation = document.getElementById('calculation').value != null ? document.getElementById('calculation').value.replace(/-/g,' * ') : '';
        let total = 1;
        let id = this.state.calculations === undefined? 1 : this.state.calculations.length + 1;
    if (calculation != '')
        {
        calculation.split('*').map(nums => {
                return (
                    total *= parseFloat(nums).toFixed(2)
                )
        });

        tempvar.push({id:id,calculation:calculation, name: name, total : total.toFixed(2)})

        console.log(id);
        axios.get('http://localhost:8080/addCalculation', {
            params: {
              report:this.state.reportname,
              id: id,
              calculation:calculation, 
              name: name, 
              total : total.toFixed(2)
            }
        })
        .then(res => console.log(res)
        )
        .catch(() =>
        console.log('error')
        ).finally(() => {
            this.setState({calculations : tempvar});

            document.getElementById('calculation').value = '';
            temp=0;

            temptotal = 0;
            for(var x in this.state.calculations)
            {
                temptotal += parseFloat(this.state.calculations[x].total);
            }
            this.setState({reportTotal:temptotal});
            
        })
    }
    }
        
    deleteCalculation(id){
        var store = this.state.calculations;
        console.log(id);

        axios.get('http://localhost:8080/delCalculation', {
            params: {
              report:this.state.reportname,
              id: id
            }
        })
        .then(res => {
            store = res.data[this.state.reportname];
            }
        )
        .catch(() =>
        console.log('error')
        ).finally(() => {
            this.setState({calculations:store});

            temptotal = 0;
            for(var x in this.state.calculations)
            {
                temptotal += parseFloat(this.state.calculations[x].total);
            }
            this.setState({reportTotal:temptotal.toFixed(2)});
        })
        temp=0;
    }

    render(){
        temp = 0;
        return (
            <div>
                <table className="table table-sm smallfont table-striped">
                    <thead className="table-dark">
                        <tr>
                            <th scope="col">Name</th>
                            <th scope="col">Calculation</th>
                            <th scope="col">Total</th>
                            <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody>
                    {
                        this.state.calculations !==  undefined ?this.state.calculations.map(calc => {
                                return(
                                    <tr>
                                        {/* <td><a onClick={() => this.editCalculation(calc.id)} href="#" className="no-decoration">{calc.name}</a></td> */}
                                        <td>{calc.name}</td>
                                        <td>{calc.calculation}</td>
                                        <td>{calc.total} </td>
                                        <td><a onClick={() => this.deleteCalculation(calc.id)}><i className="fa fa-trash" aria-hidden="true"></i></a></td>
                                    </tr>
                                )
                            }) : ''
                    }
                    </tbody>
                </table>
                <div className="fixed-bottom">
    
                    <h3 className="tc">Total : <span className="total" id="tots">{this.state.reportTotal}</span></h3>
                    <a href="/" type="button" className="btn btn-danger w-50 pv2">
                    SAVE
                    </a>
                    <button type="button" className="btn btn-primary w-50 pv2" data-toggle="modal" data-target="#exampleModal">
                    ADD
                    </button>
                </div>
                
                <div className="modal fade" id="exampleModal" tabIndex="0" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div className="modal-dialog" role="document">
                            <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">New Calculation</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <select className="form-control" id="name">
                                    <option value="Bedroom">Bedroom</option>
                                    <option value="Bathroom">Bathroom</option>
                                    <option value="Kitchen">Kitchen</option>
                                    <option value="Hall">Hall</option>
                                    <option value="Pooja">Pooja</option>
                                    <option value="Dining">Dining</option>
                                    <option value="Elevation">Elevation</option>
                                    <option value="Skating">Skating</option>
                                </select>
                                <select className="form-control" id="suffix">
                                    <option value=" "> </option>
                                    <option value="Floor">Floor</option>
                                    <option value="Wall">Wall</option>
                                </select>
                                <input required className="form-control" type="tel" placeholder="Calculation" id="calculation" pattern="[a-zA-Z0-9]+"/>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Cancel</button>
                                <button type="button" className="btn btn-primary"  data-dismiss="modal" onClick={() => this.AddCalculation()}>Next</button>
                            </div>
                            </div>
                        </div>
                    </div>
            </div>
        );
    }
}

export default Reports;