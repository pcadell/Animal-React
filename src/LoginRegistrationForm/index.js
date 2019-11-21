import React from 'react'
import { Form, Button, Label } from 'semantic-ui-react'

export default class LoginRegisterForm extends React.Component {
	constructor(){
		super()

		this.state={
			'email': '',
			'password': '',
			'username': '',
			action: 'login'
		}
	}

	loginRegister = () => {
		if (this.state.action === 'login') {
			this.props.login({
				email: this.state.email,
				password: this.state.password
			})
		} else {
			this.props.register({
				email: this.state.email,
				username: this.state.username,
				password: this.state.password
			})
		}
	}

	switchForm = () => {
		if (this.state.action === 'login') {
			this.setState({
				action: 'register'
			})
		} else {
			this.setState({
				action: 'login'
			})
		}
	}

	handleChange = (e) => {
		this.setState({
			[e.target.name]: e.target.value
		})
	}

	handleSubmit = (e) => {
		e.preventDefault()
		this.loginRegister()
	}

	render(){
		return(
			<div>
			What you lookin at?
			</div>

			)
	}
}

