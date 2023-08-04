package com.trading212.crossedroads.dtos;

import lombok.Data;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.time.ZonedDateTime;
import java.util.Collection;
import java.util.Date;
import java.util.List;

@Data
public class User implements UserDetails {
    private long id;
    private String profile_name;
    private String first_name;
    private String last_name;
    private String password;
    private String email;
    private Date date_of_birth;
    private ZonedDateTime created_at;
    private ZonedDateTime updated_at;
    private String current_color;
    private String profile_pic_url;
    private Double longitude;
    private Double latitude;
    private boolean isOnline;
    private Role role;


    public User() {
    }

    public User(String first_name, String last_name, String password, String email, Date date_of_birth) {
        this.first_name = first_name;
        this.last_name = last_name;
        this.profile_name = first_name.toLowerCase() + last_name.toLowerCase();
        this.password = password;
        this.email = email;
        this.date_of_birth = date_of_birth;
        this.role = Role.USER;
    }

    public User(long id,
                String first_name,
                String last_name,
                String profile_name,
                String password,
                String email,
                Date date_of_birth,
                String profile_pic_url,
                String current_color,
                Double longitude,
                Double latitude,
                boolean isOnline,
                ZonedDateTime created_at,
                ZonedDateTime updated_at) {
        this.id = id;
        this.first_name = first_name;
        this.last_name = last_name;
        this.profile_name = profile_name;
        this.password = password;
        this.email = email;
        this.role = Role.USER;
        this.date_of_birth = date_of_birth;
        this.current_color = current_color;
        this.profile_pic_url = profile_pic_url;
        this.longitude = longitude;
        this.latitude = latitude;
        this.isOnline = isOnline;
        this.created_at = created_at;
        this.updated_at = updated_at;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(new SimpleGrantedAuthority(role.name()));
    }

    @Override
    public String getUsername() {
        return this.email;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}