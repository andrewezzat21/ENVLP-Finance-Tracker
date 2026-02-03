package com.andrew.finance.dto;

import java.util.List;

public record LoginResponse(
        Long id,
        String firstName,
        String lastName,
        String token,
        List<String> roles
) {
}
