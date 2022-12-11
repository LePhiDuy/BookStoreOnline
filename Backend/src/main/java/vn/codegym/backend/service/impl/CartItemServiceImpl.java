package vn.codegym.backend.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import vn.codegym.backend.model.CartItem;
import vn.codegym.backend.repository.ICartItemRepository;
import vn.codegym.backend.service.ICartItemService;

import java.sql.Date;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class CartItemServiceImpl implements ICartItemService {
    @Autowired
    private ICartItemRepository cartItemRepository;
    @Override
    public List<CartItem> findCartItemByUsername(String username) {
        return cartItemRepository.findCartItemByUsername(username);
    }

    @Override
    public int update(int amount, LocalDateTime dateAdd, Long cartId, Long bookId) {
        return cartItemRepository.update(amount, dateAdd, cartId, bookId);
    }

    @Override
    public Optional<CartItem> findById(Long cartId, Long bookId) {
        return cartItemRepository.findById(cartId, bookId);
    }

    @Override
    public int deleteCartItem(Long cartId, Long bookId) {
        return cartItemRepository.deleteCartItem(cartId, bookId);
    }

    @Override
    public int addToCart(int amount, LocalDateTime dateAdd, Long cartId, Long bookId) {
        return cartItemRepository.addToCart(amount, dateAdd, cartId, bookId);
    }


}
