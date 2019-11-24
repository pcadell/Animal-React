import React from 'react'
import { Modal, Form, Button, Label, Header } from 'semantic-ui-react'
import CreateReviewForm from '../CreateReviewForm'


export default function ReviewList(props){
	const reviews = props.reviewsFound.filter(review => review.album.id === props.album).map((review)=>{
		return (
			<React.Fragment key={review.created_at}>
				<p>{review.content}</p>
				<small>{review.created_at}</small>
				<p><Button onClick={() => props.deleteReview(review.content)}>Delete Review</Button></p>
			</React.Fragment>
			)
	})
	return(
		<React.Fragment>
		{ reviews }
		</React.Fragment>
		)
}
