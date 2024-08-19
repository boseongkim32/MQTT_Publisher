# MQTT Publisher

A Web interface to bypass TestComplete and publish MQTT messages directly to the broker. Please ensure the laptop that this interface runs on can reach the broker.

The components are all in src.

`index.jsx` is the 'main' entry into the project.

`components` folder has the components that make up the project.

These include
`MQTT_connect.jsx` which is the login page of the webpage.
`MQTT_context.jsx` which holds the connection data that is shared across all pages
`dashboard.jsx` is the layout of the page
`submitMQTT.jsx` is the submission page upon clicking an element in the dashboard

`config.json` has the json file which is parsed that affects the layout of the page.

## Usage

`npm run dev` to develop and see the changes to the program in real time on localhost:5173

Currently, this MQTT client cannot handle anything other than publishing MQTT messages of the format `route=input`. Thus, the onus of parsing this data properly lies on the client.

## Screenshots

<img width="1508" alt="Screenshot 2024-08-19 at 1 29 29 PM" src="https://github.com/user-attachments/assets/c08a1bc1-ed59-4488-9164-a989d3a86bbc">
<img width="1508" alt="Screenshot 2024-08-19 at 1 28 09 PM" src="https://github.com/user-attachments/assets/4ea17461-5eba-47e2-b1be-fdd2c83c7306">
