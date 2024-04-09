package dev.gabyyhshss.NotesApi.resource;

import dev.gabyyhshss.NotesApi.constant.Constant;
import dev.gabyyhshss.NotesApi.domain.Note;
import dev.gabyyhshss.NotesApi.domain.Tag;
import dev.gabyyhshss.NotesApi.repository.INote;
import dev.gabyyhshss.NotesApi.repository.ITag;
import dev.gabyyhshss.NotesApi.service.NoteService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;

@RestController
@RequestMapping("/api/v1/notes")
@RequiredArgsConstructor
public class NoteResource {
    private final NoteService noteService;
    @Autowired
    private final INote noteRepository;
    @Autowired
    private final ITag tagRepository;
    @GetMapping
    public ResponseEntity<Page<Note>> getNotes(@RequestParam(value = "page", defaultValue = "0") int page,
                                               @RequestParam(value = "size", defaultValue = "10") int size){
        return ResponseEntity.ok().body(noteService.getAllNotes(page, size));
    }
    @GetMapping("/{id}")
    public ResponseEntity<Note> getNote(@PathVariable(value = "id") int id){
        return ResponseEntity.ok().body(noteService.getNote(id));
    }
    // FILTER NOTES BY TAG
    @GetMapping("/tag/{tag}")
    public ResponseEntity<?> getNotesByTag(
            @PathVariable("tag") String tag,
            @RequestParam(value = "page", defaultValue = "0") int page,
            @RequestParam(value = "size", defaultValue = "10") int size) {
        try {
            Page<Note> notesPage = noteService.getNotesByTag(tag, page, size);
            return ResponseEntity.ok().body(notesPage);
        } catch (RuntimeException e) {
            String errorMessage = "No se encontraron notas para la categoría: " + tag;
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new Constant(errorMessage));
        }
    }
    // ACTIVE / ARCHIVED
    @GetMapping("/active")
    public ResponseEntity<Page<Note>> getActiveNotes(
            @RequestParam(value = "page", defaultValue = "0") int page,
            @RequestParam(value = "size", defaultValue = "10") int size) {
        return ResponseEntity.ok().body(noteService.getActiveNotes(page, size));
    }
    @GetMapping("/archived")
    public ResponseEntity<Page<Note>> getArchivedNotes(
            @RequestParam(value = "page", defaultValue = "0") int page,
            @RequestParam(value = "size", defaultValue = "10") int size) {
        return ResponseEntity.ok().body(noteService.getArchivedNotes(page, size));
    }
    @PostMapping
    public ResponseEntity<Note> createNote(@RequestBody Note note){
        //
        return ResponseEntity.created(URI.create("/notes/userID")).body(noteService.createNote(note));
    }
    // SET
    @PutMapping("/note-tag")
    public Note updateNote(@RequestParam int note_id, @RequestParam int tag_id){
        Note note = noteRepository.findById(note_id)
                .orElseThrow(() -> new RuntimeException("Note not found"));
        Tag tag = tagRepository.findById(tag_id)
                .orElseThrow(() -> new RuntimeException("Tag not found"));
        note.getTags().add(tag);
        return noteRepository.save(note);
    }
    @PutMapping("/archive/{id}")
    public ResponseEntity<Note> archiveNote(@PathVariable("id") int id) {
        return ResponseEntity.ok().body(noteService.archiveNote(id));
    }

    @PutMapping("/unarchive/{id}")
    public ResponseEntity<Note> unarchiveNote(@PathVariable("id") int id) {
        return ResponseEntity.ok().body(noteService.unarchiveNote(id));
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteNote(@PathVariable("id") int id) {
        Note note = noteService.getNote(id);
        noteService.deleteNote(note);
        return ResponseEntity.noContent().build();
    }
}
