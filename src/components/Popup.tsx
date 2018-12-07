// Inheritance: https://blogs.msdn.microsoft.com/premier_developer/2018/06/17/angular-how-to-simplify-components-with-typescript-inheritance/
import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import './Base.css';
import { isNullOrUndefined } from 'util';

interface IFetchComponentTableState {
    descriptions: IComponentTable[];
    loading: boolean;
}

// Table cloned from TrackMED-RJS-VS
export class Popup extends React.Component<RouteComponentProps<{}>, IFetchComponentTableState> {
    protected renderCommonTable(descriptions: IComponentTable[]) { 
        return <table id="nestedTable" className='table table-light table-striped table-condensed table-hover table-component'>
            <thead>
                <tr role="row">
                    <th>Sequence #</th>
                    <th>Asset#</th>
                    <th>IMTE</th>
                    <th>Serial Number</th>
                    <th>Description</th>
                    <th>Owner</th>
                    <th>Status</th>
                    <th>Model/Manufacturer</th>
                    <th>Service Provider</th>
                    <th>Calibration Due Date</th>
                    <th>Maintenance Due Date</th>                   
                </tr>
            </thead>
            <tbody>
            {descriptions.map( (item, index) =>
                <tr key={ index + 1 }>
                  <td>{ index + 1 }</td>
                  <td>{ item.assetnumber }</td>
                  <td>{ item.imte }</td>
                  <td>{ item.serialnumber }</td>
                  <td>{ item.description !== null ? item.description : '' }</td> 
                  <td>{ item.owner !== null ? item.owner : '' }</td>
                  <td>{ item.status !== null ? item.status : '' }</td>
                  <td>{ item.model_Manufacturer !== null ? item.model_Manufacturer : '' }</td>
                  <td>{ item.providerOfService !== null ? item.providerOfService : '' }</td>                                      
                  <td>{ item.calibrationDate !== null ? ( new Date(item.calibrationDate).toLocaleDateString('en-GB', this.options) ) : '' }</td>
                  <td>{ item.maintenanceDate !== null ? ( new Date(item.maintenanceDate).toLocaleDateString('en-GB', this.options) ) : '' }</td>
              </tr>
          )}
          </tbody>
      </table>;
    }

    protected itemUrl = 'http://localhost:5000/';
    protected title: string;
    protected tableName: any;
    private options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    private tr: any;
    private elListSave: any;

    constructor(props:any) {

        // In JavaScript classes, you need to explicitly call super(); when defining the constructor of a subclass. See https://reactjs.org/tutorial/tutorial.html
        super(props);  
        this.showRelatedTable = this.showRelatedTable.bind(this);
        
        this.state = { 
            descriptions: [], 
            loading: true };

        /* replaced by getItems for inheritance
        fetch(this.itemUrl)
        .then(response => response.json() as Promise<IComponentTable[]>)
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

    getItems(itemApi:string, title:string) {
        // alert(this.itemUrl + itemApi);
        this.title = title;
        this.tableName = /api\/(.+$)/.exec(itemApi);
        fetch(this.itemUrl + itemApi)
        .then(response => response.json() as Promise<IComponentTable[]>)
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
            td.setAttribute("colspan", "5");
            
            var tbl = document.createElement("table");
            tbl.classList.add('table', 'table-striped', 'table-condensed', 'table-hover', 'table-component');

            // create a <thead> element and its child nodes (<tr> and <th>)
            var tblHead = document.createElement("thead");
            var rowH = document.createElement("tr");

            // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/getOwnPropertyNames
            const fieldNames = Object.getOwnPropertyNames(headings);

            var cell = document.createElement("th");
            cell.style.color = "blue";

            // this will be placed on the 1st column by default
            var cellText = document.createTextNode("Sequence#");
            cell.appendChild(cellText);
            rowH.appendChild(cell);

            for (var fn of fieldNames) {
                // e.g., if property name = 'assetnumber', then celltext = 'Asset#'
                var hdg = headings[fn];
                if (hdg != null) {
                    cell = document.createElement("th");
                    cell.style.color = "blue";
                    cellText = document.createTextNode(hdg);
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
            let idx = 0;

            for (var x of data) {

                ++idx;
                var row = document.createElement("tr"); 
                cell = document.createElement("td");

                // this will be placed on the 1st column by default
                cellText = document.createTextNode(idx.toString());
                cell.appendChild(cellText);
                row.appendChild(cell);
                
                // https://stackoverflow.com/questions/37673454/javascript-iterate-key-value-from-json/37673499                
                Object.keys(headings).forEach(function(key) {
                    // console.log('Key : ' + key + ', Value : ' + x[key]);
                
                    cell = document.createElement("td");
                    cell.style.color = "red";
                    if( headings[key] === 'Description' || 
                        headings[key] === 'Owner' ||
                        headings[key] === 'Status' ||
                        headings[key] === 'Model/Manufacturer' ||
                        headings[key] === 'Service Provider' ) {
                        
                        // this will be placed on the next column in sequence
                        cellText = x[key] !== null ? document.createTextNode(x[key].desc) : document.createTextNode('');

                    } else if( headings[key] === 'Calibration Due Date' || 
                            headings[key] === 'Maintenance Due Date')  {

                                // this will be placed on the next column in sequence
                                cellText = x[key] !== null ? document.createTextNode(new Date(x[key]).toLocaleDateString('en-GB', options)) : document.createTextNode('');
                                   
                    } else {
                        // this will be placed on the next column in sequence
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


    showRelatedTable(event:any) {
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

interface IComponentTable {
    id: string;
    assetnumber: string;
    imte: string;
    serialnumber: string;
    description: string;
    owner: string;
    status: string;
    model_Manufacturer: string;
    providerOfService: string;
    calibrationDate: Date;
    maintenanceDate: Date;
}