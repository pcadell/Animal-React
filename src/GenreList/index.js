import React from 'react'
import { Button } from 'semantic-ui-react'

export default function GenreList(props){

// onClick points to the calling of function that's passed in as props
// when that's clicked it changes a status relating to GenreContainer
// disappearing the Genre Container and 

	const genres = props.genres.map((genre, i) => {
		return(
			<div key={i}>
				<Button onClick={()=>props.chooseGenre(genre.genre)}>{genre.genre}</Button>
			</div>
			)
	})

	return(
		<div>
			{genres}
		</div>
		)
	


}