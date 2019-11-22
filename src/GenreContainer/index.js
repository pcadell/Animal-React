import React, { Component } from 'react'
import { Grid } from 'semantic-ui-react';
import '../App.css';
import GenreList from '../GenreList'


export default class GenreContainer extends Component {
	constructor(props){
		super(props)

		this.state = {
			genres: []
		}
	}

	componentDidMount(){
		this.getGenres();
	}

	getGenres = async () => {
		try {
			const genres = await fetch(process.env.REACT_APP_API_URL + '/api/v1/albums/genres/');
			const parsedGenres = await genres.json();
			console.log('parsed genres in Genre container',parsedGenres)
			this.setState({
				genres: parsedGenres.data
			})
		} catch(err) {
			console.error(err)
		}
	}
	// 			<React.Fragment>
	//			<GenreList genres={this.state.genres}/>
	//		</React.Fragment>


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
						<GenreList
							genres={this.state.genres} chooseGenre={this.props.chooseGenre}
						/>
					</Grid.Column>
				</Grid.Row>
			</Grid>
			)
		}
	}