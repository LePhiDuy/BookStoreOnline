package vn.codegym.backend.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import vn.codegym.backend.model.Book;

import java.util.Optional;

public interface IBookService {
    Page<Book> findAll(Pageable pageable);
    Optional<Book> findById(Long id);
    Page<Book> findBookByAuthor(String author, Pageable pageable);
    Page<Book> findByCategory(Long categoryId, Pageable pageable);
}
