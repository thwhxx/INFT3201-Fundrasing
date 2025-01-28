-- Drop existing tables if they exist (useful for development)
DROP TABLE IF EXISTS quarterly_targets;
DROP TABLE IF EXISTS donations;
DROP TABLE IF EXISTS programs;
DROP TABLE IF EXISTS donors;
DROP TABLE IF EXISTS committee_members;

-- Drop existing types if they exist
DROP TYPE IF EXISTS donor_type;
DROP TYPE IF EXISTS program_category;
DROP TYPE IF EXISTS campus_location;

-- Create custom types
CREATE TYPE donor_type AS ENUM ('individual', 'private_foundation', 'corporation');
CREATE TYPE program_category AS ENUM ('energy_research', 'education_research', 'undergraduate', 'graduate');
CREATE TYPE campus_location AS ENUM ('main', 'downtown', 'east', 'west');

-- Create Donors table
CREATE TABLE donors (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    donor_type donor_type NOT NULL,
    email VARCHAR(255) UNIQUE,
    phone VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create Programs table
CREATE TABLE programs (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    category program_category NOT NULL,
    description TEXT,
    campus_location campus_location NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create Committee Members table
CREATE TABLE committee_members (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    role VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create Donations table
CREATE TABLE donations (
    id SERIAL PRIMARY KEY,
    donor_id INTEGER REFERENCES donors(id) ON DELETE CASCADE,
    program_id INTEGER REFERENCES programs(id) ON DELETE CASCADE,
    amount DECIMAL(15,2) NOT NULL CHECK (amount > 0),
    date DATE NOT NULL,
    committee_member_id INTEGER REFERENCES committee_members(id) ON DELETE SET NULL,
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create Quarterly Targets table
CREATE TABLE quarterly_targets (
    id SERIAL PRIMARY KEY,
    committee_member_id INTEGER REFERENCES committee_members(id) ON DELETE CASCADE,
    program_id INTEGER REFERENCES programs(id) ON DELETE CASCADE,
    target_amount DECIMAL(15,2) NOT NULL CHECK (target_amount > 0),
    year INTEGER NOT NULL CHECK (year >= 2020),
    quarter INTEGER NOT NULL CHECK (quarter BETWEEN 1 AND 4),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(committee_member_id, program_id, year, quarter)
);

-- Create indexes for better query performance
CREATE INDEX idx_donors_type ON donors(donor_type);
CREATE INDEX idx_programs_category ON programs(category);
CREATE INDEX idx_programs_campus ON programs(campus_location);
CREATE INDEX idx_donations_date ON donations(date);
CREATE INDEX idx_donations_donor ON donations(donor_id);
CREATE INDEX idx_donations_program ON donations(program_id);
CREATE INDEX idx_targets_year_quarter ON quarterly_targets(year, quarter);

-- Create a function to update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers to automatically update updated_at
CREATE TRIGGER update_donors_updated_at
    BEFORE UPDATE ON donors
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_programs_updated_at
    BEFORE UPDATE ON programs
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_committee_members_updated_at
    BEFORE UPDATE ON committee_members
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_donations_updated_at
    BEFORE UPDATE ON donations
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_quarterly_targets_updated_at
    BEFORE UPDATE ON quarterly_targets
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Add sample data for testing
INSERT INTO committee_members (name, email, role) VALUES
    ('Michael Green', 'michael.green@mclaughlin.edu', 'Committee Head'),
    ('Sarah Johnson', 'sarah.johnson@mclaughlin.edu', 'Member'),
    ('James Wilson', 'james.wilson@mclaughlin.edu', 'Member');

INSERT INTO programs (name, category, description, campus_location) VALUES
    ('Renewable Energy Research', 'energy_research', 'Research into sustainable energy sources', 'main'),
    ('Education Innovation', 'education_research', 'Advancing teaching methodologies', 'downtown'),
    ('Computer Science', 'undergraduate', 'Bachelor of Computer Science', 'east'),
    ('Data Science', 'graduate', 'Master of Data Science', 'west');

-- Comment explaining the schema
COMMENT ON DATABASE mclaughlin_fundraising IS 'Database for McLaughlin University fundraising management system';