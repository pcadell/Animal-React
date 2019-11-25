import React, { Component } from 'react';
import { Modal, Form, Button, Label, Header, Card, Image } from 'semantic-ui-react';
import ReviewContainer from '../ReviewContainer'
import CreateAlbum from '../CreateAlbumForm'

class AlbumList extends Component {
	constructor(props){
		super(props)
		this.state = ({
			reviewsShowing: this.props.reviewFocus
		})
	}
	componentDidMount(){

	}

	showReviews = (props) => {
		if (this.state.reviewsShowing === false){
				this.setState({
					reviewsShowing: true
				})
			} else {
				this.setState({
					reviewsShowing: false
				})
			}
		this.props.toggleReviewFocus()
		console.log('\n reviewsShowing in albumlist is: ',this.state.reviewsShowing)
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