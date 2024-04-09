package dev.gabyyhshss.NotesApi.repository;

import dev.gabyyhshss.NotesApi.domain.Tag;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ITag extends JpaRepository<Tag, Integer> {

}
