import React, { Component } from 'react';
import { Grid } from 'semantic-ui-react';
import '../App.css';
import GenreList from '../GenreList';
import AlbumList from '../AlbumList';
import CreateAlbum from '../CreateAlbumForm';
import EditAlbumModal from '../EditAlbumModal'

export default class AlbumContainer extends Component {
	constructor(){
		super()

		this.state = {
		albums: [],
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
	addAlbum = async (e, albumFromTheForm) => {
		e.preventDefault();
		try {
			const createdAlbumResponse = await fetch(process.env.REACT_APP_API_URL + '/api/v1/albums', {
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

	handleEditChange = (event) => {
		this.setState({
			albumToEdit: {
				...this.state.albumToEdit, 
				[event.target.name]: event.target.value
			}
		})
	}

	updateAlbum = async (e) => {
		e.preventDefault()
		try {
			const url = process.env.REACT_APP_API_URL + '/api/v1/albums' + this.state.albumToEdit.id
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
			this.closeModal()
		} catch(err){
			console.log(err)
		}
	}

	closeModal = () => {
		this.setState({
			editModalOpen: false
		})
	}
	render(){
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
				<AlbumList 
					albums={this.state.albums}
					editAlbum={this.editAlbum}
				/>
				</Grid.Column>
	          		<Grid.Column>
           			<CreateAlbum addAlbum={this.addAlbum}/>
         			</Grid.Column>
         			<EditAlbumModal
         			open={this.state.editModalOpen}
         			updateAlbum={this.updateAlbum}
         			albumToEdit={this.editAlbum}
         			closeModal={this.closeModal}
         			handleEditChange={this.handleEditChange}
         			/>
			</Grid.Row>
			</Grid>
		)
	}

}
