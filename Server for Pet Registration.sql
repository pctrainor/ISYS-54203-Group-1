-- Create a new table for pet policies
CREATE TABLE event_pet_policies (
    policy_id INT PRIMARY KEY AUTO_INCREMENT,
    event_id INT NOT NULL,
    pets_allowed BOOLEAN NOT NULL DEFAULT FALSE,
    leash_required BOOLEAN NOT NULL DEFAULT TRUE,
    pet_rules TEXT,
    pet_friendly_areas TEXT,
    pet_care_options TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (event_id) REFERENCES events(id)
);

-- Add indexes for better query performance
CREATE INDEX idx_event_id ON event_pet_policies(event_id);
