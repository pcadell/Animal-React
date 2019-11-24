import React, { Component } from 'react'
import '../App.css';
import CreateReviewForm from '../CreateReviewForm'
import ReviewList from '../ReviewList'
import ReviewEditModal from '../ReviewEditModal'

// review container loads on click from a button that is in the AlbumList
export default class ReviewContainer extends Component {
	constructor(props){
		super(props)

		this.state = ({
			reviews: [],
			editModalOpen: false,
			reviewToEdit: {
				content: ''
			}
		})

	}

	componentDidMount(){
		this.getReviews();
	}

	handleEditChange = (event) => {
		this.setState({
			reviewToEdit: {
				...this.state.reviewToEdit, 
				[event.target.name]: event.target.value
			}
		})
	}

	getReviews = async () => {
		try {
			const reviews = await fetch(process.env.REACT_APP_API_URL + '/api/v1/reviews/')
			const parsedReviews = await reviews.json()
			this.setState({
				reviews: parsedReviews.data
			})
		} catch(err) {
			console.error(err)
		}
	}

	deleteReview = async (id) => {
		console.log(id);
		const deleteReviewResponse = await fetch(process.env.REACT_APP_API_URL + '/api/v1/reviews/' + id, {
			method: 'DELETE',
			credentials: 'include'
		}); 
		const deleteReviewParsed = await deleteReviewResponse.json();
		console.log(deleteReviewParsed);
		this.setState({reviews: this.state.reviews.filter((reviews) => reviews.id !== id)});
	}

	render(){
    return (
      <React.Fragment>
        <CreateReviewForm addReview={this.props.addReview} album={this.props.album}/>
        <ReviewList reviewsFound={this.state.reviews} album={this.props.album} deleteReview={this.deleteReview}/>
      </React.Fragment>
    )
	}
}

