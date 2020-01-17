#Recipes & Food Pantry App
## App outline
The idea behind this app is to combine a recipes app where users can search and upload their own recipes with a pantry 
application that tracks what food the users has in their various cupboards and a shopping list app that generates a 
shopping list based off of specific user defined criteria.

On initial setup a user can add the various food cupboards such as **pantry**, **fridge**, **freezer** and then add 
their food to these areas. When adding the food they can also set minimum and maximum limit of what is the minimum
amount they should hold before you need to buy more and what the most you should hold at any one time.

Users can then search the database for recipes. They can filter available recipes based on what ingredients they have
available or based on a particular food type. When the user has selected a recipe they can hit a button and the
ingredients for that recipe will be deducted from the food in their virtual cupboards.

When a the amount available of a particular food item drops below the **min** value set by the user, the item will be 
added to an automatically generated shopping list. The amount suggested to buy will be based on the **max** value set. 
When a user has purchased their shopping they have the option to manual alter the quantity bought and then hit a button 
to automatically update the food in their virtual cupboards.

## User scenarios
## Database Schema
### Users
```json
{
    "firstName": "Joe",
    "lastName": "Blogs",
    "emailAddress": "j.bloggs@gmail.com",
    "username": "jbggs21"
}
```

### Recipes
```json
{
    "name": "Chili Con Carne"
    "foodType": "Beef",
    "ingredients": [
        {
            "name": "Minced Beef",
            "amount": 500,
            "measurement": "Grams"
        }
    ],
    "method": [
        "Brown Mince"
    ],
    "author": "jbggs21",
    "tags": [
        "Mexican"
    ]
}
```

### Food Types 
```json
{
  "name": "Beef"
}
```

### Ingredient
```json
[
    {
        "name": "Minced Beef",
        "defaultUnit": "Grams",
        "foodCupboard": "Fridge",
        "minimumLevel": 500,
        "maximumLevel": 2000
    }
]
```

### Food Cupboards
```json
[
    {
        "name": "Fridge"
    }
]
```

### Shopping List
```json
[
    {
        "name": "Minced Beef",
        "quantity": 1500,
        "unit": "Grams"
    }
]
```