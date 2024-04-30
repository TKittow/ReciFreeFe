# ReadMe ReciFree

### Description

Recifree is an app where you can upload and view recipes online.

### Deployment link

###### GitHub:
[Frontend](https://github.com/TKittow/ReciFreeFe)
[Backend](https://github.com/TKittow/ReciFree)

###### Deployment:
[Frontend](https://recifreefe-production.up.railway.app/)
[Backend](https://recifree-production.up.railway.app/)


### Timeframe & Working Team (Solo/Pair/Group)

This was a solo project that I had 2 days to complete. I have since revisited this and created much more functionality

### Setup and configuration

This app does not work unless you are logged in - none of the data will load.

To delete an account please send me an email - toby@kittow.com.


### Technologies Used

* Python
* JavaScript
* React
* Node.js
* HTML
* CSS
* Django
* PostgreSQL
* Railway



### Brief

* Architect, design and build a full stack web application using Python based Django Web Framework.
* Connect to and perform data operations on a PostgreSQL database.
* Have at least two data entities in addition to the built in user model, with at least one one-to-many and one many-to-many relationships between entities.
* Have full create, read, update and delete data operations.
* Authenticate users using Django’s built-in authentication.
* Implement authorisation by restricting user access to the creation, updating and deleting of data resources.
* Be deployed online using Railway.


### Build/Code Process

I started by building my backend, configuring my .env file and my settings.py. I then created a React front-end as I felt more comfortable working on this as of my last project.

##### Backend

I created a serializer for each of my ERD tables in serializers.py. I then created all the same views.py with an additional LogoutView and SignupView to handle my logins.

```
class LogoutView(APIView):
    def post(self, request):
        try:
            refresh_token = request.data["refresh_token"]
            token = RefreshToken(refresh_token)
            token.blacklist()

            return Response(status=status.HTTP_205_RESET_CONTENT)
        except Exception as e:
            return Response(status=status.HTTP_400_BAD_REQUEST)

class SignupView(APIView):
    def post(self, request):
        username = request.data.get('username')
        email = request.data.get('email')
        password = request.data.get('password')
        
        try:
            new_user = User.objects.create(username=username, email=email)
            new_user.set_password(password)
            new_user.save()
            return Response(status=status.HTTP_200_OK)
        except Exception as e:
            return Response(status=status.HTTP_400_BAD_REQUEST)
```


##### Frontend

###### Interceptor

I created an axios.js file as my interceptor for the responses from HTTP requests made using Axios. Upon a failed request due to not being authorized, it will attempt to refresh the user’s token stored in the browser’s local memory. If the token is able to be refreshed it will then update the token and attempt to retry the original HTTP request that failed with the new updated token.

```
import axios from "axios"

let refresh = false

axios.interceptors.response.use(
    resp => resp,
    async error => {
        console.log(error.response.status)
        if(error.response.status === 401 && !refresh) {
            refresh = true
            const response = await axios.post(
                `${process.env.REACT_APP_BACKEND_URL}/token/refresh/`,
                {
                    refresh: localStorage.getItem('refresh_token')
                },
                {
                    headers: {
                        "Content-Type": "application/json"
                    }
                },
                {
                    withCredentials: true
                }
            )
            if ( response.status === 200 ) {
                axios.defaults.headers.common["Authorization"] = `Bearer ${response.data["access"]}`
                localStorage.setItem('access_token', response.data.access)
                localStorage.setItem('refresh_token', response.data.refresh)
                return axios(error.config)
            }
        }
        refresh = false
        return error
    }
)
```

###### Logging In/Out & Signup

I first started on the Signup.jsx 

I then created my frontend using react and set about making the HomePage.jsx and Login.jsx. The login page handles the user login by sending credentials to the backend API. It then stores access and refresh tokens in the browser’s local storage:

```
export default function Login() {
  const userRef = useRef();
  const pwdRef = useRef();

  async function handleSubmit(e) {
    e.preventDefault();
    const user = {
      username: userRef.current.value,
      password: pwdRef.current.value,
    };

    const { data } = await axios.post(
      `${process.env.REACT_APP_BACKEND_URL}/token/`,
      user,
      {
        headers: { "Content-Type": "application/json" },
      },
      {
        withCredentials: true,
      }
    );
    localStorage.clear();
    localStorage.setItem("access_token", data.access)
    localStorage.setItem("refresh_token", data.refresh)

    axios.defaults.headers.common["Authorization"] = `Bearer ${data.access}`;
    
  

    window.location.href = "/"
  }
```

I used a consistent approach with the logout to achieve the same (or opposite) result.

###### Recipes

I then worked on the RecipeIndex.jsx using a tried and true system of importing the recipes into a useState with an Axios get request, then using the map method to get every recipe listed.

Next was the RecipeDetail.jsx which aside from hosting the details of a specific recipe also houses an update and delete function. Using the put and delete methods respectively.

Lastly was the AddRecipe.jsx which I used a handleChange function for, updating a useState for each of the fields. Upon pressing ‘Submit’ the recipeData will be bundled up and sent as a post request through Axios with an authorization Bearer token. Then the user will be relocated to the RecipesIndex.jsx page:

```
const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
            const recipeData = {
                name: name,
                author: currentUser().user_id,
                description: description,
                ingredients: ingredients,
                image: image,
            };
    
            await axios.post(
                `${process.env.REACT_APP_BACKEND_URL}/recipes/`,
                recipeData,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
                        "Content-Type": "application/json",
                    },
                }
            );
            window.location.href = `/recipes/`;
        } catch (err) {
            console.error(err);
        }
    };
``` 

###### TheMealDB API

I knew I wanted to use an API that was able to populate the page with recipes from searching, however as I only had two days to complete this, I ended up completing this after the course was finished.

![ReciFree Search using API](https://github.com/TKittow/ReciFreeFe/blob/main/public/ReciFree%20-%20Themealdb%20API.png)

TheMealDB was incredibly easy to use, I just searched in the link given and used a variable that would be updated based on the change in the text input. From here I stored the searchResults in a useState and populated the page accordingly.

```
const searchMealByName = async (mealName) => {
    try {
      const response = await axios.get(`https://www.themealdb.com/api/json/v1/1/search.php?s=${mealName}`);
      return response.data.meals || [];
    } catch (error) {
      console.error('Error fetching meal data:', error);
      return [];
    } finally {
      setIsSearching(false);
    }
  };
```

###### Adding Recipes / Meals

I used a currentUser.js file to decode the JWT token and return the user’s ID. I then used the ID to do a fetch in my server and retrieve the username of the User to store in the author field, the rest I get the user to enter as details in my addRecipe form:

![ReciFree - Ingredients Added](https://github.com/TKittow/ReciFreeFe/blob/main/public/ReciFree%20-%20Ingredients%20added.png)


For the saving of the meals (The API saved recipes) I wanted to use a source-changer to get rid of the noise for a link and just keep the actual source itself. This would get rid of the https:// part and anything at and after the first symbol.

```
  function sourceChanger(source) {
        //eslint-disable-next-line
        const domainRegex = /^(?:https?:\/\/)?(?:[^@\/\n]+@)?(?:www\.)?([^:\/\n?]+)/g;
        const matches = domainRegex.exec(source);

        if (matches && matches.length >= 2) {
            const domain = matches[1];
            const dotIndex = domain.indexOf('.');
            return dotIndex !== -1 ? domain.substring(0, dotIndex) : domain;
        } else {
            return null;
        }
    }
```
###### Ingredients

The ingredients are currently static as a proof of concept but I created some popular ingredients in a list which have a many to many relationship with Recipes.


####### MyPage.jsx

I first created a backend script to return any API saved meals where the author’s username is the same as the user signed in. To reduce lag on this operation I used the username in the link and recalled it using useParams to enter into the getMeals() function. This was a lot more consistent and faster than doing two searches (one for the username of the user and one for the meals).

### Challenges

I used Railway to deploy this app and encountered a whole host of problems in deploying the frontend.

I really struggled configuring the backend to begin with. The relationships between the serializer and the models took me a while to properly get the hang of as this was my first project using python on the backend. This was most noticeable when trying to add ingredients when creating a new recipe. However, I eventually figured out that I had incorrectly configured my middle-man model ‘RecipeIngredient’.


### Wins

Having completed this project I felt a lot more comfortable with Python but also feel keen to take on a more Python-centric app/program. I really felt happy to spend more time on this app as initially I was quite apprehensive about adding more features and functionality.

### Key Learnings/Takeaways


I feel much more comfortable with python after this project. I really enjoyed working on the backend too; the processes and reasonings behind the backend logic felt more clear with this project. 


### Future Improvements

* Completely blocking access without logging in.
* Fixing the refresh error - currently the computer will remember your login but not automatically refresh your token (stopping you from viewing any data).
