import React, { Component } from 'react';
import { Card, Button } from 'semantic-ui-react';
import ReviewContainer from '../ReviewContainer'

class AlbumList extends Component {
	constructor(props){
		super(props)
		this.state = ({
			reviewsShowing: false
		})
	}

	showReviews = () => {
		if (this.state.reviewsShowing === false){
				this.setState({
					reviewsShowing: true
				})
			} else {
				this.setState({
					reviewsShowing: false
				})
			}
		console.log('\n reviewsShowing in albumlist is: ',this.state.reviewsShowing)
	}


	render(){
		const albums = 
			this.props.albums.filter(album => album.genre === this.props.chosenGenre).map((album) => {
				return (
					<React.Fragment  key={album.id}>
						<Card>
						<Card.Content>
							<Card.Header>{album.title}</Card.Header>
							<Card.Description>{album.artist}</Card.Description>
							<Card.Description>{album.album_cover}</Card.Description>
							<Card.Description>{album.genre}</Card.Description>
						</Card.Content>
							<Card.Content extra>
								<Button onClick={() => this.props.editAlbum(album.id)}>Edit Album</Button>
								<Button onClick={() => this.showReviews()}>Reviews</Button>
								<Button onClick={() => this.props.addReview(album.id)}>Create Review</Button>
							</Card.Content>
						</Card>
						{
							this.state.reviewsShowing 
							? 
							<ReviewContainer addReview={this.props.addReview} albumlist={this.props.albumlist} album={album.id}/> 
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