import React from 'react'
import { Form, Button, Label, Header, Modal } from 'semantic-ui-react';
	
export default function ReviewEditModal(props) {
	return(
		<Modal open={props.open} closeIcon onClose={props.closeModal}>
			<Header>Edit Review</Header>
			<Modal.Content>
				<Form onSubmit={props.updateReview}>
				<Label> Content: </Label>
				<Form.Input type="text" name="content" value={props.reviewToEdit.content} onChange={props.handleEditChange} />
				<Modal.Actions>
				<Button color='red' type="submit"> Update Review </Button>
				</Modal.Actions>
			</Form>
		</Modal.Content>
		</Modal>
	)
}
