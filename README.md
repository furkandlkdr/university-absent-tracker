# UnivTrack - Attendance Tracker Web App

A web application designed to help users easily track their class attendance throughout academic terms, built with Nuxt.js, Firebase, and deployed on Vercel.

## Overview

This application provides a simple interface for users to define their academic terms, set up their weekly class schedules, and mark their attendance for each class session over a customizable period (5-18 weeks). It calculates and displays absence counts dynamically, highlighting courses nearing the absence limit.

## Key Features

* **User Authentication:** Secure sign-up and login using Firebase Authentication (Email/Password).
* **Term Management:** Create new academic terms with custom names, start dates, and weekly schedules. View past and present terms. Edit active terms.
* **Weekly Schedule Definition:** Define a weekly class schedule (Monday-Friday) with up to 2 morning and 2 afternoon slots per day. Each course slot occurs once per week.
* **Customizable Term Length:** Choose your term length from 5 to 18 weeks to match your academic calendar.
* **Attendance Marking:** Mark attendance for past and current days within an active term using statuses: "Attended", "Absent", or "Holiday / No Class".
* **Dynamic Absence Reporting:** Displays a list of courses for the selected term showing absences in the format `Course Name: X / Y`.
    * `X`: Total count of "Absent" marks for the course.
    * `Y`: Number of weeks passed for that specific course within the term, *excluding* weeks marked as "Holiday / No Class".
* **Absence Warnings:** Courses with 3 or 4 absences (`X` value) are automatically highlighted in red.
* **Read-Only Completed Terms:** Terms automatically become read-only when all weeks have passed, preserving historical data.
* **Mobile-First Design:** Responsive interface optimized for mobile devices.
* **Theme Customization:** Choose your preferred color scheme (light, dark, or system) and customize the theme color with an interactive color picker.

## How It Works

1.  **Sign Up / Log In:** Users create an account or log in using their email and password.
2.  **Term Dashboard:** After login, users see a list of their created terms.
3.  **Create/Select Term:** Users can add a new term (providing a name, start date, and weekly schedule) or select an existing active term to view.
4.  **View & Mark Attendance:** Selecting an active term shows the schedule. Users can click on past or present class slots to mark their attendance status.
5.  **Track Absences:** The application maintains a running count of absences (`X`) and calculates the relevant number of weeks passed (`Y`) for each course in the selected term, displaying it as `X / Y`.
6.  **Review Status:** Users can quickly see which courses are approaching the absence limit thanks to the red highlighting. Completed terms can be reviewed but not modified.

## Tech Stack

* **Frontend:** [Nuxt.js](https://nuxt.com/) (Vue.js Framework)
* **Backend & Database:** [Firebase](https://firebase.google.com/)
    * Firebase Authentication
    * Firebase Firestore
* **Hosting:** [Vercel](https://vercel.com/)

## Development Tools Acknowledgement

This project was developed with the assistance of AI tools. Specifically, code generation and problem-solving support were provided by a **Copilot Agent** (likely referring to GitHub Copilot or similar tools integrated into the IDE), and conversational assistance for planning, debugging, and content generation (like this README) was primarily facilitated through interactions with **Claude 3 Sonnet**.

## Getting Started

To run this project locally, follow these steps:

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/furkandlkdr/university-absent-tracker
    cd university-absent-tracker
    ```

2.  **Install dependencies:**
    ```bash
    # Using npm
    npm install
    # Or using yarn
    yarn install
    # Or using pnpm
    pnpm install
    ```

3.  **Set up Firebase:**
    * Create a project on the [Firebase Console](https://console.firebase.google.com/).
    * Enable **Authentication** (Email/Password sign-in method).
    * Enable **Firestore Database**. Start in production mode and set up appropriate security rules (see Firebase documentation).
    * Register a **Web app** within your Firebase project settings.
    * Find your Firebase configuration keys (apiKey, authDomain, projectId, etc.) in your web app settings.

4.  **Configure Environment Variables:**
    * Create a `.env` file in the root directory of the project.
    * Add your Firebase configuration keys to this file. Use the variable names expected by your Nuxt configuration (e.g., prefixed with `NUXT_PUBLIC_` if using Nuxt 3's public runtime config):
        ```dotenv
        # Example .env content (use your actual keys)
        NUXT_PUBLIC_FIREBASE_API_KEY=AIzaSy...
        NUXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project-id.firebaseapp.com
        NUXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
        NUXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project-id.appspot.com
        NUXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=...
        NUXT_PUBLIC_FIREBASE_APP_ID=1:...:web:...
        # NUXT_PUBLIC_FIREBASE_MEASUREMENT_ID=G-... (Optional)
        ```
    * **Important:** Ensure your `.env` file is listed in your `.gitignore` file to prevent accidentally committing sensitive keys.

5.  **Run the development server:**
    ```bash
    # Using npm
    npm run dev
    # Or using yarn
    yarn dev
    # Or using pnpm
    pnpm dev
    ```

6.  Open your browser and navigate to `http://localhost:3000` (or the port specified in the terminal).

## Deployment

This application is configured for easy deployment on [Vercel](https://vercel.com/). Simply import the Git repository into Vercel and configure the necessary Firebase environment variables in the Vercel project settings. Vercel will automatically handle the build and deployment process.
