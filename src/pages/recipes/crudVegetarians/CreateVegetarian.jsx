import { useState, useEffect } from 'react'
let urlRecipes = 'http://localhost:3000/vegetarians'

const CreateVegetarian = () => {

    const [stateRecipes, setStateRecipes] = useState([])
    const [stateNombre, setStateNombre] = useState('')
    const [stateInstrucciones, setStateInstrucciones] = useState('')
    const [stateTiempo, setStateTiempo] = useState('')
    const [stateDificultad, setStateDificultad] = useState('')
    const [stateIngredientes, setStateIngredientes] = useState('')
    const [stateTipo, setStateTipo] = useState('')
    const [stateImg, setStateImg] = useState('')

    function getRecipes() {
        fetch(urlRecipes)
            .then(response => response.json())
            .then(json => setStateRecipes(json))
    }
    useEffect(() => {
        getRecipes()
    }, [])

    function createRecipe() {
        let newRecipe = {
            nombre: stateNombre,
            tipo: stateTipo,
            dificultad: stateDificultad,
            instrucciones: stateInstrucciones,
            ingredientes: stateIngredientes,
            img: stateImg,
            tiempo: stateTiempo
        }
        fetch(urlRecipes, {
            method: 'POST',
            body: JSON.stringify(newRecipe)
        })
            .then((response) => response.json())
            .then((data) => { console.log(data) })
            .catch((error) => console.log(error))
    }

    function addRecipe() {
        if (findRecipe()) {
            alert('La receta ya existe en la base de datos')
        } else {
            createRecipe()
        }
    }
    function findRecipe() {
        let find = stateRecipes.some((stateRecipe) => stateRecipe.nombre == stateNombre)
        return find
    }
    return (
        <form>
            <input onChange={(e) => setStateNombre(e.target.value)} placeholder="Nombre" type="text" />
            <input onChange={(e) => setStateInstrucciones(e.target.value)} placeholder="Instrucciones" type="text" />
            <input onChange={(e) => setStateTiempo(e.target.value)} placeholder="Tiempo preparación" type="text" />
            <input onChange={(e) => setStateDificultad(e.target.value)} placeholder="Dificultad" type="text" />
            <input onChange={(e) => setStateIngredientes(e.target.value)} placeholder="Ingredientes" type="text" />
            <input onChange={(e) => setStateTipo(e.target.value)} placeholder="Tipo" type="text" />
            <input onChange={(e) => setStateImg(e.target.value)} placeholder='Imagen de receta' type="text" />
            <input onClick={addRecipe} type="button" value='Crear Receta' />
        </form>
    )
}

export default CreateVegetarian