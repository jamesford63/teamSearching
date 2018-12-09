package com.example.server.config;

import com.example.server.entity.User;
import com.example.server.entity.enums.UserStatus;
import com.example.server.repository.UserRepository;
import com.example.server.service.UserService;
import com.example.server.service.security.UserDetailsServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.security.Principal;

@Configuration
@EnableWebSecurity
public class SecurityConfiguration extends WebSecurityConfigurerAdapter {
    private final UserDetailsServiceImpl userDetailsService;
    private final PasswordEncoder passwordEncoder;
    private final UserService userService;

    @Autowired
    public SecurityConfiguration(UserDetailsServiceImpl userDetailsService, PasswordEncoder passwordEncoder, UserService userService) {
        this.userDetailsService = userDetailsService;
        this.passwordEncoder = passwordEncoder;
        this.userService = userService;
    }

    @Override
    protected void configure(final AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(userDetailsService)
                .passwordEncoder(passwordEncoder);
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.csrf()
                .disable();

        http.authorizeRequests()
                .anyRequest().authenticated()
                .antMatchers("/users/register").permitAll();

        http.formLogin()
                .loginPage("/login")
                .failureUrl("/login/error")
                .successHandler((httpServletRequest, httpServletResponse, authentication) -> {
                    org.springframework.security.core.userdetails.User principal =
                            (org.springframework.security.core.userdetails.User) authentication.getPrincipal();
                    User user = userService.getUserByLogin(principal.getUsername());
                    user.setUserStatus(UserStatus.ONLINE);
                    userService.updateUser(user);
                })
                .permitAll();

        http.logout()
                .permitAll()
                .logoutUrl("/logout")
                .logoutSuccessHandler((httpServletRequest, httpServletResponse, authentication) -> {
                    org.springframework.security.core.userdetails.User principal =
                            (org.springframework.security.core.userdetails.User) authentication.getPrincipal();
                    User user = userService.getUserByLogin(principal.getUsername());
                    user.setUserStatus(UserStatus.OFFLINE);
                    userService.updateUser(user);
                })
                .invalidateHttpSession(true);

    }
}
