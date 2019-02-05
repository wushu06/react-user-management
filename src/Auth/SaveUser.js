import React from 'react';
import md5 from "md5";
import firebase from "../firebase";

class SaveUser extends React.Component {


   handleSubmit = (state, collection) => {
       let errors = [];
       let loading = false;
       let result;
       let menuURL =  "http://react.nourdigital.com/wp-json/wp/v2/users";
       let token = ''
       fetch(menuURL, {
           method: 'post',
           headers: {
               'Accept': 'application/json, text/plain, */*',
               'Content-Type': 'application/json',
               "Authorization": "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC9yZWFjdC5ub3VyZGlnaXRhbC5jb20iLCJpYXQiOjE1NDkyMTE0MzMsIm5iZiI6MTU0OTIxMTQzMywiZXhwIjoxNTQ5ODE2MjMzLCJkYXRhIjp7InVzZXIiOnsiaWQiOiIxIn19fQ.6NlTjVNliJ_pBzwLFyy2pknEJ8AY5sxf3ziTc_yR7sw",

           },
           body: JSON.stringify({
               username:state.email,
               name: state.companyName,
               password: state.password,
               email:state.email})
       }).then(res=>res.json())
           .then(res => {
               console.log(res);

               if(collection){
                   this.addCollection(res, state)
                   window.localStorage.setItem('userId', res.id);
                   window.localStorage.setItem('userCompanyName', res.name);
               }else{

                   this.saveUser(res, state)
               }


           })
           .then(err=>{
               console.log(err);
               return {loading: false, errors: errors.concat({message: 'Something went wrong, Please contact the team.'})};
           })



    };


    saveUser = (createdUser,  state) => {
        let collection = state.companyName.replace(/[^a-zA-Z0-9]/g, '');
        let avatar =  `http://gravatar.com/avatar/${md5(
            state.email
        )}?d=identicon`
        // for the rest of users + admin

        // for admins only (companies)
        firebase.database().ref(collection)
            .child('users')
            .child(createdUser.id)
            .set({
                firstName: state.firstName,
                lastName: state.lastName,
                companyName: state.companyName,
                email: state.email,
                avatar: avatar,
                id: createdUser.id,
                isAdmin: state.isAdmin,
                group: ' ',
                holiday: {
                    remainingDays: 0,
                    range: []
                }
            })
    }
    addCollection = (createdUser, state) => {
        let collection = state.companyName.replace(/[^a-zA-Z0-9]/g, '');
        // const key = firebase.database().ref(collection).push().key
        let avatar =  `http://gravatar.com/avatar/${md5(
            state.email
        )}?d=identicon`
        const key = createdUser.id
        const newUser = {
            id: key,
            firstName: state.firstName,
            lastName: state.lastName,
            companyName: state.companyName,
            email: state.email,
            avatar: avatar,
            isAdmin: state.isAdmin,
            holiday: {
                remainingDays: 0,
                range: []
            }

        }
        firebase.database().ref(collection)
            .child(key)
            .update(newUser)
            .then(()=> {
                console.log('company created');
                this.saveUser(createdUser, state )

            })
            .catch(err=> {
                console.log(err);
            })


   }
}

export default SaveUser;
