import { useEffect, useState, useRef } from "react";
import { Routes, Route } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';
import Header from "./components/Header";
import NoteList from "./components/NoteList";
import { getNotes, getArchived, saveNote } from "./api/NoteService";
import NoteDetail from "./components/NoteDetail";
import { toastError, toastSuccess} from './api/ToastService';
import { ToastContainer } from 'react-toastify';

function App() {
  const modalRef = useRef();
  const [data, setData] = useState({});
  const [currentPage, setCurrentPage] = useState(0);
  const [values, setValues] = useState({
    createdAt: '',
    title: '',
    content: ''
  });   

  const getAllNotes = async (page = 0, size = 8) => {
    try {
      setCurrentPage(page);
      const { data } = await getNotes(page, size);
      setData(data);
      console.log(data);
    } catch (error) {
      console.log(error);
      toastError(error.message);
    }
  };

  const onChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
    console.log(values)
  };

  const handleNewNote = async (event) => {
    event.preventDefault();
    try{
      const{ data } = await saveNote(values);
      toggleModal(false);
      setValues( {
        createdAt: '',
        title: '',
        content: '',
      })
      getAllNotes();
      toastSuccess('Note Updated');
      console.log(data)
    }catch(error){
      console.log(error)
      toastError(error.message);
    }
  };

  const updateNote = async (note) => {
    try {
      const { data } = await saveNote(note);
      console.log(data);
      toastSuccess('Note Updated');
    } catch (error) {
      console.log(error);
      toastError(error.message);
    }
  };

  const getAllArchived = async (page = 0, size = 8) => {
    try {
      setCurrentPage(page);
      const { data } = await getArchived(page, size);
      setData(data);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  const toggleModal = show => show ? modalRef.current.showModal() : modalRef.current.close();

  const handleBackToList = () => {
    getAllNotes();
  };
  
  useEffect(() => {
    getAllNotes();
  }, []);

  return (
    <>
      <Header 
        toggleModal={toggleModal}
        nbOfNotes={data.totalElements}
        getAllNotes={getAllNotes}
        getAllArchived={getAllArchived}
      />
      <main className="main">
        <div className="container">
          <Routes>
            <Route
              path="/notes"
              element={
                <NoteList
                  data={data}
                  currentPage={currentPage}
                  getAllNotes={getAllNotes}
                  getAllArchived={getAllArchived}
                />
              }
            />
            <Route path="/notes/:noteId" 
            element={
              <NoteDetail
                updateNote={updateNote}
                onBackToList={handleBackToList}
              />
            } />
          </Routes>
        </div>
      </main>

      {/* Modal */}
      <dialog ref={modalRef} className="modal" id="modal">
        <div className="modal__header">
          <h3>New Note</h3>
        </div>
        <div className="divider"></div>
        <div className="modal__body">
          <form onSubmit={handleNewNote}>
            <div className="user-details">
              <div className="input-box">
                <span className="details">Title:</span>
                <input type="text" value={values.title} onChange={onChange} name='title' required  />
              </div>
              <div className="input-box">
                <span className="details">Content:</span>
                <input type="text" value={values.content} onChange={onChange} name='content' required  />
              </div>
              <div className="input-box">
                <span className="details">Date:</span>
                <input type="text" value={values.createdAt} 
                onChange={onChange} name='createdAt' required />
              </div>
            </div>
            <div className="form_footer">
              <button onClick={() => toggleModal(false)} type='button' className="btn btn-danger">Cancel</button>
              <button type='submit' className="btn">Save</button>
            </div>
          </form>
        </div>
      </dialog>
      <ToastContainer />
    </>
  );
}
export default App
