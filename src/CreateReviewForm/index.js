import React, { Component } from 'react' 
import { Form, Button, Label} from 'semantic-ui-react'

class CreateReview extends Component {
	constructor(props){
		super(props);

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