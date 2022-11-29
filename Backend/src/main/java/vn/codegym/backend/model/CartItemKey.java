package vn.codegym.backend.model;

import lombok.Data;

import javax.persistence.Column;
import javax.persistence.Embeddable;
import java.io.Serializable;
import java.util.Objects;

@Embeddable
@Data
public class CartItemKey implements Serializable {
    @Column(name = "cart_id")
    private Long cartId;
    @Column(name = "book_id")
    private Long bookId;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        CartItemKey that = (CartItemKey) o;
        return Objects.equals(cartId, that.cartId) && Objects.equals(bookId, that.bookId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(cartId, bookId);
    }
}
