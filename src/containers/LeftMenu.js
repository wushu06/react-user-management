import React from 'react';
import {Link} from 'react-router-dom'
import {SwipeableDrawer, Divider, List, ListItem, ListItemIcon, ListItemText} from '@material-ui/core'
import InboxIcon from '@material-ui/icons/MoveToInbox';
import firebase from "../firebase";
import {connect} from "react-redux";


class LeftMenu extends React.Component {
    state = {
        companyName: this.props.currentUser.displayName,
        fullName: ''

    };

    componentDidMount() {

        let collection = this.state.companyName.replace(/[^a-zA-Z0-9]/g, '');

        firebase.database().ref(collection).child('users').on('child_added', snap => {
            if(snap.val().id === this.props.currentUser.uid) {
                this.setState({fullName: snap.val().firstName+' '+snap.val().lastName})
            }
        })
    }
    handleLogout = () => {
        window.localStorage.removeItem('userId');
         window.localStorage.removeItem('userCompanyName');
        this.props.history.push('/login')
       /* firebase
            .auth()
            .signOut()
            .then(()=> {
                console.log('singed out');
            });*/

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
                        {this.state.fullName &&
                        <List>
                            <ListItemText primary={this.state.fullName}/>

                        </List>
                        }
                        <Divider />
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
                            <Link to="/users" >
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
                            <Link to="/calendar" >
                                <ListItem button >
                                    <ListItemText primary="Caldendar" />
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

const mapStateToProps = state => ({
    currentUser: state.user.currentUser
});


export default connect(mapStateToProps)(LeftMenu);