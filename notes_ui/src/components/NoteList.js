import React from 'react';
import Note from "./Note";

const NoteList = ({ data, currentPage, getAllNotes }) => {
    return (
        <main className='main'>
            {data?.content?.length === 0 && <div>No hay notas activas. Por favor, desarchiva una nota</div>}

            <ul className='note__list'>
                {data?.content?.length > 0 && data.content.map(note => <Note note={note} key={note.noteId} />)}
            </ul>
            {data?.content?.length > 0 && data?.totalPages > 1 &&
            <div className='pagination'>
                <button onClick={() => getAllNotes(currentPage - 1)} className={currentPage === 0 ? 'disabled' : ''}>&laquo;</button>

                { data && [...Array(data.totalPages).keys()].map((page, index) => 
                    <button onClick={() => getAllNotes(page)} className={currentPage === page ? 'active' : ''} key={page}>{page + 1}</button>)}

                <button onClick={() => getAllNotes(currentPage + 1)} className={data.totalPages === currentPage + 1 ? 'disabled' : ''}>&raquo;</button>
            </div>            
            }
        </main>
    )
}
export default NoteList;
