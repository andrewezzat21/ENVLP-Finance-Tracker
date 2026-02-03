package com.andrew.finance.controller;

import com.andrew.finance.dto.ApiResponse;
import com.andrew.finance.dto.LoginResponse;
import com.andrew.finance.dto.UserLoginDTO;
import com.andrew.finance.dto.UserRequestDTO;
import com.andrew.finance.entity.User;
import com.andrew.finance.service.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/auth")
@CrossOrigin
public class UserController {

    private final UserService userService;

    @PostMapping("/register")
    public ResponseEntity<ApiResponse<User>> register(@Valid @RequestBody UserRequestDTO userRequestDTO){
        User user = userService.register(userRequestDTO);

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(new ApiResponse<>("User created with id: " + user.getId(),
                        HttpStatus.CREATED.value(),
                        LocalDateTime.now(),
                        user));
    }

    @PostMapping("/login")
    public ResponseEntity<ApiResponse<LoginResponse>> login(@Valid @RequestBody UserLoginDTO userLoginDTO){

        LoginResponse loginResponse = userService.login(userLoginDTO);

        return ResponseEntity.status(HttpStatus.OK)
                .body(new ApiResponse<>("Login Successful! ",
                        HttpStatus.OK.value(),
                        LocalDateTime.now(),
                        loginResponse));

    }


}
