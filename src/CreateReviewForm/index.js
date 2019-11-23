import React, { Component } from 'react';
import { Form, Button, Label, Segment } from 'semantic-ui-react';

class CreateReview extends Component{
	constructor(){
		super();

		this.state = {
			content: ''
		}
	}
	handleChange = (e) => {
		this.setState({[e.currentTarget.name] : e.currentTarget.value})
	}
	render(){ 
		return(
			<Segment>
				<h4> Create Review</h4> 
				<Form onSubmit={(e) => this.props.addReview(e, this.state)}>
				<Label>Leave your review here</Label>
				<Form.Input type='text' name='review' value={this.state.review} onChange={this.handleChange}/>
				<Button type='Submit'>Submit Review</Button>
			</Form>
			</Segment>
		)
	}
}

export default CreateReview;