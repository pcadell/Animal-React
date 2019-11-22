import React from 'react'

export default function ReviewList(props){
	const reviews = props.reviews.filter(review => review.album === props.id)map((review)=>{
		return (
			<div>
				<small>{review.created_at}</small>
				<p>{review.content}</p>
			</div>
			)
	})
}