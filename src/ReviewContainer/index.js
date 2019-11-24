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
      this.closeModal()
      
    } catch(err) {
      console.error(err)
    }

  }

  closeModal = () => {
    this.setState({
      editModalOpen: false
    })
  }

	deleteReview = async (review) => {
		console.log(review);
		const deleteReviewResponse = await fetch(process.env.REACT_APP_API_URL + '/api/v1/reviews/' + review, {
			method: 'DELETE',
			credentials: 'include'
		}); 
		const deleteReviewParsed = await deleteReviewResponse.json();
		console.log(deleteReviewParsed);
		this.setState({reviews: this.state.reviews.filter((reviews) => review)});
	}

	 editReview = (idOfReviewToEdit) => {
    const reviewToEdit = this.state.reviews.find(reviews => reviews.content === idOfReviewToEdit)
    this.setState({
      editModalOpen: true, 
      reviewToEdit: {
        ...reviewToEdit
      }
    })
  }

  	 updateReview = async (e) => {
    e.preventDefault()

    try {
      const url = process.env.REACT_APP_API_URL + '/api/v1/reviews/' + this.state.reviewToEdit.id
      const updateResponse = await fetch(url, {
        method: 'PUT',
        credentials: 'include',
        body: JSON.stringify(this.state.reviewToEdit),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      const updateResponseParsed = await updateResponse.json()

      console.log("response from DB after trying to do update");
      console.log(updateResponseParsed);

      // updating data on screen (let's be v functional about it)
      // iterate over dogs in state, replace the pertinent dog
      // with the data from the updateResponse
      const newReviewArrayWithUpdate = this.state.reviews.map((reviews) => {
        if(reviews.id === updateResponseParsed.data.id) {
          // replace it if it's that one dog
          reviews = updateResponseParsed.data
        }        
        return reviews
      })

      this.setState({
        reviews: newReviewArrayWithUpdate
      })
      this.closeModal()
      
    } catch(err) {
      console.error(err)
    }

  }

  closeModal = () => {
    this.setState({
      editModalOpen: false
    })
  }

	render(){
    return (
      <React.Fragment>
        <CreateReviewForm addReview={this.props.addReview} album={this.props.album}/>
        <ReviewList reviewsFound={this.state.reviews} album={this.props.album} deleteReview={this.deleteReview} editReview={this.editReview}/>
        <ReviewEditModal
         open={this.state.editModalOpen}
            updateReview={this.updateReview}
            reviewToEdit={this.state.reviewToEdit}
            closeModal={this.closeModal}
            handleEditChange={this.handleEditChange}
          />
      </React.Fragment>
    )
	}
}

