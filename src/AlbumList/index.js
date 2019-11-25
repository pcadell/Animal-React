import React, { Component } from 'react';
import { Modal, Form, Button, Label, Header, Card, Image } from 'semantic-ui-react';
import ReviewContainer from '../ReviewContainer'
import CreateAlbum from '../CreateAlbumForm'
import AlbumContainer from '../AlbumContainer'

class AlbumList extends Component {
	constructor(props){
		super(props)
		this.state = ({
			reviewsShowing: -1
		})
	}
	componentDidMount(){

	}
	// When reviews button is clicked, 
	// if the albumId already === this.state.reviewsShowing, 
	// this will run the focus of toggling between the create albums 
	// and showing the reviews and reviewsShowing is set to -1. 
	// else It passes the album id to the reviewslist to see reviews for that album. 
	// 		if the button is clicked in another album to show those reviews for that albumId, 
	// That will close the previous reviews.

	showReviews = (props) => {
		if (props === this.state.reviewsShowing){
			this.props.toggleReviewFocus()
			this.setState({
				reviewsShowing: -1
			})
		} else {
			this.setState({
				reviewsShowing: props
			})
		}

		////if (this.state.reviewsShowing === -1){
		//	} else {
		//		this.setState({
		//			reviewsShowing: albumId
		//		})
		//	}
		//console.log('\n reviewsShowing in albumlist is: ',this.state.reviewsShowing)
	}


	render(props){
		const albums = 
			this.props.albums.filter(album => album.genre === this.props.chosenGenre).map((album) => {
				return (
					<React.Fragment  key={album.id}>
						<Card>
						    <Image src={album.album_cover} wrapped ui={false} />
							<Card.Content>
								<Card.Header>{album.title}</Card.Header>
								<Card.Description>{album.artist}</Card.Description>
								<Card.Description>{album.genre}</Card.Description>
							</Card.Content>
								<Card.Content extra>
									<Button onClick={() => this.props.editAlbum(album.id)}>Edit Album</Button>
									<Button onClick={() => this.showReviews(album.id)}>Reviews</Button>
								</Card.Content>
						</Card>
						{
							this.state.reviewsShowing === album.id
							? 
							<ReviewContainer addReview={this.props.addReview} albumlist={this.props.albumlist} album={album.id} reviewsShowing={this.state.reviewsShowing}/>
							:
							 null
						}
					</React.Fragment>
				)
			})
		return (
			<Card.Group>
				{ albums }
			</Card.Group>	
		)
	}
}

export default AlbumList