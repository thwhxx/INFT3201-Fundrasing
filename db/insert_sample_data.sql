-- Sample Data for McLaughlin University Fundraising System
-- Last Updated: 2025-02-09

-- Insert campuses
INSERT INTO campuses (name, location, contact_info) VALUES
    ('North Campus', '2000 Simcoe Street North, Oshawa, ON L1G 0C5', '905-721-2000');

-- Insert program categories
INSERT INTO program_categories (name, description, objectives) VALUES
    ('Research', 'Advanced research initiatives', 'Advance knowledge in key areas'),
    ('Scholarships', 'Student financial aid programs', 'Support academic excellence');

-- Insert donor types
INSERT INTO donor_types (type_name, description) VALUES
    ('Individual', 'Individual donors including alumni and community members'),
    ('Corporation', 'Corporate donors and business partners'),
    ('Foundation', 'Charitable foundations and trust organizations');

-- Insert users with various roles
INSERT INTO users (email, password_hash, first_name, last_name, mobile_phone, role, city, province) VALUES
    -- Admin and Committee Members
    ('admin@mclaughlin.ca', 'hashed_pwd', 'John', 'Admin', '905-555-0001', 'Administration', 'Oshawa', 'Ontario'),
    ('committee@mclaughlin.ca', 'hashed_pwd', 'Sarah', 'Smith', '905-555-0002', 'Committee', 'Oshawa', 'Ontario'),
    
    -- Individual Donors
    ('alice@email.com', 'hashed_pwd', 'Alice', 'Wilson', '905-555-0003', 'Donor', 'Toronto', 'Ontario'),
    ('bob@email.com', 'hashed_pwd', 'Bob', 'Brown', '905-555-0004', 'Donor', 'Markham', 'Ontario'),
    
    -- Corporate Donor
    ('carol@techcorp.com', 'hashed_pwd', 'Carol', 'Davis', '905-555-0005', 'Donor', 'Toronto', 'Ontario'),
    
    -- Foundation Donor
    ('david@foundation.org', 'hashed_pwd', 'David', 'Miller', '905-555-0006', 'Donor', 'Toronto', 'Ontario');

-- Insert committee member
INSERT INTO committee_members (user_id, role, expertise, department) VALUES
    (2, 'Development Officer', 'Major Gifts', 'Development');

-- Insert donors with varying engagement levels
INSERT INTO donors (user_id, donor_type_id, preferred_contact, engagement_level, organization_name) VALUES
    (3, 1, 'Email', 'High', NULL),                       
    (4, 1, 'Phone', 'Medium', NULL),                         
    (5, 2, 'Email', 'High', 'Tech Corporation'),             
    (6, 3, 'Email', 'High', 'Community Foundation');          

-- Insert main program
INSERT INTO programs (name, description, category_id, campus_id, funding_goal, current_amount, start_date, end_date, status) VALUES
    ('Research Fund 2025', 'Annual research funding program', 1, 1, 1000000.00, 0.00, '2025-01-01', '2025-12-31', 'Active');

-- Insert donations with various amounts
INSERT INTO donations (donor_id, program_id, amount, payment_method, processed_by, currency) VALUES
    -- Individual donor (Alice) - Multiple donations
    (1, 1, 5000.00, 'Credit Card', 1, 'CAD'),
    (1, 1, 7500.00, 'Credit Card', 1, 'CAD'),
    
    -- Individual donor (Bob) - Single larger donation
    (2, 1, 25000.00, 'Wire Transfer', 1, 'CAD'),
    
    -- Corporate donor - Large donation
    (3, 1, 100000.00, 'Wire Transfer', 1, 'CAD'),
    
    -- Foundation donor - Largest donation
    (4, 1, 250000.00, 'Wire Transfer', 1, 'CAD');

-- Insert tax receipts for all donations
INSERT INTO tax_receipts (donation_id, receipt_number, amount, is_sent, status) VALUES
    (1, 'TR-2025-001', 5000.00, true, 'Issued'),
    (2, 'TR-2025-002', 7500.00, true, 'Issued'),
    (3, 'TR-2025-003', 25000.00, true, 'Issued'),
    (4, 'TR-2025-004', 100000.00, true, 'Issued'),
    (5, 'TR-2025-005', 250000.00, true, 'Issued');

-- Insert a single event
INSERT INTO events (program_id, name, description, event_date, location, organized_by, status) VALUES
    (1, 'Annual Donor Reception', 'Thank you event for major donors', '2025-06-15 18:00:00', 'North Campus Great Hall', 1, 'Scheduled');

-- Insert event RSVPs
INSERT INTO event_rsvps (event_id, donor_id, rsvp_status) VALUES
    (1, 1, 'Confirmed'),
    (1, 3, 'Confirmed'),
    (1, 4, 'Confirmed');