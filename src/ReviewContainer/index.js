import React, { Component } from 'react'
import '../App.css';

// review container loads on click from a button that is in the AlbumList
export default class ReviewContainer extends Component {
	constructor(){
		super()

		this.state({
			reviews: []
		})

	}

	componentDidMount(){

	}

	getReviews = async () => {
		try {
			const reviews = await fetch(process.env.REACT_APP_API_URL + '/api/v1/reviews/')
			const parsedReviews = await reviews.json()
			console.log(parsedReviews)
			this.setState({
				reviews: parsedReviews.data
			})
		} catch(err) {
			console.error(err)
		}
	}

	render(){
		return(
			<CreateReviewForm />
			)
	}
}

// review list should load when 