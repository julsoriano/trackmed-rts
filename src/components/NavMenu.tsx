import * as React from 'react';
import { Glyphicon, Nav, Navbar, NavItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { Link } from 'react-router-dom';
import '../App.css';
// import logo from '../logo.svg';
import './NavMenu.css';

export class NavMenu extends React.Component {
  // displayName = NavMenu.name

  public render() {
    return (
      <Navbar inverse={true} fixedTop={true} fluid={true} collapseOnSelect={true}>
        <Navbar.Header>
          <Navbar.Brand>
            <Link to={'/'} >TrackMED-RTS</Link>          
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav>
            <LinkContainer to={'/'} exact={true}>
              <NavItem>
                <Glyphicon glyph='home' /> Home
              </NavItem>
            </LinkContainer>
            <LinkContainer to={'/counter'}>
              <NavItem>
                <Glyphicon glyph='education' /> Counter
              </NavItem>
            </LinkContainer>
            <LinkContainer to={'/fetchdescription'}>
              <NavItem>
                <Glyphicon glyph='th-list' /> Fetch description
              </NavItem>
            </LinkContainer>
            <LinkContainer to={'/fetchlocation'}>
              <NavItem>
                <Glyphicon glyph='th-list' /> Fetch location
              </NavItem>
            </LinkContainer>
            <LinkContainer to={'/fetchowner'}>
              <NavItem>
                <Glyphicon glyph='th-list' /> Fetch owner
              </NavItem>
            </LinkContainer>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

/*
import * as React from 'react';
import { Link, NavLink } from 'react-router-dom';

export class NavMenu extends React.Component<{}, {}> {
    public render() {
        return <div className='main-nav'>
                <div className='navbar navbar-inverse'>
                <div className='navbar-header'>
                    <button type='button' className='navbar-toggle' data-toggle='collapse' data-target='.navbar-collapse'>
                        <span className='sr-only'>Toggle navigation</span>
                        <span className='icon-bar'/>
                        <span className='icon-bar'/>
                        <span className='icon-bar'/>
                    </button>
                    <Link className='navbar-brand' to={ '/' }>TrackMED</Link>
                </div>
                <div className='clearfix'/>
                <div className='navbar-collapse collapse'>
                    <ul className='nav navbar-nav'>
                        <li>
                            <NavLink to={ '/' } exact={true} activeClassName='active'>
                                <span className='glyphicon glyphicon-home'/> Home
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to={ '/counter' } activeClassName='active'>
                                <span className='glyphicon glyphicon-education'/> Counter
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to={'/fetchdescription'} activeClassName='active'>
                                <span className='glyphicon glyphicon-th-list'/> Fetch description
                            </NavLink>
                        </li>
                    </ul>
                </div>
            </div>
        </div>;
    }
}
*/
