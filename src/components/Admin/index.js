import React from 'react';
import AddUser from './AddUser';
import AddGroup from './AddGroup'
import {Grid} from '@material-ui/core'
import {connect} from "react-redux";
import Header from '../../containers/Header'


class Admin extends React.Component {


    render() {
        return (
            <div>
                <Header/>
                <div className="block_container">

                    <h1>Admin</h1>
                    <Grid container spacing={24}>
                        <Grid item xs={6}>
                            <AddGroup/>
                        </Grid>
                        <Grid item xs={6}>

                            <AddUser groups={this.props.allGroups}/>
                        </Grid>
                    </Grid>
                </div>
            </div>

        )
    }
}
const mapStateFromProps = state => ({
    allGroups: state.groups.allGroups
});
export default connect(mapStateFromProps)(Admin);