import { Base } from './Base';

// Inheritance: https://blogs.msdn.microsoft.com/premier_developer/2018/06/17/angular-how-to-simplify-components-with-typescript-inheritance/
export class FetchLocation extends Base {

  // selFlag: Boolean;
  protected itemApi = 'api/Location';

  public componentDidMount() {   
    this.getItems(this.itemApi);
  }
}