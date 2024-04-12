import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { getNote } from "../api/NoteService";
import { toastError } from '../api/ToastService';

const NoteDetail = ({ updateNote, onBackToList }) => {
  const [note, setNote] = useState({
    noteId: "",
    createdAt: "",
    title: "",
    content: "",
  });

  const navigate = useNavigate();

  const { noteId } = useParams();
  console.log(noteId);

  const fetchNote = async (noteId) => {
    try {
      const { data } = await getNote(noteId);
      setNote(data);
      console.log(data);
      //toastSuccess('Note retrieved');
    } catch (error) {
      console.log(error);
      toastError(error.message);
    }
  };

  const onChange = (event) => {
    setNote({ ...note, [event.target.name]: event.target.value });
  };

  const onUpdateNote = async (event) => {
    event.preventDefault();
    await updateNote(note);
    fetchNote(noteId);
    onBackToList();
    navigate('/Notes');
  };

  useEffect(() => {
    fetchNote(noteId);
  }, [noteId]);

  return (
    <>
      <Link to={"/notes"} className="link" onClick={onBackToList}>
        Back to List
      </Link>
      <div className="profile">
        <div className="profile__settings">
          <div>
            <form onSubmit={onUpdateNote} className="form">
              <div className="user-details">
                <input
                  type="hidden"
                  defaultValue={note.noteId}
                  name="id"
                  required
                />
                <div className="input-box">
                  <span className="details">Title</span>
                  <input
                    type="text"
                    value={note.title}
                    onChange={onChange}
                    name="title"
                    required
                  />
                </div>
                <div className="input-box">
                  <span className="details">Content</span>
                  <textarea
                    value={note.content}
                    onChange={onChange}
                    name="content"
                    required
                  />
                </div>
                <div className="input-box">
                  <span className="details">Date</span>
                  <input
                    type="text"
                    value={note.createdAt}
                    onChange={onChange}
                    name="createdAt"
                    required
                  />
                </div>
                <div className="form_footer">
                  <button type="submit" className="btn">
                    Save
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default NoteDetail;
