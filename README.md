# FlashcardMaster

FlashcardMaster is a comprehensive web application designed to assist users in note-taking, study planning, and creating flashcards from notes. Built with a powerful stack comprising React, Django, and PostgreSQL, FlashcardMaster offers a seamless and efficient study tool for students and professionals alike.

## Live Demo

https://flash-card-master.vercel.app/

## Features

- **Note-taking**: A rich text editor to create and manage detailed notes.
- **Study Planning**: Organize your study schedule with a built-in planner.
- **Flashcard Creation**: Easily convert your notes into flashcards for efficient study sessions.
- **User Authentication**: Secure user registration and login.
- **Responsive Design**: Accessible on both desktop and mobile devices.

## Technologies Used

- **Frontend**: React
- **Backend**: Django
- **Database**: PostgreSQL

## Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- Node.js
- Python 3
- PostgreSQL

### Installation

1. **Clone the repository**

    ```bash
    git clone [https://github.com/NatanielChmielarz/FlashCardMaster.git]
    cd flashcardmaster
    ```

2. **Backend Setup**

    - Create a virtual environment and activate it

      ```bash
      python3 -m venv venv
      source venv/bin/activate  # On Windows use `venv\Scripts\activate`
      ```

    - Install the required packages

      ```bash
      pip install -r requirements.txt
      ```

    - Create `.env` and configure your PostgreSQL database in `.env`

    - Apply migrations

      ```bash
      python manage.py migrate
      ```

    - Run the backend server

      ```bash
      python manage.py runserver
      ```

3. **Frontend Setup**

    - Navigate to the `frontend` directory

      ```bash
      cd frontend
      ```

    - Install the required packages

      ```bash
      npm install
      ```

    - Start the frontend server

      ```bash
      npm start
      ```

## Usage

- Access the application at `http://localhost:5173`.
- Register for a new account or log in with existing credentials.
- Start creating notes, planning your study schedule, and making flashcards!





