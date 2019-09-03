import React,{Component} from 'react';
import 'tachyons';
const calculate = require('./Components/calculations.json');
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
let total = 0;

class PdfGen extends Component{

  constructor(){
      super();
      this.state = {
          calculations:[],
          reportName:'',
          reporttotal:0
      }
  }

  componentWillMount(){
    this.setState({reportname:this.props.location.state.name});
    this.setState({calculations:calculate[this.props.location.state.name]});

    let temptotal = 0;
    for(var x in calculate[this.props.location.state.name])
    {
        temptotal += parseFloat(calculate[this.props.location.state.name][x].total);
    }
    this.setState({reportTotal:temptotal.toFixed(2)});
  }

componentDidMount(){
    const filename  = this.props.location.state.name+'.pdf';

    html2canvas(document.querySelector('#topdf'),{scale: 4}
                        ).then(canvas => {
        let pdf = new jsPDF('p', 'mm', 'a6');
        pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 0, 0, 105, 80);
        pdf.save(filename);
    });
}
// Variant
// This one lets you improve the PDF sharpness by scaling up the HTML node tree to render as an image before getting pasted on the PDF.

  render(){
      total = 0;
  return (
    <div id="topdf">
    <h3 class="black tc">{this.props.location.state.name}</h3>
                <table className="table table-sm smallfont table-striped">
                    <thead className="table-dark">
                        <tr>
                            <th scope="col">Name</th>
                            <th scope="col">Calculation</th>
                            <th scope="col">Total</th>
                        </tr>
                    </thead>
                    <tbody>
                    {
                        this.state.calculations !==  undefined ?this.state.calculations.map(calc => {
                                total += parseFloat(calc.total).toFixed(2);
                                return(
                                    <tr>
                                        {/* <td><a onClick={() => this.editCalculation(calc.id)} href="#" className="no-decoration">{calc.name}</a></td> */}
                                        <td>{calc.name}</td>
                                        <td>{calc.calculation}</td>
                                        <td>{calc.total} </td>
                                    </tr>
                                )
                            }) : ''
                    }
                    </tbody>
                </table>
                <br/>
                <h3 className="tc">Total : <span className="total" id="tots">{this.state.reportTotal}</span></h3>

    </div>
  )}
}

export default PdfGen;
