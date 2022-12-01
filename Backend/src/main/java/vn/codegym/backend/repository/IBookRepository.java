package vn.codegym.backend.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import vn.codegym.backend.model.Book;

public interface IBookRepository extends JpaRepository<Book, Long> {
    Page<Book> findBookByAuthor(String author, Pageable pageable);
    @Query(value = "select `book`.`id`, `book`.`amount`, `book`.`author`, `book`.`description`,\n" +
            "`book`.`img_url`, `book`.`language`, `book`.`name`, `book`.`number_rating`, `book`.`price`, \n" +
            "`book`.`publisher`, `book`.`total_pages`, `book`.`weight`, `book`.`year_publish`, `book`.`category_id`\n" +
            "from `book` join category on `book`.`category_id` = `category`.`id` where `category`.`id` = ?", nativeQuery = true)
    Page<Book> findByCategory(Long categoryId, Pageable pageable);
}
