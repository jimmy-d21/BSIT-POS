CREATE TYPE staff_role AS ENUM ('manager', 'cashier');
CREATE TYPE staff_status AS ENUM ('active', 'inactive');

-- Table: staff
CREATE TABLE staff (
	id SERIAL PRIMARY KEY,
	usn VARCHAR(20) NOT NULL,
	name VARCHAR(100) NOT NULL,
	email VARCHAR(100) NOT NULL UNIQUE,
	role staff_role NOT NULL,
	status staff_status NOT NULL DEFAULT 'active',
	password VARCHAR(255) NOT NULL,
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);