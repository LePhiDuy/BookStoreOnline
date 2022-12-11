package vn.codegym.backend.payload.request;

import lombok.Data;

import javax.validation.constraints.*;

@Data
public class RegisterRequest {
    @NotBlank
    @Size(min = 6, max = 18)
    private String username;
    @Email
    @NotBlank
    private String email;
    @Min(100000)
    @Max(999999)
    private int otp;
    @NotBlank
    @Size(min = 8, max = 32)
    private String newPass;
    @NotBlank
    @Size(min = 8, max = 32)
    private String confirmPass;
}
