import React from 'react';
import { Card, Button } from 'semantic-ui-react';

function AlbumList(props){
	const albums = props.albums.filter(album => album.genre === props.chosenGenre).map((album) => {
		return (
			<Card key={album.id}>
			<Card.Content>
			<Card.Header>{album.title}</Card.Header>
			<Card.Description>{album.artist}</Card.Description>
			<Card.Description>{album.album_cover}</Card.Description>
			<Card.Description>{album.genre}</Card.Description>
			</Card.Content>
			<Card.Content extra>
				<Button onClick={() => props.editAlbum(album.id)}>Edit Album</Button>
				</Card.Content>
			<div>
				<Button onClick={() => props.addReview(album.id)}>Create a Review</Button>
			</div>
			</Card>
		)
	})
	return (
		<Card.Group>
			{ albums }
		</Card.Group>	
	)
}

export default AlbumList