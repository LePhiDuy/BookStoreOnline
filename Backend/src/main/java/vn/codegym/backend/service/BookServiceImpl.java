package vn.codegym.backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import vn.codegym.backend.model.Book;
import vn.codegym.backend.repository.IBookRepository;

import java.util.Optional;

@Service
public class BookServiceImpl implements IBookService{
    @Autowired
    private IBookRepository bookRepository;
    @Override
    public Page<Book> findAll(Pageable pageable) {
        return bookRepository.findAll(pageable);
    }

    @Override
    public Optional<Book> findById(Long id) {
        return this.bookRepository.findById(id);
    }

    @Override
    public Page<Book> findBookByAuthor(String author, Pageable pageable) {
        return bookRepository.findBookByAuthor(author, pageable);
    }

}
