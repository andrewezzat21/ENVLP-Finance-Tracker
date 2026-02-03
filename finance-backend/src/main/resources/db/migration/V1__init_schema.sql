-- Flyway migration for finance application
-- Version: V1
-- Description: Create initial schema with users, accounts, envelopes, and categories

-- Create users table
CREATE TABLE user (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(255),
    last_name VARCHAR(255),
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    roles VARCHAR(255),
    UNIQUE KEY uk_user_email (email)
);

-- Create envelopes table
CREATE TABLE envelope (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    balance BIGINT,
    user_id BIGINT NOT NULL,
    CONSTRAINT fk_envelope_user FOREIGN KEY (user_id) REFERENCES user(id) ON DELETE CASCADE,
    INDEX idx_envelope_user_id (user_id)
);

-- Create accounts table with account_type enum
CREATE TABLE account (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    balance BIGINT,
    type VARCHAR(50) NOT NULL,
    user_id BIGINT NOT NULL,
    CONSTRAINT fk_account_user FOREIGN KEY (user_id) REFERENCES user(id) ON DELETE CASCADE,
    CONSTRAINT chk_account_type CHECK (type IN ('CASH', 'BANK', 'WALLET')),
    INDEX idx_account_user_id (user_id)
);

-- Create categories table with category_type enum
CREATE TABLE category (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    balance BIGINT,
    type VARCHAR(50) NOT NULL,
    envelope_id BIGINT NOT NULL,
    CONSTRAINT fk_category_envelope FOREIGN KEY (envelope_id) REFERENCES envelope(id) ON DELETE CASCADE,
    CONSTRAINT chk_category_type CHECK (type IN ('INCOME', 'EXPENSE')),
    INDEX idx_category_envelope_id (envelope_id)
);