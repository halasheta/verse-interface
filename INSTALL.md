## To run the program on your local machine
All instructions are written with the assumption that you are located in the project root directory (i.e. `verse-interface/`)
### Create a virtual environment
```
virtualenv venv
source venv/bin/activate
```
### Install the relevant requirements
For the backend:
```
pip install -r requirements.txt
```
For the frontend:
```
cd frontend/cmply
npm install
```
### Running the program
Backend server:
```
python3 backend/project/manage.py runserver
```
Frontend server:
```
cd frontend/cmply
npm start
```
