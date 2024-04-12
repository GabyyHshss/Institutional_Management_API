import React from 'react'
import { Link } from 'react-router-dom'

const Note = ({ note }) => {
  return (
    <Link to={`/notes/${note.noteId}`} className="note__item">
            <div className="note__header">
                <div className="note__details">
                    <p className="note__title">{note.createdAt}</p>
                    {note.archived && <p className="note__archived">Archived</p>}
                </div>
                <p className="note__name">{note.title} </p>
            </div>
            <div className="note__body">
                <p>{note.content} </p>
            </div>
            <div className="note__tag">
                {note.tags.map(tag => (
                    <p className="note__title__tag" key={tag.tagId}>{tag.tagName}</p>
                ))}
            </div>
        </Link>
  )
}
export default Note