 
 ## Maybelline MakeUp Store (Fake Store Product Catalog)

 # Task List for Maybelline Store Catalog

 Requirements:
    - The web page should be: Single page application
    - There should be only one main page with dynamic content. The store name or logo should be displayed at the top of the page
    - On the page there should be a grid of product cards and a category menu
    - Product Cards should display: Product Image, Title, Price, Category, Add to Cart Button.
    - All categories should be displayed in a menu. Clicking a category should filter the products

    Categories: All categories should be displayed in a menu. Clicking a category should filter the products
    Cart: Should display added items. Have a "Make Purchase" button
    Pagination: Display 8 products per page. Have Previous and Next buttons to navigate pages

1. Find free api (store api) you can use to fetch the products data. I chose to make an app for makeup products. 

2. Creating folder structure of the project. <br>
     - Create a HTML page <br>
     - Connect script, CSS file and libraries (if any). <br>
     - Add other assets (images, fonts etc.)

3. HTML Structure 
Basic structure of the page: 
    => Creating the header section to display the store name and logo.
    => Paragraph with information about the store
    => Category menu with clickable categories(all categories)
    => Pagination with "Previous" and "Next" Buttons
    => Cart section: Make Purchase button
    => Adding Product cards with title, image, price and category.
    => Creating placeholders for the cart items list and a total price area.

4. CSS Styling (Designing the Layout)
Simple and clean design: 
    => Style the header, paragraph and category menu for better visual heirarchy.
    => Using FlexBox or Grid for the products layout
    => Styling for the cards (including image, title, price, and category)
    => Also, creating style buttons (Add to Cart, Previous, Next) to make them interactive.

5. JavaScript  (adding interactivity on the web page) 

The basic features are: Fetching products from an API, Rendering products dynamically, Implementing cart functionality, Adding category filtering and pagination.

    => Fetching Product Data from the API
    => Display the products dynamically 
        - Using a loop to iterate through the array of products.
        - For each product, create a card with its image, title, price, and category.
        - Add an "Add to Cart" button for each product.
        - Insert each product card into the product list container on the page.
    => Cart Functionallity 
        - Adding Items for Cart
        - Define an empty cart array to hold products.
        - When a user clicks the "Add to Cart" button, push the selected product into the cart.
    => Display Cart Contents (also, update the cart's total price dynamically)
    => Pagination Functionallity (Show 8 products per page and navigate between pages.)
        - Update the product list when the user clicks "Previous" or "Next"
    => Category Filtering
    => Make Purchase Button 
        Define an event listener for the "Make Purchase" button.
        Display a thank you message.
        Clear the cart array and update the cart display.

