import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import {TextField, FormControl, MenuItem, Icon, Button} from '@material-ui/core'
import firebase from '../../firebase';
import Header from '../../containers/Header'
import {connect} from "react-redux";

const styles = theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 200,
    },
    dense: {
        marginTop: 19,
    },
    menu: {
        width: 200,
    },
});



class UpdateUser extends React.Component {
    state = {
        group: '',
        loading: false,
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        phone: '',
        usersRef: firebase.database().ref('users'),
        groupsRef: firebase.database().ref('groups'),
        users: [],
        allGroups: [],
        profile:'',
        currentUser: this.props.currentUser,
        refName: this.props.currentUser.displayName.replace(/[^a-zA-Z0-9]/g, '')
    };

    componentDidMount() {

        let loadUsers = [],
            allGroups = [];
    console.log(this.state.currentUser);
        firebase.database().ref(this.state.refName).child(this.state.currentUser.uid).on("value", snap => {
            this.setState({profile: snap.val()})
        });

        this.state.groupsRef.on('child_added', snap => {
            // whenever child added (message or anything else) execute these
            allGroups.push(snap.val());
            this.setState({allGroups: allGroups} )

        })
    }
    componentWillUnmount(){

    }
    displayGroups = groups => (
        groups && groups.map(group => (
            <MenuItem  key={group.id} value={group.groupName}>
                {group.groupName}
            </MenuItem>

        ))
    )


    handleChange = name => event => {
        this.setState({
            [name]: event.target.value,
        });
    };

    handleSubmit = event => {
        event.preventDefault();
        this.UpdateUser()
    }

    UpdateUser = () => {
        const {firstName, lastName, email, password, group, phone, usersRef, profile, currentUser, refName}= this.state;
        const key = usersRef.push().key
        const updateUser = {
            firstName: firstName ? firstName : profile.firstName,
            lastName: lastName ? lastName: profile.lastName,
            email: email ? email : profile.email ,
            phone: phone ? phone : '' ,
           // password:  password ?  password : profile.password ,
            group:  group?  group : '' ,
        }
       
        this.setState({loading: true})
        firebase.database().ref(refName)
            .child(currentUser.uid)
            .update(updateUser)
            .then(()=> {
                this.setState({loading: false})
            })
            .catch(err=> {
                console.log(err);
                this.setState({loading: false})
            })
    }


    deleteUser= id => {
        this.setState({loading: true})
        this.state.usersRef.child(id)
            .remove(err => {
                this.setState({loading: false})
                if (err !== null) {
                    console.error(err);
                }else{
                    console.log('no error');
                }
            });
    }



    render() {
        const { classes } = this.props;
        const {loading, users, profile} = this.state
        return (
            <div>
                <Header/>
                <div className="block_container">
                    <h1>Update profile</h1>
                    <form className={classes.container} noValidate autoComplete="off">
                        <FormControl margin="normal" required fullWidth>
                            <TextField
                                required
                                label={profile.firstName ? profile.firstName : 'First Name'}
                                type="text"
                                className={classes.textField}
                                margin="normal"
                                onChange={this.handleChange('firstName')}
                            />
                            <TextField
                                required
                                type="text"
                                className={classes.textField}
                                margin="normal"
                                label={profile.lastName ? profile.lastName : 'Last Name'}
                                onChange={this.handleChange('lastName')}
                            />
                        </FormControl>
                        <FormControl margin="normal" required fullWidth>
                            <TextField
                                required
                                label={profile.email ? profile.email : 'Email'}
                                type="email"
                                className={classes.textField}
                                margin="normal"
                                onChange={this.handleChange('email')}
                            />
                            <TextField
                                required
                                id="standard-password-input"
                                label='Password'
                                className={classes.textField}
                                type="password"
                                autoComplete="current-password"
                                margin="normal"
                                onChange={this.handleChange('password')}
                            />
                        </FormControl>

                        <FormControl margin="normal" required fullWidth>
                            <TextField
                                id="standard-number"
                                label={profile.phone ? profile.phone : 'Phone number' }
                                value={this.state.age}
                                onChange={this.handleChange('phone')}
                                type="number"
                                className={classes.textField}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                margin="normal"
                            />
                        </FormControl>
                        <FormControl margin="normal" required fullWidth>
                            <TextField
                                id="standard-select-currency"
                                select
                                label={profile.group ? profile.group : 'Group' }
                                className={classes.textField}
                                value={this.state.group}
                                onChange={this.handleChange('group')}
                                SelectProps={{
                                    MenuProps: {
                                        className: classes.menu,
                                    },
                                }}
                                helperText="Please select your currency"
                                margin="normal"
                            >
                                { this.displayGroups(this.state.allGroups)}
                            </TextField>
                        </FormControl>
                        <br/>
                        <FormControl margin="normal" required fullWidth>
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                onClick={this.handleSubmit}
                                disabled={loading}

                            >
                                Update User
                            </Button>
                        </FormControl>

                    </form>
                </div>
            </div>
        );
    }
}

UpdateUser.propTypes = {
    classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    currentUser: state.user.currentUser
});


export default connect(mapStateToProps)(withStyles(styles)(UpdateUser));