import React from 'react'
<<<<<<< HEAD
import { Form, Button, Label, Header, Modal} from 'semantic-ui-react';

=======
import { Form, Button, Label, Header, Modal } from 'semantic-ui-react';
	
>>>>>>> 653a6907b47dd84c5b223a1d45a15f8a3e4940b4
function EditAlbumModal(props) {

    return(
      <Modal open={props.open} closeIcon onClose={props.closeModal}>
        <Header>Edit Album</Header>
        <Modal.Content>
          <Form onSubmit={props.updateAlbum}>
            <Label> Album: </Label>
            <Form.Input 
              type="text"  
              name="title" 
              value={props.albumToEdit.title} 
              onChange={props.handleEditChange}
            />
            <Label> Artist: </Label>
            <Form.Input 
              type="text"  
              name="artist" 
              value={props.albumToEdit.artist} 
              onChange={props.handleEditChange}
            />
            <Label> Album Cover: </Label>
            <Form.Input 
              type="text"  
              name="album_cover" 
              value={props.albumToEdit.album_cover} 
              onChange={props.handleEditChange}
            />
            <Label> Genre: </Label>
            <Form.Input 
              type="text"  
              name="genre" 
              value={props.albumToEdit.genre} 
              onChange={props.handleEditChange}
            />
            <Modal.Actions>
              <Button color='green' type="submit">Update Album</Button>
            </Modal.Actions>
          </Form>
        </Modal.Content>
      </Modal>

    )
}

export default EditAlbumModal