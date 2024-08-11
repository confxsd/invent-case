## Invent Analytics Backend Developer Case

### Overview

This document provides an overview of the library management application developed using Node.js and explains how to run it locally.

### Libraries and Tools Used:

Express.js, TypeScript, TypeORM, Joi, PostgreSQL

### Features

The app supports the following operations:
- Listing Users
- Retrieving User Information
- Creating a New User
- Listing Books
- Retrieving Book Information
- Creating a New Book
- Borrowing a Book
- Returning a Book

### Library Choices

- **TypeORM:** Simplifies and streamlines database interactions.
- **Joi:** Ensures data integrity by validating API requests.
- **PostgreSQL:** Provides a reliable and scalable database system.

### Key Modules and Design Decisions

**User**, **Book**, and **Borrow** entity models were designed according to the case study requirements. Since book viewing is more frequent than borrowing or returning, I optimized the database by storing the average rating directly in the Book entity. This approach ensures faster access to book information.

I used the controller, service, and repository pattern to maintain a clean separation of concerns, promoting efficient data handling and easy maintenance.

### Installation and Running

1. **Install Dependencies:**

   ```bash
   npm install
   ```

2. **Setup Database:**

   Run a Postgres db and configure your database connection in the `.env` file.

3. **Build and Run:**

   **Development:**

   - Watch changes and automatically recompile:

     ```bash
     npm run dev
     ```

   **Production:**

   - Build and start the server:

     ```bash
     npm run build
     npm run start
     ```

### Conclusion

Feel free to contribute or raise any issues for improvements. Thank you for checking out this project!
