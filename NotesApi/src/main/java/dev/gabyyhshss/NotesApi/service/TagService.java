package dev.gabyyhshss.NotesApi.service;

import dev.gabyyhshss.NotesApi.domain.Tag;
import dev.gabyyhshss.NotesApi.repository.ITag;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional(rollbackFor = Exception.class)
@RequiredArgsConstructor
public class TagService {
    private final ITag tagRepository;

    public Page<Tag> getAllTag(int page, int size){
        return tagRepository.findAll(PageRequest.of(page, size, Sort.by("tagName")));
    }
    public Tag getTag(int id){
        return tagRepository.findById(id).orElseThrow(() -> new RuntimeException("Note not found"));
    }
    /**
     * The following method is used to 'create' a tag, but is also used
     * to 'update' that tag by passing an existing 'id'.
     */
    public Tag createTag(Tag tag){
        return tagRepository.save(tag);
    }
    public void deleteNote(Tag tag){
        tagRepository.delete(tag);
    }
}
