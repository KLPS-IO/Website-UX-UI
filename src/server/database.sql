-- Step 1: Create the Database
CREATE DATABASE limesurvey;

-- Step 2: Connect to the Database
\c limesurvey;

-- Step 3: Create Tables

-- Table for Raw Survey Data
CREATE TABLE survey_raw_data (
    id SERIAL PRIMARY KEY,                 -- Unique identifier for each entry
    user_id INT NOT NULL,                  -- ID of the respondent
    question_id INT NOT NULL,              -- ID of the survey question
    response TEXT NOT NULL,                -- User's raw response
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- When the response was recorded
    metadata JSONB                         -- Additional details (e.g., device type, location)
);

-- Table for Processed/Aggregated Data
CREATE TABLE survey_processed_data (
    id SERIAL PRIMARY KEY,                 -- Unique identifier for each record
    user_id INT NOT NULL,                  -- ID of the respondent
    question_id INT NOT NULL,              -- ID of the survey question
    processed_response TEXT,               -- Cleaned or transformed response data
    aggregated_score FLOAT,                -- Numerical score or calculated value
    processing_timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP -- When the data was processed
);

-- Table for Metadata/Change Logs
CREATE TABLE data_logs (
    log_id SERIAL PRIMARY KEY,             -- Unique identifier for each log entry
    table_name TEXT NOT NULL,              -- Name of the table affected
    operation TEXT NOT NULL,               -- Type of operation (e.g., INSERT, UPDATE, DELETE)
    old_value JSONB,                       -- Previous data (if applicable)
    new_value JSONB,                       -- New data (if applicable)
    changed_by TEXT,                       -- User or system that made the change
    change_timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP -- When the change was made
);
