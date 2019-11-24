import React from 'react'
import { Modal, Form, Button, Label, Header } from 'semantic-ui-react'
import CreateReviewForm from '../CreateReviewForm'

export default function ReviewList(props){
	const reviews = props.reviewsFound.filter(review => review.album.id === props.id).map((review)=>{
		return (
			<React.Fragment key={review.id}>>
				<small>{review.created_at}</small>
				<p>{review.content}</p>
			</React.Fragment>
			)
	})
	console.log('props', props)
	console.log('\n reviews found in ReviewList: ',reviews)
	return(
		<React.Fragment>
		{ reviews }
		</React.Fragment>
		)
}