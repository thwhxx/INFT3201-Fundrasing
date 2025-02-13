-- Users table
CREATE TABLE Users (
    id INT PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    preferred_name VARCHAR(100),
    mobile_phone VARCHAR(20),
    business_phone VARCHAR(20),
    street_address VARCHAR(255),
    city VARCHAR(100),
    state VARCHAR(50),
    postal_code VARCHAR(20),
    role VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Donor_Type table
CREATE TABLE Donor_Type (
    id INT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    notes TEXT
);

-- Donors table
CREATE TABLE Donors (
    id INT PRIMARY KEY,
    user_id INT,
    type_id INT,
    tax_id VARCHAR(50),
    approach VARCHAR(100),
    engagement_level VARCHAR(50),
    total_donations DECIMAL(15,2),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES Users(id),
    FOREIGN KEY (type_id) REFERENCES Donor_Type(id)
);

-- Committee_Members table
CREATE TABLE Committee_Members (
    id INT PRIMARY KEY,
    user_id INT,
    position VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES Users(id)
);

-- Donor_Assignments table
CREATE TABLE Donor_Assignments (
    id INT PRIMARY KEY,
    volunteer_id INT,
    donor_id INT,
    assigned_date DATE,
    notes TEXT,
    FOREIGN KEY (volunteer_id) REFERENCES Users(id),
    FOREIGN KEY (donor_id) REFERENCES Donors(id)
);

-- Events table
CREATE TABLE Events (
    id INT PRIMARY KEY,
    program_id INT,
    event_name VARCHAR(255),
    event_date DATE,
    location VARCHAR(255),
    description TEXT,
    goals TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Event_Registrations table
CREATE TABLE Event_Registrations (
    id INT PRIMARY KEY,
    event_id INT,
    donor_id INT,
    register_date DATE,
    status VARCHAR(50),
    notes TEXT,
    FOREIGN KEY (event_id) REFERENCES Events(id),
    FOREIGN KEY (donor_id) REFERENCES Donors(id)
);

-- Program_Category table
CREATE TABLE Program_Category (
    id INT PRIMARY KEY,
    name VARCHAR(100),
    description TEXT,
    objectives TEXT
);

-- Program table
CREATE TABLE Program (
    id INT PRIMARY KEY,
    category_id INT,
    name VARCHAR(255),
    description TEXT,
    funding_goal DECIMAL(15,2),
    current_amount DECIMAL(15,2),
    start_date DATE,
    end_date DATE,
    status VARCHAR(50),
    FOREIGN KEY (category_id) REFERENCES Program_Category(id)
);

-- Campus table
CREATE TABLE Campus (
    id INT PRIMARY KEY,
    name VARCHAR(255),
    location VARCHAR(255),
    contact VARCHAR(100)
);

-- Status table
CREATE TABLE Status (
    id INT PRIMARY KEY,
    name VARCHAR(50),
    scheduled BOOLEAN,
    rescheduled BOOLEAN,
    canceled BOOLEAN,
    completed BOOLEAN,
    progress INT
);

-- Donations table
CREATE TABLE Donations (
    id INT PRIMARY KEY,
    donor_id INT,
    program_id INT,
    amount DECIMAL(15,2),
    donation_date DATE,
    payment_method VARCHAR(50),
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (donor_id) REFERENCES Donors(id),
    FOREIGN KEY (program_id) REFERENCES Program(id)
);

-- Tax_Receipts table
CREATE TABLE Tax_Receipts (
    id INT PRIMARY KEY,
    donation_id INT,
    receipt_number VARCHAR(50),
    issued_date DATE,
    value DECIMAL(15,2),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (donation_id) REFERENCES Donations(id)
);

-- QuarterlyTarget table
CREATE TABLE QuarterlyTarget (
    id INT PRIMARY KEY,
    event_id INT,
    quarter VARCHAR(20),
    year INT,
    target_amount DECIMAL(15,2),
    status VARCHAR(50),
    FOREIGN KEY (event_id) REFERENCES Events(id)
);

-- Performance_Metric table
CREATE TABLE Performance_Metric (
    id INT PRIMARY KEY,
    target_id INT,
    metric_date DATE,
    actual_amount DECIMAL(15,2),
    variance DECIMAL(15,2),
    analysis TEXT,
    FOREIGN KEY (target_id) REFERENCES QuarterlyTarget(id)
);




