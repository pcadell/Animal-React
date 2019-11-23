  
import React from 'react'
import { Form, Button, Label, Header, Modal } from 'semantic-ui-react';
  
function EditAlbumModal(props) {
  return(
    <Modal open={props.open} closeIcon onClose={props.closeModal}>
      <Header>Edit Album</Header>
      <Modal.Content>
        <Form onSubmit={props.updateAlbum}>
        <Label> Title: </Label>
        <Form.Input type="text" name="title" value={props.albumToEdit.title} onChange={props.handleEditChange} />
        <Label> Artist: </Label>
        <Form.Input type="text" name="artist" value={props.albumToEdit.artist} onChange={props.handleEditChange} />
        <Label> Album Cover: </Label>
        <Form.Input type="text" name="album_cover" value={props.albumToEdit.album_cover} onChange={props.handleEditChange} />
        <Label> Genre: </Label>
        <Form.Input type="text" name="genre" value={props.albumToEdit.genre} onChange={props.handleEditChange} />
        <Modal.Actions>
        <Button color='red' type="submit"> Update Album </Button>
        </Modal.Actions>
      </Form>
    </Modal.Content>
    </Modal>
  )
}

export default EditAlbumModal