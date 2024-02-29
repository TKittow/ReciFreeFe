// import { useContext, createContext, useState } from "react"
// import axios from 'axios'

// const ProjectContext = createContext()

// export function useProjects(){
//     return useContext(ProjectContext)
// }

// export const RecipesProvider = ({children}) => {
//     const [recipes, setRecipes] = useState([])

// async function getRecipes(){
//     axios.get(`${process.env.REACT_APP_BACKEND_URL}/recipes`)
//     .then(response => {
//         setRecipes(response.data)
//     })
//     .catch(err => {
//         console.error('Error fetchiing recipes', err)
//     })
// }

// async function addRecipe(newRecipe){
//     try{
//         const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/recipe/add`, newRecipe)
//         setRecipes(prevRecipes => [...prevRecipes, response.data]);
//     } catch (err) {
//         console.error("Error adding Recipes", err)
//     }
// }

// return (
//     <ProjectContext.Provider value={{
//         recipes,
//         addRecipe,
//         getRecipes,
//     }}
//     >
//         {children}
//     </ProjectContext.Provider>
// )
// }