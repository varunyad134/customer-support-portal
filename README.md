# Customer Support Portal

A fully functional web-based Customer Support Ticketing CRM System built with Google Apps Script and Google Sheets.

## Live Demo
https://script.google.com/macros/s/AKfycbwEcKkTCtRdC-tatXH8YHne2cq4NR5jv7KUaP17HrDURrca1gag3JwpqYWmvrjSmyYD3Q/exec

## Tech Stack
- **Backend:** Google Apps Script
- **Database:** Google Sheets
- **Frontend:** HTML, CSS, JavaScript
- **Charts:** Chart.js

## Features
- Create and manage support tickets
- Auto generated unique ticket IDs
- Search by ticket ID, customer name, phone, email, order ID
- Filter by status and communication channel
- Edit and update ticket details in real time
- View related order information inside ticket
- Dashboard with donut and bar charts
- Color coded status badges
- Professional three panel responsive interface

## Google Sheets Structure

### Tickets Sheet
| Column | Description |
|--------|-------------|
| Ticket ID | Auto generated unique ID |
| Customer Name | Customer full name |
| Phone | Contact number |
| Email | Customer email |
| Order ID | Related order reference |
| Issue Description | Problem description |
| Status | Pending / In Progress / Waiting on Third Party / Waiting on Customer / Resolved |
| Channel | Call / Email |
| Escalated To | Team member ID |
| Query Theme | Category of issue |
| Action Taken | Steps taken by agent |
| Created Date | Ticket creation date |
| Resolved Date | Resolution date |
| Notes | Additional comments |

### Orders Sheet
| Column | Description |
|--------|-------------|
| Order ID | Unique order reference |
| Customer Name | Customer name |
| Product | Product ordered |
| Amount | Order value in INR |
| Order Date | When order was placed |
| Order Status | Current order status |

### Team Sheet
| Column | Description |
|--------|-------------|
| Team Member ID | Unique agent ID |
| Name | Agent full name |
| Department | Team department |
| Email | Agent email |

## Setup Instructions

1. Create a new Google Sheet with three tabs: Tickets, Orders, Team
2. Add column headers exactly as shown above
3. Go to Extensions → Apps Script
4. Paste Code.gs content into the editor
5. Create a new HTML file named Index and paste Index.html content
6. Update SHEET_ID variable in Code.gs with your Google Sheet ID
7. Deploy as Web App
   - Execute as: Me
   - Who has access: Anyone
8. Copy the deployed URL and open in browser

## Deployment
- Platform: Google Apps Script Web App
- Access: Anyone
- Execute as: Me

## Known Limitations
- Google Apps Script has a 6 minute execution time limit
- Large datasets may need pagination for better performance
- No real time updates between multiple agents

## Potential Improvements
- Real time ticket updates using polling
- Email notifications on ticket assignment
- Advanced analytics and SLA tracking
- Role based access control
- File attachment support via Google Drive
- Export tickets to CSV or PDF
