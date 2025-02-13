
-- Users table
INSERT INTO Users (id, email, password, first_name, last_name, preferred_name, mobile_phone, business_phone, street_address, city, state, postal_code, role)
VALUES 
(1, 'asd@example.ca', 'pass1234', 'John', 'Doe', 'Johnny', '123-456-7890', '098-765-4321', '123 Main St', 'Oshawa', 'ON', 'L1H 7K4', 'Admin'),
(2, 'jane@example.ca', 'pass1234', 'Jane', 'Smith', 'Janey', '234-567-8901', '987-654-3210', '456 Elm St', 'Toronto', 'ON', 'M4B 1B3', 'Donor'),
(3, 'green@example.ca', 'pass1234', 'Michael', 'Green', 'Mike', '345-678-9012', '876-543-2109', '789 Pine St', 'Ottawa', 'ON', 'K1A 0B1', 'Committee Member'); 

-- Donor_Type table
INSERT INTO Donor_Type (id, name, notes)
VALUES 
(1, 'Individual', 'Individual donors'),
(2, 'Private Foundation', 'Private foundation donors'),
(3, 'Corporation', 'Corporate donors');

-- Donors table
INSERT INTO Donors (id, user_id, type_id, tax_id, approach, engagement_level, total_donations)
VALUES 
(1, 2, 1, 'TAX123456', 'Email', 'High', 5000.00);

-- Committee_Members table
INSERT INTO Committee_Members (id, user_id, position)
VALUES 
(1, 3, 'Chair');

-- Donor_Assignments table
INSERT INTO Donor_Assignments (id, volunteer_id, donor_id, assigned_date, notes)
VALUES 
(1, 3, 1, '2025-01-15', 'Initial contact made');

-- Events table
INSERT INTO Events (id, program_id, event_name, event_date, location, description, goals)
VALUES 
(1, 1, 'Annual Fundraising Gala', '2025-05-20', 'Main Campus Hall', 'A gala event to raise funds for university programs', 'Raise $100,000');

-- Event_Registrations table
INSERT INTO Event_Registrations (id, event_id, donor_id, register_date, status, notes)
VALUES 
(1, 1, 1, '2025-04-01', 'Registered', 'Looking forward to the event');

-- Program_Category table
INSERT INTO Program_Category (id, name, description, objectives)
VALUES 
(1, 'Energy Research', 'Research on sustainable energy solutions', 'Develop new energy technologies');

-- Program table
INSERT INTO Program (id, category_id, name, description, funding_goal, current_amount, start_date, end_date, status)
VALUES 
(1, 1, 'Solar Energy Initiative', 'Research on improving solar panel efficiency', 50000.00, 10000.00, '2025-01-01', '2025-12-31', 'Ongoing');

-- Campus table
INSERT INTO Campus (id, name, location, contact)
VALUES 
(1, 'Main Campus', '123 University Ave', 'maincampus@example.com');

-- Status table
INSERT INTO Status (id, name, scheduled, rescheduled, canceled, completed, progress)
VALUES 
(1, 'In Progress', TRUE, FALSE, FALSE, FALSE, 50);

-- Donations table
INSERT INTO Donations (id, donor_id, program_id, amount, donation_date, payment_method, notes)
VALUES 
(1, 1, 1, 1000.00, '2025-02-01', 'Credit Card', 'First donation of the year');

-- Tax_Receipts table
INSERT INTO Tax_Receipts (id, donation_id, receipt_number, issued_date, value)
VALUES 
(1, 1, 'REC123456', '2025-02-02', 1000.00);

-- QuarterlyTarget table
INSERT INTO QuarterlyTarget (id, event_id, quarter, year, target_amount, status)
VALUES 
(1, 1, 'Q1', 2025, 25000.00, 'In Progress');

-- Performance_Metric table
INSERT INTO Performance_Metric (id, target_id, metric_date, actual_amount, variance, analysis)
VALUES 
(1, 1, '2025-03-31', 20000.00, -5000.00, 'Slightly below target, need to increase efforts');
