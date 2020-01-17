#Recipes & Food Pantry App
## App outline
The idea behind this app is to combine a recipes app where users can search and upload there own reipes with a pantry 
application that tracks what food the users has in their various cupboards.

On initial setup a user can add the various food cupboards such as **pantry**, **fridge**, **freezer** and then add 
their food to these areas. When adding the food they can also set minimum and maximum limit.

Users can the search the database for recipes. They can filter available recipes based on what ingredients they have
available or based on a particular food type. When the user has selected a recipe they can hit a button and the
ingredients for that recipe will be deducted from the food in their virtual cupboards.

When a the amount available of a particular food item drops below the **min* value set, the item will be added to an
automatically generated shopping list. The amount suggested to buy will be based on the **max** value set. When a user 
has purchased their shopping they have the option to manual alter the quantity bought and then hit a button to 
automatically update the food in their virtual cupboards.

## User scenarios
## Database Schema
### Users
```json
{
 "firstName": String,
 "lastName": String,
 "emailAddress": String,
 "username": String
}
```

### Recipes
```json 
{
 "name": String
 "foodType": String,
 "ingredients": [
   {
     "name": String,
     "amount": Number,
     "measurement": String
   }
 ],
 "method": [
   String
 ],
 "author": String,
 "tags": [
   String
 ]
}
```

### Food Types 
```json
{
 "name": String
}
```

### Ingredients
```json
[
 {
   "name": String,
   "defaultUnit": String,
   "foodCupboard": String
 },
 {
   "name": String,
   "defaultUnit": String,
   "foodCupboard": String
 }
]
```

### Food Cupboards
```json 
[
 {
   "name": String
 }
]
```