package vn.codegym.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import vn.codegym.backend.model.Book;
import vn.codegym.backend.service.IBookService;

import java.util.Optional;

@RestController
@RequestMapping("api/book")
@CrossOrigin
public class BookController {
    @Autowired
    private IBookService bookService;

    @GetMapping
    public ResponseEntity<Page<Book>> findAll(@PageableDefault(value = 8) Pageable pageable) {
        return new ResponseEntity<>(bookService.findAll(pageable), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Book> findById(@PathVariable Long id) {
        Optional<Book> bookOptional = this.bookService.findById(id);
        if (!bookOptional.isPresent()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(bookOptional.get(), HttpStatus.OK);
    }
}
