import React, { useState } from 'react';

const Header = ({ toggleModal, nbOfNotes, getAllArchived, getAllNotes}) => {
  const [isArchivedView, setIsArchivedView] = useState(false);

  const toggleView = () => {
    if (isArchivedView) {
      setIsArchivedView(false);
      getAllNotes()
    } else {
      setIsArchivedView(true);
      getAllArchived()
    }
  };

  return (
    <header className='header'>
        <div className='container'>
            <h3>Note List: ({nbOfNotes})</h3>
            <button onClick={toggleView} className='btn'>
              {isArchivedView ? 'View active notes' : 'View archived notes'}
            </button>
            <button onClick={() => toggleModal(true)} className='btn'>
                <i className='bi bi-plus-square'></i> Add New Contact
            </button>
        </div>
    </header>
  )
}
export default Header;