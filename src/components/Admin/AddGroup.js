import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import {TextField, FormControl,Icon,  Button, Checkbox, FormControlLabel} from '@material-ui/core'
import firebase from '../../firebase';
import {connect} from 'react-redux';
import {getGroups} from '../../action'

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

const groups = [
    {
        value: 'digital',
        label: 'digital',
    },
    {
        value: 'account',
        label: 'account',
    },
    {
        value: 'design',
        label: 'design',
    },
    {
        value: 'seo',
        label: 'seo',
    },
];


class AddGroup extends React.Component {
    state = {
        group: '',
        loading: false,
        groupName: '',
        groupDescription: '',
        groupsRef: firebase.database().ref('groups'),
        usersRef: firebase.database().ref('users'),
        groups: [],
        users: [],
        checked:{},
        companyName: this.props.currentUser.displayName
    };

    componentDidMount() {
        let loadgroups = [],
            collection = this.state.companyName.replace(/[^a-zA-Z0-9]/g, '');
        firebase.database().ref(collection).child('groups').on('child_added', snap => {
            // whenever child added (message or anything else) execute these
            loadgroups.push(snap.val());
            this.setState({groups: loadgroups, checked: []}, ()=> this.props.getGroups(loadgroups) )

        });
        firebase.database().ref(collection).child('groups').on('child_removed', snap => {
            // whenever child added (message or anything else) execute these
            loadgroups.pop(snap.val());
            this.setState({groups: loadgroups, checked: []}, ()=> this.props.getGroups(loadgroups) )

        });
        let loadUsers = [];
        firebase.database().ref(collection).child('users').on('child_added', snap => {
            // whenever child added (message or anything else) execute these
            loadUsers.push(snap.val());
            this.setState({users: loadUsers} )

        })
        firebase.database().ref(collection).child('users').on('child_removed', snap => {
            // whenever child added (message or anything else) execute these
            loadUsers.pop(snap.val());
            this.setState({users: loadUsers} )

        })

    }

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value,
        });
    };
    handleChangeCheckbox = uid => event => {
        let checked = this.state.checked
        let inc = [...checked]


        if(inc.length > 0){
            let check = inc.find(item => {
                return item.id === uid;
            })
            if(check) {
                 inc = inc.filter(function(value, index, arr){
                     console.log( value.id, uid);
                    return value.id !== uid;
                });
            }else{
                inc.push({firstName:event.target.value, id: uid})
            }

        }else {
            inc.push({firstName: event.target.value, id: uid})
        }



        this.setState({
            checked:  inc
        }, ()=> console.log(this.state.checked));
    }

    handleSubmit = event => {
        event.preventDefault();
        this.AddGroup()
    }

    AddGroup = () => {
        let collection = this.state.companyName.replace(/[^a-zA-Z0-9]/g, '');
        const {groupName, groupDescription, groupsRef, checked}= this.state;
        const key =  firebase.database().ref(collection).push().key
        const newUser = {
            id: key,
            groupName: groupName,
            groupDescription: groupDescription,
            users: checked
        }
        firebase.database().ref(collection).child('groups')
            .child(key)
            .update(newUser)
            .then(()=> {
                this.setState({groupName: '', groupDescription: ''})
               // this.props.getGroups(this.state.groups)
                console.log('group created');

            })
            .catch(err=> {
                console.log(err);
            })
    }

    displaygroups = groups => (
        groups.map((group, i)=> (
                <div key={i} >
                    {group.groupName}<Button onClick={()=>this.deleteGroup(group.id)}><Icon >cancel_icon</Icon></Button>
                </div>
            )
        )

    )
    deleteGroup = id => {
        let collection = this.state.companyName.replace(/[^a-zA-Z0-9]/g, '');
        this.setState({loading: true})
        firebase.database().ref(collection).child('groups').child(id)
            .remove(err => {
                this.setState({loading: false})
                if (err !== null) {
                    console.error(err);
                }else{
                    console.log('no error');
                }
            });
    }
    displayUsers = users => (
        users.map((user, i) => {
            let check = this.state.checked.find(item => {
                return item.id === user.id;
            })
            return (<FormControlLabel
                key={i}
                control={
                    <Checkbox
                        checked={check}
                        onChange={this.handleChangeCheckbox(user.id)}
                        value={user.firstName}
                    />
                }
                label={user.firstName}
            />)

        }
    )


)




    render() {
        const { classes } = this.props;
        const {loading, groups, users} = this.state

        return (
            <div>
                <h1>Add group</h1>
                {!loading && this.displaygroups(groups)}
                <form className={classes.container} noValidate autoComplete="off">
                    <FormControl margin="normal" required fullWidth>
                        <TextField
                            required
                            label="Group Name"
                            type="text"
                            value={this.state.groupName}
                            className={classes.textField}
                            margin="normal"
                            onChange={this.handleChange('groupName')}
                        />
                        <TextField
                            label="Group Description"
                            type="text"
                            value={this.state.groupDescription}
                            className={classes.textField}
                            margin="normal"
                            onChange={this.handleChange('groupDescription')}
                        />
                    </FormControl>

                    {this.displayUsers(users)}

                    <FormControl margin="normal" required fullWidth>
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            onClick={this.handleSubmit}
                            disabled={loading}

                        >
                            Add Group
                        </Button>
                    </FormControl>

                </form>
            </div>
        );
    }
}

AddGroup.propTypes = {
    classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    currentUser: state.user.currentUser
});


export default connect(mapStateToProps, {getGroups})(withStyles(styles)(AddGroup));