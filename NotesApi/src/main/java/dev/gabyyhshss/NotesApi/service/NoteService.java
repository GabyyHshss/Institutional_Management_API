package dev.gabyyhshss.NotesApi.service;

import dev.gabyyhshss.NotesApi.domain.Note;
import dev.gabyyhshss.NotesApi.repository.INote;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional(rollbackFor = Exception.class)
@RequiredArgsConstructor
public class NoteService {
    private final INote noteRepository;
    // CRUD
    public Page<Note> getAllNotes(int page, int size){
        return noteRepository.findAll(PageRequest.of(page, size, Sort.by("title")));
    }
    /**
     * The following method is used to 'create' a note, but is also used
     * to 'update' a note by passing an existing 'id'.
     */
    public Note createNote(Note note){
        return noteRepository.save(note);
    }
    public Note getNote(int id){
        return noteRepository.findById(id).orElseThrow(() -> new RuntimeException("Note not found"));
    }
    public void deleteNote(Note note){
        noteRepository.delete(note);
    }

    // ARCHIVE / UNARCHIVE

    /**
     * Methods to MODIFY notes.
     */
    public Note archiveNote(int id) {
        Note note = getNote(id);
        note.setArchived(true);
        return noteRepository.save(note);
    }
    public Note unarchiveNote(int id) {
        Note note = getNote(id);
        note.setArchived(false);
        return noteRepository.save(note);
    }

    // ACTIVE / ARCHIVED (Get)
    public Page<Note> getActiveNotes(int page, int size) {
        return noteRepository.findByArchivedFalse(PageRequest.of(page, size, Sort.by("title")));
    }
    public Page<Note> getArchivedNotes(int page, int size) {
        return noteRepository.findByArchivedTrue(PageRequest.of(page, size, Sort.by("title")));
    }

    // FILTER NOTES BY TAG
    public Page<Note> getNotesByTag(String tag, int page, int size) {
        Page<Note> notes = noteRepository.findByTagsTagName(tag, PageRequest.of(page, size));
        if (notes.isEmpty()) {
            throw new RuntimeException("There's no notes with the following tag: " + tag);
        }
        return notes;
    }
}
