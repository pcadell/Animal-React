import React from 'react'
import { Modal, Form, Button, Label, Header } from 'semantic-ui-react'
import CreateReviewForm from '../CreateReviewForm'

export default function ReviewList(props){
	const reviews = props.reviewsFound.filter(review => review.album === props.id).map((review)=>{
		console.log('\n reviews found in ReviewList: ',reviews)
		return (
			<React.Fragment key={review.id}>>
				<small>{review.created_at}</small>
				<p>{review.content}</p>
			</React.Fragment>
			)
	})
	return(
		<React.Fragment>
		{ reviews }
		</React.Fragment>
		)
}