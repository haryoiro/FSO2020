import React, { useState, useEffect } from 'react'

// import Notification from './components/Notification'
import Note from './components/Note'
import noteService from './services/notes'

const App = () => {
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState('')
  const [showAll, setShowAll] = useState(true)
  // const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    console.log('effect')
    noteService
      .getAll()
      .then(initialNotes => {
        setNotes(initialNotes)
      })
  }, [])

  // submitされた際に実行されるハンドラ関数
  const addNote = (event) => {
    event.preventDefault()
    // 新しいノートのためのオブジェクト
    const noteObject = {
      content: newNote,
      date: new Date(),
      important: Math.random() > 0.5,
    }
    noteService
      .create(noteObject)
      .then(returnedNote => {
        setNotes(notes.concat(returnedNote))
        setNewNote('')
      })
  }

  const handleNoteChange = (event) => {
    setNewNote(event.target.value)
  }

  const notesToShow = showAll
    ? notes
    : notes.filter(note => note.important)

  const toggleImportanceOf = id => {
    const note = notes.find(n => n.id === id)
    console.log(note)
    const changedNote = {
      ...note,
      important: !note.important
    }

    noteService
    .update(id, changedNote)
    .then(returnedNote => {
      console.log(returnedNote)
      setNotes(notes.map(note => note.id !== id ? note : changedNote))
    })
    .catch(err => {
      console.log(err)
    })
  }

  return (
    <div>
      <h1>Notes</h1>
      {/* <Notification message={errorMessage}/> */}
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? 'important' : 'all' }
        </button>
      </div>
      <ul>
        {notesToShow.map(note => (
          <Note
            key={note.id}
            note={note}
            toggleImportance={() => toggleImportanceOf(note.id)} />))
        }
      </ul>
      <form onSubmit={addNote}>
        <input
          value={newNote}
          onChange={handleNoteChange}
        />
        <button type="submit">save</button>
      </form>
    </div>
  )
}

export default App