import React, { Component } from 'react';
import { Form, Button, Label, Segment } from 'semantic-ui-react';

class CreateAlbum extends Component {
	constructor(){
		super();
		this.state = {
			title: '',
			artist: '',
			album_cover: '',
			genre: ''
		}
	}
handleChange = (e) => {
	this.setState({[e.currentTarget.name]: e.currentTarget.value})
}
render(){
	return(
		<Segment>
		<h4>Create Album</h4>
		<Form onSubmit={(e) => this.props.addAlbum(e, this.state)}>
			<Label>Album:</Label>
			<Form.Input type='text' name='title' value={this.state.title} onChange={this.handleChange}/>
			<Label>Artist:</Label>
			<Form.Input type='text' name='artist' value={this.state.artist} onChange={this.handleChange}/>
			<Label>Album Cover:</Label>
			<Form.Input type='text' name='album_cover' value={this.state.album_cover} onChange={this.handleChange}/>
			<Label>Genre:</Label>
			<Form.Input type='text' name='genre' value={this.state.genre} onChange={this.handleChange}/>
			<Button type='Submit'>Create Album</Button>
		</Form>
		</Segment>
	)
}
}

export default CreateAlbum;