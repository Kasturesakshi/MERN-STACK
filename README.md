# MERN-STACK

FRONTEND TASK
This React code represents a Transactions Dashboard that allows users to view and analyze transaction data for a specific month.
 The app has the following functionalities:

Month Selection: Users can select a month to filter transactions, statistics, and bar chart data using a dropdown.
Search Functionality: Users can search transactions by keywords, dynamically filtering the results.
Pagination: The transactions table supports pagination with "Previous" and "Next" buttons, showing 10 transactions per page.
Transactions Table: Displays a list of transactions with details such as ID, title, description, price, sold status, category, and sale date.
Statistics Section: Shows summary metrics like total sales amount, sold items, and unsold items for the selected month.
Bar Chart: Visualizes data using a bar chart representing the number of items sold per category or similar breakdown.

The app makes asynchronous calls to APIs (/transactions, /statistics, /bar-chart) to fetch data based on the selected month, search query, and current page. It uses useState for state management and useEffect to re-fetch data when the month or page changes. Additionally, the react-chartjs-2 library is used to render the bar chart.


## BACKENDTASK
This Python code, built with FastAPI and SQLAlchemy, provides an API for managing and analyzing product transaction data. The key functionalities include:

Database Setup:

SQLite is used as the database.
A ProductTransaction table stores transaction details like title, description, price, sale date, sold status, and category.
Initialize Database:

The /initialize-database endpoint fetches product transaction data from a third-party API and populates the database.
Transaction Listing with Search and Pagination:

The /transactions endpoint lists transactions for a specified month.
Supports search by title, description, or price and provides pagination.
Statistics API:

The /statistics endpoint calculates:
Total sales amount.
Total sold items.
Total unsold items for a specified month.
Bar Chart API:

The /bar-chart endpoint groups transactions by price ranges and returns counts for each range.
Pie Chart API:

The /pie-chart endpoint groups transactions by categories and returns counts for each category.
Combined Data API:

The /combined-data endpoint combines statistics, bar chart data, and pie chart data for a specified month.
The application is designed for data analysis and visualization in dashboards by aggregating and categorizing transaction data based on user inputs like the selected month.














