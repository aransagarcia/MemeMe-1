import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'


class Landing extends Component {
    constructor() {
        super()
        this.state = {
            email: '',
            password: '',
        }
    }

    // submitForm is the function used to handle the onSubmit event for the form in the render 
    submitForm = async (event) => {
        event.preventDefault();

        console.log(event.target)
        console.log(this.state)
        console.log('here would go our network request to create a new user')

        let loginURL = 'http://localhost:3001/users/all/active'
       try {
        let response = await axios.get(loginURL)
       let payload = response.data.payload
       console.log(payload)
       for (let i =0; i < payload.length; i++){
           let current = payload[i]
           if (current.email === this.state.email && current.user_passowrd === this.state.password){
               console.log('yay')
           } else{
               console.log('nah')
           }
       }

       } catch (error){
           console.log(error, 'axios not working')
       }
    }


    // handleInput is the function responsible for updating the state everytime user presses a key
    handleInput = ({target: {id, value}}) => this.setState({ [id]: value })


    render() {
        let {
            state: {
                email,
                password,
            },
            submitForm,
            handleInput,
        } = this

        return (
            <form onSubmit ={this.submitForm}>
                <h2>Landing page</h2>
                <label htmlFor="email">email: </label>
                <input 
                    id="email"
                    type="email"
                    name="email"
                    value={email}
                    onChange={handleInput}
                    placeholder="email@domain.org"
                /><br/>
                <label htmlFor="password">password: </label>
                <input 
                    id="password"
                    type="password"
                    name="password"
                    value={password}
                    onChange={handleInput}
                    placeholder="password"
                /><br/>
                <button type="submit">Log In</button><br/><br/>
                <Link to='./signup'>New to Meme Me?<br/>Sign Up here.</Link>
            </form>
        )
    }
}


export default Landing