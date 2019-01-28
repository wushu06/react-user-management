import React from 'react';
import firebase from "../../firebase";

class UpdateUser extends React.Component {


    handleSubmit = (state, collection, userId) => {

        let errors = [];
        let loading = false;
        let result;
        const {firstName, lastName, email, password, group, holiday,isAdmin, phone, usersRef,profile , currentUser}= state;
        console.log(firstName);
        const updateUser = {
            firstName: firstName ? firstName : profile.firstName,
            lastName: lastName ? lastName: profile.lastName,
            email: email ? email : profile.email ,
            phone: phone ? phone : '' ,
            // password:  password ?  password : profile.password ,
            group:  group?  group : '' ,
            holiday: holiday ? holiday : profile.holiday,
            isAdmin:  isAdmin
        }


        firebase.database().ref(collection).child('users')
            .child(userId)
            .update(updateUser)
            .then(()=> {
                // reset password maybe
            })
            .catch(err=> {
                console.log(err);
            })


    };

    isPasswordValid = (password) => {
        console.log(password);
        return password.length > 6;
    };


}

export default UpdateUser;