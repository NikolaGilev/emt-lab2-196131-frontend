package com.example.biblioteka.model.BookDto;

import com.example.biblioteka.model.Author;
import com.example.biblioteka.model.Enumerators.CategoryType;
import lombok.Data;

import javax.persistence.*;

@Data
public class BookDto {

    private String name;

    @Enumerated(EnumType.STRING)
    private CategoryType category;

    private Long authorId;

    private int availableCopies;


    public BookDto(String name, CategoryType category, Long authorId, int availableCopies) {
        this.name = name;
        this.category = category;
        this.authorId = authorId;
        this.availableCopies = availableCopies;
    }
}
