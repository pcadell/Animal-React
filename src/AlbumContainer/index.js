import React, { Component } from 'react';
import { Grid, Button } from 'semantic-ui-react';
import '../App.css';
import AlbumList from '../AlbumList';
import CreateAlbum from '../CreateAlbumForm';
import EditAlbumModal from '../EditAlbumModal';

export default class AlbumContainer extends Component {
	constructor(props){
		super(props)
// make it so the create album form doesn't load if smoeone's not logged in
		this.state = {
		albums: [],
		reviews:[],
		editModalOpen: false,
		reviewFocus: false, // default to -1, otherwise set to album.id
		albumToEdit:{
			title:'',
			artist:'', 
			album_cover:'',
			genre:'',
			},
		chosenGenre: this.props.chosenGenre, 
		numberOfReviewsOpen: 0
		}
	}
	componentDidMount(){
		this.getAlbums();
	}

// if we pass the album being toggled up here and compared that to another value, it could only run the toggle if the value === -1
	toggleReviewFocus = () => {
		// if (this.state.reviewFocus) {
			this.setState({
				reviewFocus: !this.state.reviewFocus // -1
			})
		// } else {
		// 	this.setState({
		// 		reviewFocus: true // album.id
		// 	})
		// }
	}

	addReview = async (e, reviewFromForm) => {
		e.preventDefault();
		console.log("e :", e)
		console.log("reviewFromForm: ", reviewFromForm)

		try {
			const createdReviewResponses = await fetch(process.env.REACT_APP_API_URL + '/api/v1/reviews/' + reviewFromForm.album, {
				method: 'POST',
				credentials: 'include',
				body: JSON.stringify(reviewFromForm),
				headers: {
					'Content-Type': 'application/json'
				}
			})
			const parsedResponse = await createdReviewResponses.json();
			console.log(parsedResponse, ' this is review submission response')
			this.setState({reviews: [...this.state.reviews, parsedResponse.data]})
		} catch(err) {
			console.error(err)
		}
	}

	getAlbums = async () => {
		try {
			const albums = await fetch(process.env.REACT_APP_API_URL + '/api/v1/albums/');
			const parsedAlbums = await albums.json();
			this.setState({
				albums: parsedAlbums.data
			})
		} catch(err) {
			console.error(err)
		}
	}
	addAlbum = async (e, albumFromTheForm) => {
		e.preventDefault();
		try {
			const createdAlbumResponse = await fetch(process.env.REACT_APP_API_URL + '/api/v1/albums/', {
				method: 'POST',
				credentials: 'include',
				body: JSON.stringify(albumFromTheForm), 
				headers: {
					'Content-Type': 'application/json'
				}
			})
			const parsedResponse = await createdAlbumResponse.json();
			console.log(parsedResponse, ' this is response');
			this.setState({albums: [...this.state.albums, parsedResponse.data]})
		
		} 	catch(err){
			console.log('error');
			console.log(err);
		}
	}

	editAlbum = (idOfAlbumToEdit) => {
		const albumToEdit = this.state.albums.find(album => album.id === idOfAlbumToEdit)	
		this.setState({
			editModalOpen: true, 
			albumToEdit:{
				...albumToEdit
			}
		})
	}

	handleEditChange = (event) => {
		this.setState({
			albumToEdit: {
				...this.state.albumToEdit, 
				[event.target.name]: event.target.value
			}
		})
	}

	increaseNumberOfReviewsOpen = (operation) => {
		if (operation === 'add') {
			this.setState({
				numberOfReviewsOpen: this.state.numberOfReviewsOpen + 1
			})
		} else {
			this.setState({
				numberOfReviewsOpen: this.state.numberOfReviewsOpen - 1
			})
		}
	}

	updateAlbum = async (e) => {
		e.preventDefault()
		try {
			const url = process.env.REACT_APP_API_URL + '/api/v1/albums/' + this.state.albumToEdit.id
			const updateResponse = await fetch(url, {
				method: 'PUT', 
				credentials: 'include', 
				body: JSON.stringify(this.state.albumToEdit),
				headers: {
					'Content-Type': 'application/json'
				}
			})
			const updateResponseParsed = await updateResponse.json()
			const newAlbumsArrayWithUpdate = this.state.albums.map((album) => {
				if(album.id === updateResponseParsed.data.id) {
					album = updateResponseParsed.data
				}
				return album
			})
			this.setState({
				albums: newAlbumsArrayWithUpdate
			})
			this.closeEditModal()
		} catch(err){
			console.log(err)
		}
	}


	closeEditModal = () => {
		this.setState({
			editModalOpen: false
		})
	}
	render(props){
		return(
			<Grid
				columns={4} 
				divided
				textAlign='center'
				style={{height: '100%'}}
				verticalAlign='top'
				stackable
			>
				<Grid.Row>
		          	<Grid.Column>
		          	<Button color='blue' onClick={()=>this.props.chooseGenre('')}>Back To Genres</Button>
		          	</Grid.Column>
		          	<Grid.Column>
		          	{ 
		          		this.state.numberOfReviewsOpen === 0 // if (this.state.reviewFocus === -1)
		          		?
	           			<CreateAlbum addAlbum={this.addAlbum}/>
	           			:
	           			null
		          	}
	         		</Grid.Column>
	         		<EditAlbumModal
	         			open={this.state.editModalOpen}
	         			updateAlbum={this.updateAlbum}
	         			albumToEdit={this.editAlbum}
	         			closeEditModal={this.closeEditModal}
	         			handleEditChange={this.handleEditChange}
	         			/>
					<Grid.Column>
						<AlbumList 
							albums={this.state.albums}
							editAlbum={this.editAlbum}
							chosenGenre={this.props.chosenGenre}
							addReview={this.addReview}
							reviewFocus={this.state.reviewFocus}
							toggleReviewFocus={this.toggleReviewFocus}
							increaseNumberOfReviewsOpen={this.increaseNumberOfReviewsOpen}
						/>
					</Grid.Column>
				</Grid.Row>
			</Grid>
		)
	}

}
