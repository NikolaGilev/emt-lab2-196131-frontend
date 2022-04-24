package com.example.biblioteka.service;

import com.example.biblioteka.model.Author;
import com.example.biblioteka.model.Book;
import com.example.biblioteka.model.BookDto.BookDto;
import com.example.biblioteka.model.Enumerators.*;
import org.springframework.data.domain.Page;

import java.awt.print.Pageable;
import java.util.List;
import java.util.Optional;

public interface BookService {

    Optional<Book> save(String name, CategoryType categoryType, Long authorId, int availableCopies);
    Optional<Book> save(BookDto book);

    Optional<Book> edit(Long id, String name, CategoryType categoryType, Long authorId, int availableCopies);
    Optional<Book> edit(Long id,BookDto book);


    void deleteById(Long id);

    List<Book> findAll();

    Optional<Book> findById(Long id);

    Optional<Book> namaliKolicina(Long id);

    Page<Book> findAllWithPagination(Pageable pageable);
}
