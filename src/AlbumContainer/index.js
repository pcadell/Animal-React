import React, { Component } from 'react';
import AlbumList from '../AlbumList';
import CreateAlbum from '../CreateAlbumForm';
import EditAlbumModal from '../EditAlbumModal';
import CreateReview from '../CreateReviewForm';
import { Grid } from 'semantic-ui-react';
import '../App.css';

class AlbumContainer extends Component {
	constructor(props){
		super(props)

		this.state = {
		albums: [],
		reviews:[],
		editModalOpen: false,
		albumToEdit:{
			title:'',
			artist:'', 
			album_cover:'',
			genre:''
			}
		}
	}
	componentDidMount(){
		this.getAlbums();
	}

<<<<<<< HEAD
	getAlbums = async () => {
		try {
			const albums = await fetch(process.env.REACT_APP_API_URL + '/api/v1/albums/');
			const parsedAlbums = await albums.json();
			console.log(parsedAlbums)
			this.setState({
				albums: parsedAlbums.data
			})
		} catch(err) {
			console.error(err)
		}
	}
	addReview = async (e, albumId) => {
=======
	addReview = async (e, reviewFromForm) => {
		e.preventDefault();
		console.log("e :", e.value)
		console.log("reviewFromForm: ", reviewFromForm)

>>>>>>> 653a6907b47dd84c5b223a1d45a15f8a3e4940b4
		const body = {
			album: e.value,
			content: reviewFromForm
		}
		try {
			const createdReviewResponses = await fetch(process.env.REACT_APP_API_URL + '/api/v1/reviews/', {
				method: 'POST',
				credentials: 'include',
				body: JSON.stringify(body),
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

<<<<<<< HEAD
=======


	getAlbums = async () => {
		try {
			const albums = await fetch(process.env.REACT_APP_API_URL + '/api/v1/albums/');
			const parsedAlbums = await albums.json();
//			console.log(parsedAlbums)
			this.setState({
				albums: parsedAlbums.data
			})
		} catch(err) {
			console.error(err)
		}
	}
>>>>>>> 653a6907b47dd84c5b223a1d45a15f8a3e4940b4
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
    const albumToEdit = this.state.album.find(album => album.id === idOfAlbumToEdit)
    this.setState({
      editModalOpen: true, 
      albumToEdit: {
        ...albumToEdit
      }
    })
  }

	handleEditChange = (event) => {
		this.setState({
			albumToEdit: {
<<<<<<< HEAD
				...this.state.albumToEdit,
=======
				...this.state.albumToEdit, 
>>>>>>> 653a6907b47dd84c5b223a1d45a15f8a3e4940b4
				[event.target.name]: event.target.value
			}
		})
	}

<<<<<<< HEAD
=======

>>>>>>> 653a6907b47dd84c5b223a1d45a15f8a3e4940b4
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
				columns={2} 
				divided
				textAlign='center'
				style={{height: '100%'}}
				verticalAlign='top'
				stackable
			>
				<Grid.Row>
		          	<Grid.Column>
	           			<CreateAlbum addAlbum={this.addAlbum}/>
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
						/>
					</Grid.Column>
				</Grid.Row>
			</Grid>
		)
	}

}
export default AlbumContainer