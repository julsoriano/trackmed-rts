import { Base } from './Base';

// Inheritance: https://blogs.msdn.microsoft.com/premier_developer/2018/06/17/angular-how-to-simplify-components-with-typescript-inheritance/
export class FetchOwner extends Base {

  // selFlag: Boolean;
  private itemApi = 'api/Owner';
  // private title: string = "Owner";

  public componentDidMount() {   
    this.getItems(this.itemApi);
  }

}