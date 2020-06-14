import { createNote } from '../reducers/noteReducer'
import noteService from '../services/notes'

import React from 'react'
import { useDispatch } from 'react-redux'

function NewNote (props) {
  const dispatch = useDispatch()

  const addNote = async (event) => {
    event.preventDefault()
    const content = event.target.note.value
    event.target.note.value = ''
    const newNote = await noteService.createNew(content)
    dispatch(createNote(newNote))
  }

  return (
    <form onSubmit={addNote}>
      <input name="note" />
      <button type="submit">ADD</button>
    </form>
  )
}

export default NewNote