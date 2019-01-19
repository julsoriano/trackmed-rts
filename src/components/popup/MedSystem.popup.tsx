import * as React from 'react';
// import { RouteComponentProps } from 'react-router';

// import HTMLElement from '@webcomponents/webcomponentsjs';

// Discussion: https://blogs.msdn.microsoft.com/premier_developer/2018/06/17/angular-how-to-simplify-components-with-typescript-inheritance/
export default class MedSystem extends React.Component<any, any > {

    options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

    constructor(props: any) {
        super(props); 
        this.state = { data: this.props.children }
    } 

    render() {
		const { data } = this.props;
		const row = data.map( (item: ISystemTable, index: number) =>
			<tr key={ item.imte }>
				<td>{ index + 1 }</td>
				<td>{ item.imte }</td>
				<td>{ item.referenceNo }</td>
				<td>{ item.systemsDescription !== null ? item.systemsDescription.desc : '' }</td> 
				<td>{ item.deploymentDate !== null ? ( new Date(item.deploymentDate).toLocaleDateString('en-GB', this.options) ) : '' }</td>
				<td>{ item.location !== null ? item.location.desc : '' }</td> 
			</tr>
		);
		return (
			<tbody>{row}</tbody>
		)
    }
}

export interface ISystemTable {
    id: string;
    imte: string;
    referenceNo: string;
    systemsDescription: any;
    deploymentDate: Date;
    location: any;
    }