import { Base } from './Base';

export class FetchLocation extends Base {

  // selFlag: Boolean;
  protected itemApi = 'api/Location';
  protected title: string = "Location";
 
  constructor(props:any) { 
    super(props); 
  }   

  public componentDidMount() {   
    this.getItems(this.itemUrl, this.itemApi, this.title);
  }
}