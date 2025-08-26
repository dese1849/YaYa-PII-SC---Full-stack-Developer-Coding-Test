YaYa Wallet - Full-Stack Engineer Coding Test
This Mini project implements a transaction monitoring dashboard using the YaYa Wallet API. It allows users to view and search their transactions in a responsive, user-friendly interface.
________________________________________
🚀** **Features****
1. Transaction Table with:
      o Transaction ID, Sender, Receiver, Amount, Currency, Cause, Created At
2. Pagination (p query param for page number)
3. Search by sender name, receiver name, cause, or ID
4. Incoming/Outgoing Indicators
      o Incoming: current user is the receiver
      o Outgoing: current user is the sender
      o Top-up: sender = receiver → considered incoming
5. Responsive UI (works across devices)
6. Secure API Handling (keys/secret stored safely in environment variables)
________________________________________
🧩** **Problem-Solving Methodology****

1. Understanding the Requirements – Identified core features: transaction table, search, pagination, visual indicators, responsiveness, and API security.

2. Planning the Solution – Chose React.js frontend for UI and Node.js + Express.js backend for secure API handling. Planned reusable components for table, pagination, and search.

3. Implementation – Developed backend proxy to handle API requests; implemented frontend components with conditional styling for incoming, outgoing, and top-up transactions.

4. Testing – Verified API integration, pagination, search functionality, and responsive layout across devices.

5. Security Considerations – Kept API credentials in .env, ensured frontend communicates only with backend.

6. Final Review – Cleaned and refactored code, ensured descriptive variable names, and wrote README for setup instructions.
   ________________________________________
🛠 **Tech Stack**
**Frontend**
      •	React.js
      •	Axios – API requests
      •	Module Based CSS
**Backend**
        •	Node.js
        •	Express.js – API routing
        •	Axios – External API calls
        •	dotenv – Manage environment variables
        •	cors – Enable frontend-backend communication
________________________________________
📦 **Installation & Setup**
1.	Clone this repo:
    •	git clone https://github.com/dese1849/YaYa-PII-SC---Full-stack-Developer-Coding-Test.git
    •	cd YaYa-PII-SC---Full-stack-Developer-Coding-Test
2.	Install dependencies:
    •	npm install
3.	Create .env file in root with:
    •	API_KEY=your_api_key
    •	API_SECRET=your_api_secret
    •	BASE_URL=https://sandbox.yayawallet.com/api/en
4.	Run Front End server:
    •	npm run dev
5.	Backend server:
    •	Node Server.js
________________________________________
🔍** **Testing the Solution**
    1. Open the dashboard in browser.
    2. Use the search bar to query by  sender, receiver, ID or cause.
    3. Use pagination controls to navigate pages.
    4. Check visual indicators:
            o	Green = Incoming
            o	Red = Outgoing
________________________________________
🔒 **Security**
    1. API credentials are stored in .env.
    2. .env is ignored via .gitignore.
________________________________________
**Assumptions**
    1. Authentication guide from YaYa Wallet API was followed.
    2. currentUserAccount is predefined in Dhashborad Page with the name of  "yayawalletpi" (for identifying incoming/outgoing transactions).
    3. Basic error handling for API failures is included.
    ________________________________________
Author:- Developed by Desalegn Wendimu Tadese (MSc).




