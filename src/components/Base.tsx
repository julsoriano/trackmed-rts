import * as React from 'react';
import { RouteComponentProps } from 'react-router';

interface IFetchCommonTableState {
    descriptions: ICommonTable[];
    loading: boolean;
}

// Discussion: https://blogs.msdn.microsoft.com/premier_developer/2018/06/17/angular-how-to-simplify-components-with-typescript-inheritance/
export class Base extends React.Component<RouteComponentProps<{}>, IFetchCommonTableState> {
  private static renderCommonTable(descriptions: ICommonTable[]) { 
      return <table className='table'>
          <thead>
              <tr>
                  <th>Description</th>
                  <th>Tag</th>
                  <th>Created Date</th>
              </tr>
          </thead>
          <tbody>
          {descriptions.map(description =>
              <tr key={ description.desc }>
                  <td>{ description.desc }</td>
                  <td>{ description.createdAtUtc }</td>
              </tr>
          )}
          </tbody>
      </table>;
  }

  protected itemUrl = 'http://localhost:5000/';
  protected title:string;
   
  constructor(props:any) {

    // In JavaScript classes, you need to explicitly call super(); when defining the constructor of a subclass. See https://reactjs.org/tutorial/tutorial.html
    super(props);  

    /*
    React components can have state by setting this.state in the constructor, which should be considered private to the component.
    Let�s store the current value of the square in state, and change it when the square is clicked.

    First, add a constructor to the class to initialize the state:
    */
    
    this.state = { descriptions: [], loading: true };

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
  public compareFn = (a:any, b:any) => {
    if (a.desc < b.desc) { return -1;}
    if (a.desc > b.desc) { return 1; }
    return 0;
  }; 

  public getItems(itemUrl:string, itemApi:string, title:string) {
    // alert(this.itemUrl + itemApi);
    this.title = title;
    fetch(this.itemUrl + itemApi)
      .then(response => response.json() as Promise<ICommonTable[]>)
      .then(data => {
          this.setState({ descriptions: data, loading: false });
    });
  }

  public render() {
      const contents = this.state.loading
          ? <p><em>Loading...</em></p>
          : Base.renderCommonTable(this.state.descriptions.sort(this.compareFn));

      return <div>
          <h1>{this.title}</h1>
          <p>This component demonstrates fetching description table from the server.</p>
          { contents }
      </div>;
  }
 
}

interface ICommonTable {
  desc: string;
  createdAtUtc: string;
}