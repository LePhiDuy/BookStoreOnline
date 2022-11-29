package vn.codegym.backend.model;

import lombok.Data;

import javax.persistence.*;

@Entity
@Data
public class CartItem {
    @EmbeddedId
    private CartItemKey id;

    @ManyToOne
    @MapsId("cartId")
    @JoinColumn(name = "cart_id")
    private Cart cart;

    @ManyToOne
    @MapsId("bookId")
    @JoinColumn(name = "book_id")
    private Book book;
    @Column(name = "amount")
    private int amount;

}
