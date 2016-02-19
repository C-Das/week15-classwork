# week15-classwork
Create an express / handlebars / node.js / mysql app with 3 views
Register - don't let someone with the same email register twice
The registration should have a first name and last name
Login
Secret Page
On the secret page, display the first and last name of the user
Only an authenticated user can see the secret page (remember sessions and middleware?)

### Week15 - Classwork - validation in express

* Create a new DB
* Create an express / handlebars / node.js / mysql app
* Entry: The page will allow users to input an entry into the database with their name/phone number/message
* Valiate the name so it's only strings
* Valiate the phone number so it's only numbers
* Valiate the message so it's min of 5 characters in length and 500 character at max
* If all the input checks out save it to the database
  Else render to a fail page to tell the user what they entered didn't work
