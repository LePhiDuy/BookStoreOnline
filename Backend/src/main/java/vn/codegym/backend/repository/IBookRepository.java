package vn.codegym.backend.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import vn.codegym.backend.model.Book;

public interface IBookRepository extends JpaRepository<Book, Long> {
    Page<Book> findBookByAuthor(String author, Pageable pageable);
}
