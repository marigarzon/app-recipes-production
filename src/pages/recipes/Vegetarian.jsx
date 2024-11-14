import { Link } from "react-router-dom"
import { useEffect, useState } from 'react'
import axios from "axios"
import Swal from "sweetalert2"
// import { recipesVegetarian } from "../../data/dataRecipes"
import './Vegetarian.css'
let urlRecipes = 'http://localhost:3000/vegetarians/'

const Vegetarian = () => {
  const [stateRecipes, setStateRecipes] = useState([])

  function getRecipes() {
    fetch(urlRecipes)
      .then(response => response.json())
      .then(json => setStateRecipes(json))
  }

  useEffect(() => {
    getRecipes()
  }, [])

  function confirmDelete(id, nombre) {
    Swal.fire({
      title: "Está seguro que desea eliminar esta receta: " + nombre,
      text: "No se puede revertir esta acción!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, Eliminar!"
    }).then((result) => {
      if (result.isConfirmed) {
        deleteRecipe(id)
        Swal.fire({
          title: "Eliminado!",
          text: "La receta ha sido eliminada.",
          icon: "success"
        });
      }
    });
  }
  function deleteRecipe(id) {
    axios.delete(urlRecipes + id)
    getRecipes()
  }

  return (
    <div className="cards">
      {
        stateRecipes.map((recipeVegetarian) => (
          <div key={recipeVegetarian.id} className="card">
            <img src={recipeVegetarian.img} alt={recipeVegetarian.nombre} />
            <h3>Nombre: {recipeVegetarian.nombre}</h3>
            <p>Descripción: {recipeVegetarian.descripcion}</p>
            <p>Dificultad: {recipeVegetarian.dificultad}</p>
            <p>Tiempo: {recipeVegetarian.tiempo}</p>
            <section className="botones">
              <Link className="boton">Detalle</Link>
              <Link to={'/dashboard/update-vegetarian/' + recipeVegetarian.id} className="boton">Editar</Link>
              <button type="button" onClick={() => confirmDelete(recipeVegetarian.id, recipeVegetarian.nombre)} className="boton">Eliminar</button>
            </section>
          </div>
        ))
      }
    </div>
  )
}

export default Vegetarian