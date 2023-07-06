package com.trading212.crossedroads.auth;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class RegisterRequest {
    private String first_name;
    private String last_name;
    private String profile_name;
    private String email;
    private String password;
    private Date date_of_birth;
}
