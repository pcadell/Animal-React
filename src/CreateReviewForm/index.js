<<<<<<< HEAD
import React, { Component } from 'react';
import { Form, Button, Label, Segment } from 'semantic-ui-react';

class CreateReview extends Component{
	constructor(){
		super();
=======
import React, { Component } from 'react' 
import { Form, Button, Label} from 'semantic-ui-react'

class CreateReview extends Component {
	constructor(props){
		super(props);
>>>>>>> 653a6907b47dd84c5b223a1d45a15f8a3e4940b4

		this.state = {
			content: ''
		}
	}
	handleChange = (e) => {
		this.setState({[e.currentTarget.name] : e.currentTarget.value})
	}
	render(){ 
		return(
			<React.Fragment>
				<h4> Create Review</h4> 
				<Form onSubmit={(e) => this.props.addReview(e, this.state.content)}>
					<Label>Leave your review here</Label>
					<Form.Input type='text' name='content' value={this.state.review} onChange={this.handleChange}/>
					<Button type='Submit'>Submit Review</Button>
				</Form>
			</React.Fragment>
		)
	}
}

export default CreateReview;

// we need to input current user, albumid and content