package dev.gabyyhshss.NotesApi.resource;

import dev.gabyyhshss.NotesApi.domain.Tag;
import dev.gabyyhshss.NotesApi.service.TagService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;

@RestController
@RequestMapping("/api/v1/tags")
@RequiredArgsConstructor
public class TagResource {
    private final TagService tagService;
    @GetMapping
    public ResponseEntity<Page<Tag>> getTags(@RequestParam(value = "page", defaultValue = "0") int page,
                                             @RequestParam(value = "size", defaultValue = "10") int size){
        return ResponseEntity.ok().body(tagService.getAllTag(page, size));
    }
    @PostMapping
    public ResponseEntity<Tag> createTag(@RequestBody Tag tag){
        return ResponseEntity.created(URI.create("/tags/userID")).body(tagService.createTag(tag));
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteNote(@PathVariable("id") int id){
        Tag tag = tagService.getTag(id);
        tagService.deleteNote(tag);
        return ResponseEntity.noContent().build();
    }
}
