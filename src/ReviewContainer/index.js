import React, { Component } from 'react'
import '../App.css';
import CreateReviewForm from '../CreateReviewForm'
import ReviewList from '../ReviewList'

// review container loads on click from a button that is in the AlbumList
export default class ReviewContainer extends Component {
	constructor(){
		super()

		this.state = ({
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
			<React.Fragment>
				<ReviewList reviewsFound={this.state.reviews}/>
				<CreateReviewForm addReview={this.props.addReview} album={this.props.album}/>
			</React.Fragment>
			)
	}
}

