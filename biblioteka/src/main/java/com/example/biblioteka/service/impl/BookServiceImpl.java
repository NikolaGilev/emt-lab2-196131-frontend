package com.example.biblioteka.service.impl;

import com.example.biblioteka.model.Author;
import com.example.biblioteka.model.Book;
import com.example.biblioteka.model.BookDto.BookDto;
import com.example.biblioteka.model.Enumerators.CategoryType;

import com.example.biblioteka.repo.BookRepository;
import com.example.biblioteka.repo.AuthorRepository;

import com.example.biblioteka.service.BookService;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

import java.awt.print.Pageable;
import java.util.List;
import java.util.Optional;

@Service
public class BookServiceImpl implements BookService {
    private final BookRepository bookRepository;
    private final AuthorRepository authorRepository;

    public BookServiceImpl(BookRepository bookRepository, AuthorRepository authorRepository) {
        this.bookRepository = bookRepository;
        this.authorRepository = authorRepository;
    }

    @Override
    public Optional<Book> save(String name, CategoryType categoryType, Long authorId, int availableCopies) {
        Author a = authorRepository.findById(authorId).orElseThrow();

        return Optional.of(bookRepository.save(new Book(name, categoryType, a, availableCopies)));
    }

    @Override
    public Optional<Book> save(BookDto book) {
        Author a = authorRepository.findById(book.getAuthorId()).orElseThrow();

        return Optional.of(bookRepository.save(new Book(book.getName(), book.getCategory(), a, book.getAvailableCopies())));
    }

    @Override
    public Optional<Book> edit(Long id, String name, CategoryType categoryType, Long authorId, int availableCopies) {
        Book b = bookRepository.getById(id);
        b.setName(name);
        b.setCategory(categoryType);

        Author a = authorRepository.findById(authorId).orElseThrow();
        b.setAuthor(a);

        b.setAvailableCopies(availableCopies);
        return Optional.of(bookRepository.save(b));
    }

    @Override
    public Optional<Book> edit(Long id, BookDto book) {
        Book b = bookRepository.getById(id);
        b.setName(book.getName());
        b.setCategory(book.getCategory());

        Author a = authorRepository.findById(book.getAuthorId()).orElseThrow();
        b.setAuthor(a);

        b.setAvailableCopies(book.getAvailableCopies());
        return Optional.of(bookRepository.save(b));
    }

    @Override
    public void deleteById(Long id) {
        this.bookRepository.deleteById(id);
    }

    @Override
    public List<Book> findAll() {
        return bookRepository.findAll();
    }

    @Override
    public Optional<Book> findById(Long id) {
        return Optional.of(bookRepository.findById(id).orElseThrow());
    }

    @Override
    public Optional<Book> namaliKolicina(Long id) {
        Book b=bookRepository.findById(id).orElseThrow();
        b.setAvailableCopies(b.getAvailableCopies()-1);


        return Optional.of(bookRepository.save(b));
    }

    @Override
    public Page<Book> findAllWithPagination(Pageable pageable) {
        return this.bookRepository.findAll((org.springframework.data.domain.Pageable) pageable);
    }
}
