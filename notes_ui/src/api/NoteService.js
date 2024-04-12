import axios from "axios";

const API_URL = 'http://localhost:8080/api/v1/notes';
const API_URL_2 = 'http://localhost:8080/api/v1/notes/archived';
//const API_URL_3 = 'http://localhost:8080/api/v1/notes/active';


export async function getNotes(page = 0, size = 10) {
    return await axios.get(`${API_URL}?page=${page}&size=${size}`);
}

export async function getArchived(page = 0, size = 10) {
    return await axios.get(`${API_URL_2}?page=${page}&size=${size}`);
}

export async function getNote(noteId) {
    return await axios.get(`${API_URL}/${noteId}`);
}

export async function saveNote(note) {
    return await axios.post(API_URL, note);
}

export async function updateNote(note) {
    return await axios.post(API_URL, note);
}