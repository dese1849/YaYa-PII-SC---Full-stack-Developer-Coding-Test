YaYa Wallet - Full-Stack Engineer Coding Test
This project implements a transaction monitoring dashboard using the YaYa Wallet API. It allows users to view and search their transactions in a responsive, user-friendly interface.
________________________________________
🚀** Features**
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
🛠 **Tech Stack**
**Frontend**
      •	React.js
      •	Axios – API requests
      •	Tailwind CSS – Styling (if you used it, otherwise CSS/Bootstrap)
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
    •	cd yaya-wallet-dashboard
2.	Install dependencies:
    •	npm install
3.	Create .env file in root with:
    •	API_KEY=your_api_key
    •	API_SECRET=your_api_secret
    •	BASE_URL=https://sandbox.yayawallet.com/api/en
4.	Run development server:
    •	npm run dev
5.	or for backend if separate:
    •		npm run server
________________________________________
🔍 Testing the Solution
    1. Open the dashboard in browser.
    2. Use the search bar to query by ID, sender, receiver, or cause.
    3. Use pagination controls to navigate pages.
    4. Check visual indicators:
            o	Green = Incoming
            o	Red = Outgoing
________________________________________
🔒 Security
    1. API credentials are stored in .env (not hardcoded).
    2. .env is ignored via .gitignore.
    3. Only minimal required info is exposed to frontend.
________________________________________
Assumptions
    1. Authentication guide from YaYa Wallet API was followed.
    2. Current user is predefined in Dhashborad Page (for identifying incoming/outgoing transactions).
    3. Basic error handling for API failures is included.
Author
Developed by Desalegn Wendimu Tadese.




