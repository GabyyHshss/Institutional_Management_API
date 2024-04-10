import React from 'react';
import Note from "./Note"

const NoteList = ({ data}) => {
    return (
        <main className='main'>
            {data?.content?.length === 0 && <div>No active notes. Please unarchive a note</div>}

            <ul className='note__list'>
                {data?.content?.length > 0 && data.content.map(note => <Note note={note} key={note.noteId} />)}
            </ul>
        </main>
    )
}
export default NoteList