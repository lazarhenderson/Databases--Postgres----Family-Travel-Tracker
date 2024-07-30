````markdown
# Family Travel Tracker

## Overview

Family Travel Tracker is a web application designed to track the countries visited by family members. The application allows users to add new family members, record their visited countries, and view a summary of all travels. This project demonstrates the use of Express.js for server-side development and PostgreSQL for database management.

## Features

- **User Management:** Add new family members and store their details (name and favorite color) in the database.
- **Travel Tracking:** Record the countries visited by each family member.
- **Dynamic Display:** Display the list of family members and their visited countries on the homepage.

## Technologies Used

- **Backend:**

  - [Express.js](https://expressjs.com/) - A fast, unopinionated, minimalist web framework for Node.js.
  - [Body-Parser](https://www.npmjs.com/package/body-parser) - Middleware to parse incoming request bodies in a middleware before your handlers.
  - [PostgreSQL](https://www.postgresql.org/) - A powerful, open-source object-relational database system.
  - [pg](https://node-postgres.com/) - PostgreSQL client for Node.js.

- **Database:**
  - Two PostgreSQL databases:
    - `family_travel_tracker_db` - Stores family member information and visited countries.
    - `world` - Contains country information for lookup purposes.

## Installation

1. **Clone the repository:**

   ```sh
   git clone https://github.com/lazarhenderson/Databases-Postgres--Family-Travel-Tracker.git
   cd family-travel-tracker
   ```

2. **Install dependencies:**

   ```sh
   npm install
   ```

3. **Set up PostgreSQL databases:**

   - Ensure PostgreSQL is installed and running on your machine.
   - Create the `family_travel_tracker_db` and `world` databases.
   - Populate the `world` database with country information.

4. **Configure database connection:**
   - Update the database connection details in the code if necessary.

## Usage

1. **Start the server:**

   ```sh
   node index.js
   ```

2. **Access the application:**
   - Open your web browser and go to `http://localhost:3000`.

## Code Overview

### Main Files

- `index.js` - The main server file containing all routes and database logic.
- `public/` - Directory for static files.
- `views/` - Directory for EJS templates.

### Key Functions

- **populateUsersList:** Fetches the list of family members from the database and populates the `users` array.
- **checkVisited:** Checks which countries the current user has visited.
- **Add New Member:** Allows adding new family members and updating the database.
- **Record Visited Country:** Records a new visited country for the current user.

## Contributing

Contributions are welcome! Please create a pull request or open an issue to discuss changes.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
````
