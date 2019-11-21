import React, { Component } from 'react';
import { Grid } from 'semantic-ui-react';
import '../App.css';

export default class AlbumContainer extends Component {
	constructor(){
		super()

		this.state = {
		albums: [],
		genres: []
	}
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
	render(){
		return(
			<React.Fragment>
				This is a place-holder
			</React.Fragment>
			)
	}

}
