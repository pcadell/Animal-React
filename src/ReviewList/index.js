import React from 'react'
import { Modal, Form, Button, Label, Header } from 'semantic-ui-react'
import CreateReviewForm from '../CreateReviewForm'

export default function ReviewList(props){
	const reviews = props.reviews.filter(review => review.album === props.id).map((review)=>{
		return (
			<div>
				<small>{review.created_at}</small>
				<p>{review.content}</p>
			</div>
			)
	})
}