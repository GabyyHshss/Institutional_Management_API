import axios from "axios";

const API_URL = 'http://localhost:8080/api/v1/notes/active';
const API_URL_2 = 'http://localhost:8080/api/v1/notes/archived';

export async function getNotes(page = 0, size = 10) {
    return await axios.get(`${API_URL}?page=${page}&size=${size}`);
}

export async function getArchived(page = 0, size = 10) {
    return await axios.get(`${API_URL_2}?page=${page}&size=${size}`);
}

export async function saveNote(note) {
    return await axios.post(API_URL, note);
}
