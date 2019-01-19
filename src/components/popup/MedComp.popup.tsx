import * as React from 'react';
// import { RouteComponentProps } from 'react-router';

// import HTMLElement from '@webcomponents/webcomponentsjs';

// Discussion: https://blogs.msdn.microsoft.com/premier_developer/2018/06/17/angular-how-to-simplify-components-with-typescript-inheritance/
export default class MedComp extends React.Component<any, any > {

    // medComponents: IComponentTable[];
    options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

    constructor(props: any) {
        super(props); 
        this.state = { data: this.props.children }
    } 

    render() {
		const { data } = this.props;
		const row = data.map( (item: IComponentTable, index: number) =>
			<tr key={ item.assetnumber }>
				<td>{ index + 1 }</td>
				<td>{ item.assetnumber }</td>
				<td>{ item.imte }</td>
				<td>{ item.serialnumber }</td>
				<td>{ item.description !== null ? item.description.desc : '' }</td> 
				<td>{ item.owner !== null ? item.owner.desc : '' }</td>
				<td>{ item.status !== null ? item.status.desc : '' }</td>     * 
				<td>{ item.model_Manufacturer !== null ? item.model_Manufacturer.desc : '' }</td>
				<td>{ item.providerOfService !== null ? item.providerOfService.desc :'' }</td>                       
				<td>{ item.calibrationDate !== null ? ( new Date(item.calibrationDate).toLocaleDateString('en-GB', this.options) ) : '' }</td>
				<td>{ item.maintenanceDate !== null ? ( new Date(item.maintenanceDate).toLocaleDateString('en-GB', this.options) ) : '' }</td>
			</tr>
		);
		return (
			<tbody>{row}</tbody>
		)
    }
}

export interface IComponentTable {
    id: string;
    assetnumber: string;
    imte: string;
    serialnumber: string;
    description: any;
    owner: any;
    status: any;
    model_Manufacturer: any;
    providerOfService: any;
    calibrationDate: Date;
    maintenanceDate: Date;
    }