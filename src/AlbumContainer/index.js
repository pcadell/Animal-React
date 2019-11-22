import React, { Component } from 'react';
import { Grid } from 'semantic-ui-react';
import '../App.css';
import GenreList from './GenreList'

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
		
		genres: []
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
		}
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
					<GenreList
					genres={this.state.genre}
					/>
				</Grid.Column>
			</Grid.Row>
			</Grid>
			)
	}

}
