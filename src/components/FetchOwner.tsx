import { Base } from './Base';

export class FetchOwner extends Base {

  // selFlag: Boolean;
  protected itemApi = 'api/Owner';
  protected title: string = "Owner";
 
  constructor(props:any) { 
    super(props); 
  }   

  public componentDidMount() {   
    this.getItems(this.itemUrl, this.itemApi, this.title);
  }
}