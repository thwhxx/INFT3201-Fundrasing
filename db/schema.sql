-- McLaughlin University Fundraising System Schema
-- Last Updated: 2025-02-09

-- Drop existing views
DROP VIEW IF EXISTS donor_stats_view CASCADE;
DROP VIEW IF EXISTS donor_list_view CASCADE;
DROP VIEW IF EXISTS donor_performance_view CASCADE;
DROP VIEW IF EXISTS program_performance_view CASCADE;

-- Drop existing tables
DROP TABLE IF EXISTS tax_receipts CASCADE;
DROP TABLE IF EXISTS event_rsvps CASCADE;
DROP TABLE IF EXISTS events CASCADE;
DROP TABLE IF EXISTS donations CASCADE;
DROP TABLE IF EXISTS member_assignments CASCADE;
DROP TABLE IF EXISTS committee_members CASCADE;
DROP TABLE IF EXISTS donors CASCADE;
DROP TABLE IF EXISTS programs CASCADE;
DROP TABLE IF EXISTS program_categories CASCADE;
DROP TABLE IF EXISTS campuses CASCADE;
DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS donor_types CASCADE;

-- Create base tables
CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    email VARCHAR(100) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    preferred_name VARCHAR(50),
    mobile_phone VARCHAR(15),
    home_phone VARCHAR(15),
    address VARCHAR(255),
    city VARCHAR(50),
    province VARCHAR(50),
    postal_code VARCHAR(10),
    status VARCHAR(10) DEFAULT 'Active' CHECK (status IN ('Active', 'Inactive')),
    preferred_language VARCHAR(10) DEFAULT 'English' CHECK (preferred_language IN ('English', 'French')),
    role VARCHAR(20) CHECK (role IN ('Donor', 'Committee', 'Administration')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE donor_types (
    donor_type_id SERIAL PRIMARY KEY,
    type_name VARCHAR(50) NOT NULL UNIQUE CHECK (type_name IN ('Individual', 'Corporation', 'Foundation')),
    description TEXT,
    notes TEXT
);

CREATE TABLE campuses (
    campus_id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,
    location VARCHAR(255) NOT NULL,
    contact_info VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE program_categories (
    category_id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    objectives TEXT,
    parent_category_id INTEGER REFERENCES program_categories(category_id),
    is_active BOOLEAN DEFAULT true
);

CREATE TABLE programs (
    program_id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    category_id INTEGER REFERENCES program_categories(category_id),
    campus_id INTEGER REFERENCES campuses(campus_id),
    funding_goal DECIMAL(15,2) NOT NULL,
    current_amount DECIMAL(15,2) DEFAULT 0,
    start_date DATE,
    end_date DATE,
    status VARCHAR(20) DEFAULT 'Active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT chk_program_dates CHECK (end_date >= start_date),
    CONSTRAINT chk_amounts CHECK (current_amount >= 0 AND funding_goal > 0)
);

CREATE TABLE donors (
    donor_id SERIAL PRIMARY KEY,
    user_id INTEGER UNIQUE REFERENCES users(user_id),
    donor_type_id INTEGER REFERENCES donor_types(donor_type_id),
    organization_name VARCHAR(100),
    tax_id VARCHAR(50),
    preferred_contact VARCHAR(20),
    preferred_program INTEGER REFERENCES programs(program_id),
    interests TEXT,
    engagement_level VARCHAR(20) DEFAULT 'Medium',
    total_donations DECIMAL(15,2) DEFAULT 0,
    last_contact_date DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE committee_members (
    member_id SERIAL PRIMARY KEY,
    user_id INTEGER UNIQUE REFERENCES users(user_id),
    role VARCHAR(50) NOT NULL,
    expertise TEXT,
    department VARCHAR(100),
    date_joined DATE DEFAULT CURRENT_DATE,
    status VARCHAR(20) DEFAULT 'Active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT chk_member_status CHECK (status IN ('Active', 'Inactive', 'On Leave'))
);

CREATE TABLE events (
    event_id SERIAL PRIMARY KEY,
    program_id INTEGER REFERENCES programs(program_id),
    name VARCHAR(100) NOT NULL,
    description TEXT,
    event_date TIMESTAMP NOT NULL,
    location VARCHAR(255),
    max_capacity INTEGER,
    goals TEXT,
    status VARCHAR(20) DEFAULT 'Scheduled',
    organized_by INTEGER REFERENCES committee_members(member_id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT chk_event_status CHECK (status IN ('Scheduled', 'In Progress', 'Completed', 'Cancelled'))
);

CREATE TABLE event_rsvps (
    rsvp_id SERIAL PRIMARY KEY,
    event_id INTEGER REFERENCES events(event_id),
    donor_id INTEGER REFERENCES donors(donor_id),
    rsvp_status VARCHAR(20) DEFAULT 'Pending',
    rsvp_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    notes TEXT,
    CONSTRAINT chk_rsvp_status CHECK (rsvp_status IN ('Pending', 'Confirmed', 'Declined', 'Cancelled'))
);

CREATE TABLE donations (
    donation_id SERIAL PRIMARY KEY,
    donor_id INTEGER REFERENCES donors(donor_id),
    program_id INTEGER REFERENCES programs(program_id),
    amount DECIMAL(15,2) NOT NULL,
    donation_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    payment_method VARCHAR(50),
    currency VARCHAR(3) DEFAULT 'CAD',
    is_matching_gift BOOLEAN DEFAULT false,
    matching_program_id INTEGER REFERENCES programs(program_id),
    processed_by INTEGER REFERENCES committee_members(member_id),
    event_id INTEGER REFERENCES events(event_id),
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT chk_donation_amount CHECK (amount > 0)
);

CREATE TABLE tax_receipts (
    receipt_id SERIAL PRIMARY KEY,
    donation_id INTEGER UNIQUE REFERENCES donations(donation_id),
    receipt_number VARCHAR(50) UNIQUE NOT NULL,
    issue_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    amount DECIMAL(15,2) NOT NULL,
    is_sent BOOLEAN DEFAULT FALSE,
    status VARCHAR(20) DEFAULT 'Issued',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT chk_receipt_status CHECK (status IN ('Draft', 'Issued', 'Void', 'Replaced'))
);

-- Create views
CREATE VIEW donor_stats_view AS
SELECT 
    COUNT(DISTINCT d.donor_id) as total_donors,
    COALESCE(SUM(dn.amount), 0) as total_donations,
    COALESCE(AVG(dn.amount), 0) as avg_donation_amount,
    (COUNT(CASE WHEN d.engagement_level = 'High' THEN 1 END)::float / 
     NULLIF(COUNT(*), 0)::float * 100) as active_engagement_percentage
FROM donors d
LEFT JOIN donations dn ON d.donor_id = dn.donor_id;

CREATE VIEW donor_list_view AS
SELECT 
    d.donor_id,
    u.first_name,
    u.last_name,
    dt.type_name as donor_type,
    d.organization_name,
    d.engagement_level,
    COALESCE(SUM(dn.amount), 0) as total_donations,
    MAX(dn.donation_date) as last_contact_date,
    d.preferred_contact,
    u.email,
    u.mobile_phone
FROM donors d
JOIN users u ON d.user_id = u.user_id
JOIN donor_types dt ON d.donor_type_id = dt.donor_type_id
LEFT JOIN donations dn ON d.donor_id = dn.donor_id
GROUP BY 
    d.donor_id, 
    u.first_name, 
    u.last_name, 
    dt.type_name,
    d.organization_name,
    d.engagement_level,
    d.preferred_contact,
    u.email,
    u.mobile_phone;

-- Create indexes
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_programs_category ON programs(category_id);
CREATE INDEX idx_programs_campus ON programs(campus_id);
CREATE INDEX idx_donations_date ON donations(donation_date);
CREATE INDEX idx_donations_donor ON donations(donor_id);
CREATE INDEX idx_events_date ON events(event_date);
CREATE INDEX idx_donors_type ON donors(donor_type_id);

-- Create trigger function for timestamps
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $function$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$function$;

-- Create triggers for timestamp updates
CREATE TRIGGER update_users_updated_at
    BEFORE UPDATE ON users
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_donors_updated_at
    BEFORE UPDATE ON donors
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_programs_updated_at
    BEFORE UPDATE ON programs
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_donations_updated_at
    BEFORE UPDATE ON donations
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Create function for updating donor total donations
CREATE OR REPLACE FUNCTION update_donor_total_donations()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $function$
BEGIN
    IF (TG_OP = 'INSERT') THEN
        UPDATE donors
        SET total_donations = total_donations + NEW.amount,
            updated_at = CURRENT_TIMESTAMP
        WHERE donor_id = NEW.donor_id;
    ELSIF (TG_OP = 'UPDATE') THEN
        UPDATE donors
        SET total_donations = total_donations - OLD.amount + NEW.amount,
            updated_at = CURRENT_TIMESTAMP
        WHERE donor_id = NEW.donor_id;
    ELSIF (TG_OP = 'DELETE') THEN
        UPDATE donors
        SET total_donations = total_donations - OLD.amount,
            updated_at = CURRENT_TIMESTAMP
        WHERE donor_id = OLD.donor_id;
    END IF;
    RETURN NULL;
END;
$function$;

-- Create trigger for donor total donations
CREATE TRIGGER update_donor_total_donations_trigger
    AFTER INSERT OR UPDATE OR DELETE ON donations
    FOR EACH ROW
    EXECUTE FUNCTION update_donor_total_donations();