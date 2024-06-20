--------------------------------------------------------------- 
 1. About this
--------------------------------------------------------------- 

This is the solution i made for problem 3. I have list out the computational inefficiencies and anti-patterns i have 
found at file oldCode.js as the comments, like:

- Having some variables and function that didn't declare or get used, or potentional incorrect variable names
- Having a destructuring that is unecessary 
- Having nested if statement in 2 places, that can be removed
- Missing returning 0 in a sorting

i have made a refactored version that can be found in newCode.js that i tried to fix the problems or tried to optimize them.