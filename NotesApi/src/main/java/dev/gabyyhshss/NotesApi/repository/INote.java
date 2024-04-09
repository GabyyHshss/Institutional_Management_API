package dev.gabyyhshss.NotesApi.repository;

import dev.gabyyhshss.NotesApi.domain.Note;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface INote extends JpaRepository<Note, Integer> {
    Optional<Note> findById(int id);
    Page<Note> findByArchivedFalse(Pageable pageable);
    Page<Note> findByArchivedTrue(Pageable pageable);
    Page<Note> findByTagsTagName(String tagName, Pageable pageable);
}
