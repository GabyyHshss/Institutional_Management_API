package dev.gabyyhshss.NotesApi.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.util.Set;

import static com.fasterxml.jackson.annotation.JsonInclude.Include.NON_DEFAULT;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@JsonInclude(NON_DEFAULT) //Consider to use to the front-end dev
@Table(name="notes")
public class Note {
    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    @Column(name="note_id")
    private int noteId;
    @Column(name = "title", length = 45)
    private String title;
    @Column(name = "content", length = 300)
    private String content;
    @Column(name = "created_at", nullable=false)
    private LocalDate createdAt;
    @Column(name = "archived")
    private boolean archived;
    @JsonIgnoreProperties(value = "notes")
    @ManyToMany
    @JoinTable(name = "note_tag",
            joinColumns = {@JoinColumn(name = "note_id", referencedColumnName = "note_id")},
            inverseJoinColumns = {@JoinColumn(name = "tag_id", referencedColumnName = "tag_id")})
    //Delete duplicates
    private Set<Tag> tags;
}
