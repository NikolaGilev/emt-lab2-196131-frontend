package com.example.biblioteka.web;


import com.example.biblioteka.model.Book;
import com.example.biblioteka.model.BookDto.BookDto;
import com.example.biblioteka.model.Enumerators.CategoryType;
import com.example.biblioteka.service.BookService;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.awt.print.Pageable;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping({"/api","/api/books"})
public class HomeController {
    private final BookService bookService;


    public HomeController(BookService bookService) {
        this.bookService = bookService;
    }


    @GetMapping
    private List<Book> findAll() {
        return this.bookService.findAll();
    }
    @GetMapping("/pagination")
    private Page<Book> findAllWithPagination(Pageable pageable) {
        return this.bookService.findAllWithPagination(pageable);
    }

    @GetMapping("/categories")
    private List<String> findAllCategories() {
        return Arrays.stream(CategoryType.values()).map(Enum::toString).collect(Collectors.toList());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Book> findById(@PathVariable Long id){
        return bookService.findById(id).map(b->ResponseEntity.ok().body(b))
                .orElseGet(()->ResponseEntity.notFound().build());
    }

    @PostMapping("/add")
    public ResponseEntity<Book> save(@RequestBody BookDto book){
        return bookService.save(book).map(b->ResponseEntity.ok().body(b))
                .orElseGet(()->ResponseEntity.badRequest().build());
    }

    @PutMapping("/edit/{id}")
    public ResponseEntity<Book> edit(@PathVariable Long id,@RequestBody BookDto book){
        return bookService.edit(id,book).map(b-> ResponseEntity.ok().body(b))
                .orElseGet(()->ResponseEntity.badRequest().build());
    }

    @DeleteMapping("/delete/{id}")
    public void delete(@PathVariable Long id){
        bookService.deleteById(id);
//        System.out.println(bookService.findById(id));
//        if (bookService.findById(id).isEmpty())
//            return ResponseEntity.ok().build();
//        return ResponseEntity.badRequest().build();
    }

    @PutMapping("/iznajmena/{id}")
    public ResponseEntity<Book> iznajmena(@PathVariable Long id){
        return bookService.namaliKolicina(id).map(b->ResponseEntity.ok().body(b))
                .orElseGet(() -> ResponseEntity.badRequest().build());
    }


}
