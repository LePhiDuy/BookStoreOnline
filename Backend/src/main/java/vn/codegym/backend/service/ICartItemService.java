package vn.codegym.backend.service;

import vn.codegym.backend.model.CartItem;

import java.sql.Date;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

public interface ICartItemService {
    List<CartItem> findCartItemByUsername(String username);
    int update(int amount, LocalDateTime dateAdd, Long cartId, Long bookId);
    Optional<CartItem> findById(Long cartId, Long bookId);
    int deleteCartItem(Long cartId, Long bookId);
    int addToCart(int amount, LocalDateTime dateAdd, Long cartId, Long bookId);
}
