// Inheritance: https://blogs.msdn.microsoft.com/premier_developer/2018/06/17/angular-how-to-simplify-components-with-typescript-inheritance/
import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import './Base.css';
import { isNullOrUndefined } from 'util';

interface IFetchCommonTableState {
    descriptions: ICommonTable[];
    loading: boolean;
}

// Table cloned from TrackMED-RJS-VS
export class Base extends React.Component<RouteComponentProps<{}>, IFetchCommonTableState> {
    protected renderCommonTable(descriptions: ICommonTable[]) { 
        return <table className='table table-striped table-condensed table-hover dataTable no-footer' >
            <thead>
                <tr>
                    <th></th>
                    <th>Sequence #</th>
                    <th>Id</th>
                    <th>Description</th>
                    <th>Tag</th>
                    <th>Created Date</th>
                </tr>
            </thead>
            <tbody>
            {descriptions.map( (description, index) =>
                <tr key={ index + 1 }>
                    <td data-id={ description.id } className='details-control glyphicon glyphicon-plus' 
                        onClick={this.handleClick}></td>
                    <td>{ index + 1 }</td>
                    <td>{ description.id }</td>
                    <td>{ description.desc }</td>
                    <td>{ new Date(description.createdAtUtc).toLocaleDateString('en-GB', this.options) }</td>
                    <td>
                        <button className='glyphicon glyphicon-trash'>
                            <span className="tooltiptext">Delete</span>
                        </button>
                    </td>
                    <td>
                        <button className='glyphicon glyphicon-check'>
                            <span className="tooltiptext">Edit</span>
                        </button>
                    </td>                  
              </tr>
          )}
          </tbody>
      </table>;
    }

    protected itemUrl = 'http://localhost:5000/';
    protected title: string;
    protected tableName: any;
    protected options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    protected tr: any;
    protected elListSave:any;

    constructor(props:any) {

        // In JavaScript classes, you need to explicitly call super(); when defining the constructor of a subclass. See https://reactjs.org/tutorial/tutorial.html
        super(props);  
        this.handleClick = this.handleClick.bind(this);
        
        this.state = { 
            descriptions: [], 
            loading: true };

        /* replaced by getItems for inheritance
        fetch(this.itemUrl)
        .then(response => response.json() as Promise<ICommonTable[]>)
        .then(data => {
            this.setState({ descriptions: data, loading: false });
        });
        */
    }

    // Function to compare two objects by comparing their `desc` property.const
    // From: https://stackoverflow.com/questions/42203953/angular2-rxjs-order-observable-list-of-objects-by-an-observable-field 
    private compareFn = (a:any, b:any) => {
        if (a.desc < b.desc) { return -1;}
        if (a.desc > b.desc) { return 1; }
        return 0;
    }; 

    getItems(itemUrl:string, itemApi:string, title:string) {
        // alert(this.itemUrl + itemApi);
        this.title = title;
        this.tableName = /api\/(.+$)/.exec(itemApi);
        fetch(this.itemUrl + itemApi)
        .then(response => response.json() as Promise<ICommonTable[]>)
        .then(data => {
            this.setState({ descriptions: data, loading: false });
        });
    }

    headings = {
        'assetnumber' : 'Asset#',
        'imte' : 'IMTE',
        'serialnumber' : 'Serial Number',
        'description' : 'Description',
        'owner' : 'Owner',
        'status' : 'Status',
        'model_Manufacturer' : 'Model/Manufacturer',
        'providerOfService' : 'Service Provider',
        'calibrationDate' : 'Calibration Due Date',
        'maintenanceDate' : 'Maintenance Due Date'
    }    


    // Dynamically compose nested table
    createNestedTable(id:string, elGP:Node, elP:Node, headings:any) {

        let urlComplete = this.itemUrl + 'api/Component/' + this.tableName[1] + '/' + id;

        fetch(urlComplete)
        .then(response => response.json()) 
        .then(data => {
            // this.setState({ medComponents: data, loading: false });
            // console.log("Number of Components = " + Object.keys(data).length);
            // console.log(data);

            // create a <table> element
            this.tr = document.createElement("tr");
            var td = document.createElement("td");
            td.setAttribute("colspan", "4");
            
            var tbl = document.createElement("table");
            tbl.classList.add('table', 'table-striped', 'table-condensed', 'table-hover', 'table-component');

            // create a <thead> element and its child nodes (<tr> and <th>)
            var tblHead = document.createElement("thead");
            var rowH = document.createElement("tr");

            const fieldNames = Object.getOwnPropertyNames(headings);

            for (var fn of fieldNames) {
                var hdg = headings[fn];
                if (hdg != null) {
                    var cell = document.createElement("th");
                    var cellText = document.createTextNode(hdg);
                    cell.appendChild(cellText);
                    rowH.appendChild(cell);
                }            
            }
            
            // attach headings to parent nodes
            tblHead.appendChild(rowH);
            tbl.appendChild(tblHead);
    
            // create a <tbody> element and its child nodes (<tr> and <td>)
            var tblBody = document.createElement("tbody");
            const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
            for (var x of data) {

                var row = document.createElement("tr"); 
                
                // https://stackoverflow.com/questions/37673454/javascript-iterate-key-value-from-json/37673499                
                Object.keys(headings).forEach(function(key) {
                    // console.log('Key : ' + key + ', Value : ' + x[key]);
                
                    cell = document.createElement("td");
                    if( headings[key] === 'Description' || 
                        headings[key] === 'Owner' ||
                        headings[key] === 'Status' ||
                        headings[key] === 'Model/Manufacturer' ||
                        headings[key] === 'Service Provider' ) {

                        cellText = x[key] !== null?document.createTextNode(x[key].desc):document.createTextNode('');
                    } else if( headings[key] === 'Calibration Due Date' || 
                            headings[key] === 'Maintenance Due Date')  {
                                cellText = x[key] !== null?document.createTextNode(new Date(x[key]).toLocaleDateString('en-GB', options)):document.createTextNode('');
                                   
                    } else {
                        cellText = document.createTextNode(x[key]);
                    }

                    cell.appendChild(cellText);
                    row.appendChild(cell);
                }) 
               
                // add the row to the end of the table body
                tblBody.appendChild(row);
            }
            
            // put the <tbody> in the <table>
            tbl.appendChild(tblBody);
            td.appendChild(tbl);
            this.tr.appendChild(td);

            elGP.insertBefore(this.tr, elP.nextSibling); 
            // return this.tr;  
        });
    };


    handleClick(event:any) {
        event.preventDefault();

        let id = event.target.dataset.id;
        let elP = event.target.parentNode; // Parent Node: tr
        let elGP = elP.parentNode;         // Parent Node: tbody
        let elList = event.target.classList;
        
        if (elList.contains('glyphicon-plus')) {
            
            elList.replace('glyphicon-plus', 'glyphicon-minus');
            
            if( !isNullOrUndefined(this.tr)) this.tr.parentNode.removeChild(this.tr);
            if( !isNullOrUndefined(this.elListSave)) this.elListSave.replace('glyphicon-minus', 'glyphicon-plus');

            // appends child <table> into table <tbody>
            this.createNestedTable(id, elGP, elP, this.headings);

            this.elListSave = elList;

        } else {
            elList.replace('glyphicon-minus', 'glyphicon-plus');
            this.tr.parentNode.removeChild(this.tr); // https://www.w3schools.com/js/js_htmldom_nodes.asp
            this.tr = null;
        }
    }

    render() {
        const contents = this.state.loading
          ? <p><em>Loading...</em></p>
          : this.renderCommonTable(this.state.descriptions.sort(this.compareFn));

        return <div>
          <h1>{this.title}</h1>
          <p>This component demonstrates fetching description table from the server.</p>
          { contents }
        </div>;
    }
}

interface ICommonTable {
  id: string;
  desc: string;
  createdAtUtc: string;
}