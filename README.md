# Readme

# Problem

A front-end form will allow the user to input a integer number between 0 and 100. When
submitting the form, the user will receive the conversion of this number into roman numerals.
So for example, if a user inputs “9” and submits the form, the page should display “IX”.

input user: 0>=N<=100

2 Steps:
- HTTP Endpoint
- SSE Event

# Install

Here is some steps to run the project locally

```
npm install

npm run dev
```

And open the `./index.html` file :)

# Informations

- I tested some natives node.js function on this test. There is some improvements to do, especially on the test part since I didn't tested the http endpoint unitary but only the "convertToRomanNumeral" function
- I don't think this test was particulary focus on software architecture so, I just kept it simple and putted my converter outside the entrypoint.
- I created 2 html buttons to test the html & sse endpoint, instead 2 differents version of the code 
- Around 90min to complete this test (sorry I got things to do this afternoon)