package com.andrew.finance.service;
import com.andrew.finance.dto.LoginResponse;
import com.andrew.finance.dto.UserLoginDTO;
import com.andrew.finance.dto.UserRequestDTO;
import com.andrew.finance.entity.User;
import com.andrew.finance.repo.UserRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Arrays;
import java.util.List;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepo userRepository;
    private final BCryptPasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JWTService jwtService;

    @Transactional
    public User register(UserRequestDTO userRequestDTO) {

        if(userRepository.existsByEmail(userRequestDTO.email())){
            throw new RuntimeException("A user with the same email is registered!");
        }

        User user = User.builder()
                .email(userRequestDTO.email())
                .password(passwordEncoder.encode(userRequestDTO.password()))
                .firstName(userRequestDTO.firstName())
                .lastName(userRequestDTO.lastName())
                .roles("USER")
                .build();

        return userRepository.save(user);
    }

    public LoginResponse login(UserLoginDTO userLoginDTO) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(userLoginDTO.email(), userLoginDTO.password())
        );
        if(!authentication.isAuthenticated())
            throw new RuntimeException("Invalid Credentials! Email and/or Password is wrong!");

        User user = userRepository.findByEmail(userLoginDTO.email());

        List<String> roles = Arrays.stream(user.getRoles().split(","))
                .map(String::trim)
                .toList();

        return new LoginResponse(
                user.getId(),
                user.getFirstName(),
                user.getLastName(),
                jwtService.generateToken(userLoginDTO.email()),
                roles
        );
    }
}
