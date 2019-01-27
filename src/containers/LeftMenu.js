import React from 'react';
import {Link} from 'react-router-dom'
import {SwipeableDrawer, Divider, List, ListItem, ListItemIcon, ListItemText} from '@material-ui/core'
import InboxIcon from '@material-ui/icons/MoveToInbox';
import firebase from "../firebase";


class LeftMenu extends React.Component {
    handleLogout = () => {
        console.log('clicked');
        firebase
            .auth()
            .signOut()
            .then(()=> {
                console.log('singed out');
            });

    }
    render() {
        const {toggleDrawerTrue, toggleDrawerFalse, left} = this.props
        return (
            <div>
                <SwipeableDrawer
                    open={left}
                    onClose={toggleDrawerFalse}
                    onOpen={toggleDrawerTrue}
                >
                    <div
                        tabIndex={0}
                        role="button"
                        onClick={toggleDrawerTrue}
                        onKeyDown={toggleDrawerFalse}
                    >
                        <List>
                            <Link  to="/" >
                                <ListItem button >
                                    <ListItemText primary="Home" />
                                </ListItem>
                            </Link>

                        </List>
                        <Divider />
                        <List>
                            <Link to="/admin" >
                            <ListItem button >
                                <ListItemText primary="Admin" />
                            </ListItem>
                            </Link>

                        </List>
                        <Divider />
                        <List>
                            <Link to="/groups" >
                                <ListItem button >
                                    <ListItemText primary="Manage Groups" />
                                </ListItem>
                            </Link>

                        </List>
                        <Divider />
                        <List>
                            <Link to="/manager" >
                                <ListItem button >
                                    <ListItemText primary="Manage Users" />
                                </ListItem>
                            </Link>

                        </List>
                        <Divider />
                        <List>
                            <Link to="/holiday" >
                                <ListItem button >
                                    <ListItemText primary="Request Holiday" />
                                </ListItem>
                            </Link>

                        </List>
                        <Divider />
                        <List>
                            <ListItem button onClick={this.handleLogout }>

                                <ListItemText primary="Logout" />
                            </ListItem>
                        </List>
                        <Divider />



                    </div>
                </SwipeableDrawer>



            </div>
        )
    }
}

export default LeftMenu;