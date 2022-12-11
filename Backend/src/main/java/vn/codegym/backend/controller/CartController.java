package vn.codegym.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import vn.codegym.backend.model.Book;
import vn.codegym.backend.model.CartItem;
import vn.codegym.backend.payload.response.ResponseMessage;
import vn.codegym.backend.service.IBookService;
import vn.codegym.backend.service.ICartItemService;

import java.sql.Date;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/cart")
@CrossOrigin
public class CartController {
    @Autowired
    private ICartItemService cartItemService;
    @Autowired
    private IBookService bookService;

    @GetMapping("/getCartByUsername")
    public ResponseEntity<List<CartItem>> getCartByUsername(@RequestParam String username) {
        return new ResponseEntity<>(cartItemService.findCartItemByUsername(username), HttpStatus.OK);
    }

    @GetMapping("/updateCartItem")
    public ResponseEntity<ResponseMessage> updateCartItem(@RequestParam Long cartId, @RequestParam Long bookId, @RequestParam int amount) {
        Optional<Book> bookOptional = bookService.findById(bookId);
        if (!bookOptional.isPresent()) {
            return new ResponseEntity<>(new ResponseMessage("Sách không tồn tại."), HttpStatus.BAD_REQUEST);
        }
        if (bookOptional.get().getAmount() < amount) {
            return new ResponseEntity<>(new ResponseMessage("Kho hàng hiện tại không đủ số lượng yêu cầu."), HttpStatus.BAD_REQUEST);
        }
        Optional<CartItem> cartItemOptional = cartItemService.findById(cartId, bookId);
        if (!cartItemOptional.isPresent()) {
            return new ResponseEntity<>(new ResponseMessage("Không tìm thấy giỏ hàng."), HttpStatus.BAD_REQUEST);
        }
        int numberCartUpdate = cartItemService.update(amount, LocalDateTime.now(), cartId, bookId);
        if (numberCartUpdate <= 0) {
            return new ResponseEntity<>(new ResponseMessage("Cập nhật giỏ hàng không thành công"), HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>(new ResponseMessage("Cập nhật giỏ hàng thành công"), HttpStatus.OK);
    }

    @DeleteMapping("/{cartId}/{bookId}")
    public ResponseEntity<ResponseMessage> deleteCartItem(@PathVariable Long cartId, @PathVariable Long bookId) {
        Optional<CartItem> cartItemOptional = cartItemService.findById(cartId, bookId);
        if (!cartItemOptional.isPresent()) {
            return new ResponseEntity<>(new ResponseMessage("Không tồn tại hàng của bạn"), HttpStatus.BAD_REQUEST);
        }
        int numberCartDelete = cartItemService.deleteCartItem(cartId, bookId);
        if (numberCartDelete <= 0) {
            return new ResponseEntity<>(new ResponseMessage("Cập nhật giỏ hàng không thành công"), HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>(new ResponseMessage("Cập nhật giỏ hàng thành công"), HttpStatus.OK);
    }

    @GetMapping("/addToCart")
    public ResponseEntity<ResponseMessage> addToCart(@RequestParam Long cartId, @RequestParam Long bookId, @RequestParam int amount) {
        Optional<Book> bookOptional = bookService.findById(bookId);
        if (!bookOptional.isPresent()) {
            return new ResponseEntity<>(new ResponseMessage("Không tồn tại sách cần mua."), HttpStatus.BAD_REQUEST);
        }
        Optional<CartItem> cartItemOptional = cartItemService.findById(cartId, bookId);
        int numberCartAdd = 0;
        if (!cartItemOptional.isPresent()) {
            if (bookOptional.get().getAmount() < amount) {
                return new ResponseEntity<>(new ResponseMessage("Kho hàng hiện tại không đủ số lượng yêu cầu."), HttpStatus.BAD_REQUEST);
            }
            numberCartAdd = cartItemService.addToCart(amount, LocalDateTime.now(), cartId, bookId);
        } else {
            if (bookOptional.get().getAmount() < cartItemOptional.get().getAmount() + amount) {
                return new ResponseEntity<>(new ResponseMessage("Kho hàng hiện tại không đủ số lượng yêu cầu."), HttpStatus.BAD_REQUEST);
            }
            numberCartAdd = cartItemService.update(amount + cartItemOptional.get().getAmount(), LocalDateTime.now(), cartId, bookId);
        }
        if (numberCartAdd <= 0) {
            return new ResponseEntity<>(new ResponseMessage("Thêm sản phẩm không thành công"), HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>(new ResponseMessage("Thêm sản phẩm thành công"), HttpStatus.OK);
    }
}
