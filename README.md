--Readme document for *author(s)*, *email(s)*, *UCI id(s)*--
Hung Bui, hungdb@uci.edu, 29464164



1. How many assignment points do you believe you completed (replace the *'s with your numbers)?
22/25
- 10/10 Created a functional web app
- 4/5 The ability to control the web app with basic gestures (1pt per gesture)
- 3/4 The ability to control the web app with at least two custom gestures
- 2/2 Following good principles of UI design
- 1/2 Creating a compelling app and application of gestures
- 2/2 A readme and demo video which explains how these features were implemented and their design rationale

2. How long, in hours, did it take you to complete this assignment?
About 16


3. What online resources did you consult when completing this assignment? (list specific URLs)
Basic JS stuff(mostly debugging):
https://www.w3schools.com/js/js_array_iteration.asp
https://flexiple.com/javascript/optional-parameter-javascript/
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter
https://bobbyhadz.com/blog/typescript-object-is-possibly-null#:~:text=The%20%22Object%20is%20possibly%20

CSS:
https://css-tricks.com/snippets/css/a-guide-to-flexbox/
Colors: https://colorhunt.co/palettes/popular

Joke API documentation: https://sv443.net/jokeapi/v2/

Image From:
https://www.flaticon.com/free-icons/hand
https://www.flaticon.com/free-icons/cursor
https://www.flaticon.com/free-icons/fist
https://www.flaticon.com/free-icons/next
https://www.flaticon.com/free-icons/previous
https://www.flaticon.com/free-icons/star
https://www.flaticon.com/free-icons/trash



4. What classmates or other individuals did you consult as part of this assignment? What did you discuss?
None.


5. Is there anything special we need to know in order to run your code?
Needs a wifi connection, as it is dependent on an online API.
IMPORTANT: Also, right and left swiping may be inverted when it is run, due to different camera settings.
When swiping left and right, make sure that you remove your open hand from the screen in order for the swipe to reset.
Also, one part of the app uses hands, the other part(viewing favorited jokes) you must use a mouse or trackpad.


--Aim for no more than two sentences for each of the following questions.--


6. Did you design your app with a particular type of user in mind? If so, whom?
Yes! For someone who likes programming jokes.

7. Describe the two custom gestures you created.
Swipe right: A swipe right event is emitted when the hand has been detected to be moving to the right. The first two detection frames that an open hand remains on the frame determines the direction that swipe is. This swipe direction is emitted once, and no other event can occur  until .5 seconds has passed since an open hand has been detected on the screen.

Swipe left: The same exact thing but the other direction

8. How does your app implement or follow principles of good UI design?
Some undo functionality: Can favorite and unfavorite joke
Intuitive controls: swiping hand left and swiping hand right switch to previous and next jokes
Usage of icons and adherence to colors for functionality(red = discard)
Kept in mind that handtracking sometimes doesn't detect correctly, so the higher-risk functions (like discarding all jokes, favoriting/unfavoriting, generating new jokes fro API) use hand signals that are less likely to accidentally be emitted(two pointing hands, pointing hand, two open hands).
