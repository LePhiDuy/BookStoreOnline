package vn.codegym.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.data.web.SortDefault;
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
    public ResponseEntity<Page<Book>> findAll(@SortDefault(sort = "yearPublish", direction = Sort.Direction.DESC) @PageableDefault(value = 12) Pageable pageable) {
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

    @GetMapping("/findByAuthor")
    public ResponseEntity<Page<Book>> findByAuthor(@SortDefault(sort = "yearPublish", direction = Sort.Direction.DESC) @RequestParam String author, @PageableDefault(value = 12) Pageable pageable) {
        return new ResponseEntity<>(bookService.findBookByAuthor(author, pageable), HttpStatus.OK);
    }

    @GetMapping("/category/{id}")
    public ResponseEntity<Page<Book>> findByCategory(@SortDefault(sort = "yearPublish", direction = Sort.Direction.DESC) @PathVariable Long id, @PageableDefault(value = 12) Pageable pageable) {
        return new ResponseEntity<>(bookService.findByCategory(id, pageable), HttpStatus.OK);
    }

    @GetMapping("/search")
    public ResponseEntity<Page<Book>> search(@SortDefault(sort = "yearPublish", direction = Sort.Direction.DESC) @RequestParam String q, @PageableDefault(value = 12) Pageable pageable) {
        return new ResponseEntity<>(bookService.search(q, pageable), HttpStatus.OK);
    }

}
