import React, { Component } from 'react';
import {Link} from 'react-router-dom'
import {Button} from '@material-ui/core'
import './App.css';
import Header from './containers/Header';
import ContactForm from './containers/ContactForm'
import Mailjet from 'mailjet-sendemail'
import axios from "axios";
import $ from 'jquery'



class App extends Component {
    componentDidMount(){

    }

    send = () => {
       let data = {
           from: 'nour'
       }


        fetch('http://localhost/mail/mailswift/ums.php', {
            method: "POST",
            body: "from=test",
            headers:
                {
                    "Content-Type": "application/x-www-form-urlencoded"
                }
        }).then( response => {
            console.log(response);
        })
            .catch( error => {
                console.log(error);

            })

    }
  render() {

    return (
      <div className="App">
          <Header/>
        <div className="block_container">

          <h1>home</h1>
            <Button onClick={this.send}>send</Button>
        </div>

      </div>
    );
  }
}

export default App;
