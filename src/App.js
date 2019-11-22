import React, { Component } from 'react';
import './App.css';
import AlbumContainer from './AlbumContainer';
import LoginRegistrationForm from './LoginRegistrationForm';
import GenreContainer from './GenreContainer';
import { Button } from 'semantic-ui-react'


class App extends Component {
  constructor(){
    super()

    this.state = {
      loggedIn: false,
      loggedInUserEmail: null,
      genreChosen: ''
    }
  }

  login = async (loginInfo) => {

    const response = await fetch(process.env.REACT_APP_API_URL + '/api/v1/users/login', { 
      method: 'PUT',
      credentials: 'include', 
      body: JSON.stringify(loginInfo), 
      headers: { 
        'Content-Type': 'application/json'
      }
    })
    const parsedLoginResponse = await response.json()
    if (parsedLoginResponse.status.code === 200) {
      this.setState({
        loggedIn: true,
        loggedInUserEmail: parsedLoginResponse.data.email
      })
    }
    else {
      console.log("Log In Failed:")
      console.log(parsedLoginResponse)
    }
  }

  logout = async () => {
    const response = await fetch(process.env.REACT_APP_API_URL + '/api/v1/users/logout', {
      method: "GET",
      credentials: 'include'
    })
    this.setState({
      loggedIn: false,
          loggedInUserEmail: null
      })

  }

    register = async (registerInfo) => {
      const response = await fetch(process.env.REACT_APP_API_URL + '/api/v1/users/register', {
        method: "POST",
        credentials: 'include',
        body: JSON.stringify(registerInfo),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      const parsedRegisterResponse = await response.json()

      if (parsedRegisterResponse.status.code === 201){
        this.setState({
          loggedIn: true,
          loggedInUserEmail: parsedRegisterResponse.data.email
        })
      } else {
        console.log('Register failed, fool:')
        console.log(parsedRegisterResponse)
      }
    }

    chooseGenre = (genre) => {
      this.setState({
        genreChosen: genre
      })
    }

  render(){
    return (
      <div className="App">
        {
          this.state.loggedIn
          ?
         <Button onClick={()=>this.logout()}>Get Outta Here</Button>
         :
         <LoginRegistrationForm login={this.login} register={this.register}/>
        }
          {
          this.state.genreChosen === ''
          ?
            <GenreContainer chooseGenre={this.chooseGenre}/>
          :
            <AlbumContainer chosenGenre={this.state.genreChosen}/>
          }
      </div>
    );}
}

export default App;