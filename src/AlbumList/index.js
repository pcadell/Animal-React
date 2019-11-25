import React, { Component } from 'react';
import { Card, Button, Image } from 'semantic-ui-react';
import ReviewContainer from '../ReviewContainer'

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
		if (this.state.reviewsShowing === false){ // === -1
				this.setState({
					reviewsShowing: true //  set boolean to album.id
				})
			} else {
				this.setState({
					reviewsShowing: false // set boolean to -1
				})
			}
		this.props.toggleReviewFocus()
		console.log('\n reviewsShowing in albumlist is: ',this.state.reviewsShowing)
	}
 // pass ln 45 this.showReviews(album.id)

	render(){
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
									<Button onClick={() => this.showReviews()}>Reviews</Button> 
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