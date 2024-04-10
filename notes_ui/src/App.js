import { useEffect, useState, useRef } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import NoteList from "./components/NoteList";
import { getNotes, getArchived, saveNote } from "./api/NoteService";

function App() {
  const modalRef = useRef();
  const fileRef = useRef();
  const [data, setData] = useState({});
  const [currentPage, setCurrentPage] = useState(0);
  const [file, setFile] = useState(undefined);
  const [values, setValues] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    title: '',
    status: '',
  });   

  const getAllNotes = async (page = 0, size = 10) => {
    try {
      setCurrentPage(page);
      const { data } = await getNotes(page, size);
      setData(data);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  const onChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const handleNewContact = async (event) => {
    event.preventDefault();
    try {
      const { data } = await saveNote(values);
      const formData = new FormData();
      formData.append('file', file, file.name);
      formData.append('id', data.id);
      toggleModal(false);
      setFile(undefined);
      fileRef.current.value = null;
      setValues({
        name: '',
        email: '',
        phone: '',
        address: '',
        title: '',
        status: '',
      })
      getAllNotes();
    } catch (error) {
      console.log(error);
    }
  };

  const getAllArchived = async (page = 0, size = 10) => {
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
          <form onSubmit={handleNewContact}>
            <div className="user-details">
              <div className="input-box">
                <span className="details">Date:</span>
                <input type="text" value={values.name} onChange={onChange} name='name' required  autoComplete="name"/>
              </div>
              <div className="input-box">
                <span className="details">Title:</span>
                <input type="text" value={values.email} onChange={onChange} name='email' required  />
              </div>
              <div className="input-box">
                <span className="details">Content:</span>
                <input type="text" value={values.title} onChange={onChange} name='title' required  />
              </div>
              <div className="input-box">
              <p className="details">Tag:</p>
                <select className="input">
                  <option value="">Open this select menu</option>
                </select>
              </div>
            </div>
            <div className="form_footer">
              <button onClick={() => toggleModal(false)} type='button' className="btn btn-danger">Cancel</button>
              <button type='submit' className="btn">Save</button>
            </div>
          </form>
        </div>
      </dialog>
    </>
  );
}
export default App
