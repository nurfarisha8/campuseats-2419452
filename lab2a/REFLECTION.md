# Week 1 reflection

Answer each question in 1-3 sentences, in your own words.

1. What is the df=ifference between building a UI imperatively (plain DOM code) and declaratively (React)?

in plain DOM code, we need to manually update UI step by step but in React, we describe what we want to display and React update the UI automatically when data changes

2. Why must a component name start with a capital letter?

React use capital letters to recognise custom components. If name starts with lowercase letter, React will treat it like normal HTML tag

3. What does a fragment <>...</> do, and why not just use a <div>?

fragment lets me group multiple elements without creating extra HTML element. it keep the code cleaner compared to add unnecessary <div> tag

4. Name one benefits of splitting the UI into small components.

it makes the code easier to manage and reuse. if i need to change one part of UI, I only need to update the related component
