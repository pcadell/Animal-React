import React from 'react'
import { Modal, Form, Button, Label, Header } from 'semantic-ui-react'
import CreateReviewForm from '../CreateReviewForm'


export default function ReviewList(props){
	const reviews = props.reviewsFound.filter(review => review.album.id === props.album).map((review)=>{
		return (
			<React.Fragment key={review.created_at}>
				<p>{review.content}</p>
				<small>{review.created_at}</small>
				<Button onClick={() => props.editReview(review.id)}>Edit Review</Button>
				<p><Button onClick={() => props.deleteReview(review.id)}>Delete Review</Button></p>
			</React.Fragment>
			)
	})
	return(
		<React.Fragment>
		{ reviews }
		</React.Fragment>
		)
}
