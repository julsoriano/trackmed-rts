import * as React from 'react';
import { NavMenu } from './NavMenu';

export interface ILayoutProps {
    children?: React.ReactNode;
}

export class Layout extends React.Component<ILayoutProps, {}> {
    public render() {
        return <div className='container-fluid'>
            <div className='row'>
                <div className='col-sm-3'>
                    <NavMenu />
                </div>
                <div className='col-sm-9'>
                    { this.props.children }
                    <hr /> 
                    <footer>
                        <p>&copy; 2018 - J. Soriano</p>
                    </footer>
                </div>
            </div>
        </div>;
    }
}
