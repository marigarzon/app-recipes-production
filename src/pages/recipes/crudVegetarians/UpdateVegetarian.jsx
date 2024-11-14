import { useState, useEffect } from 'react'
let urlRecipes = 'http://localhost:3000/vegetarians'
import { useParams } from 'react-router-dom'
import axios from "axios"
import Swal from "sweetalert2"

const UpdateVegetarian = () => {
    const [stateNombre, setStateNombre] = useState('')
    const [stateDescripcion, setStateDescripcion] = useState('')
    const [stateTiempo, setStateTiempo] = useState('')
    const [stateDificultad, setStateDificultad] = useState('')
    const [stateImg, setStateImg] = useState('')
    let { id } = useParams()


    async function getRecipesId() {
        axios.get(urlRecipes);
        console.log(await axios.get(urlRecipes + "/" + id));
        let response = await axios.get(urlRecipes + "/" + id);
        console.log(response.data);
        setStateNombre(response.data.nombre);
        setStateDificultad(response.data.dificultad);
        setStateTiempo(response.data.tiempo);
        setStateDescripcion(response.data.descripcion);
        setStateImg(response.data.img);

    }
    useEffect(() => {
        getRecipesId()
    }, []);


    function confirmUpdate() {
        Swal.fire({
            title: "Está seguro que desea Actualizar esta receta? ",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Si, Actualizar!"
        }).then((result) => {
            if (result.isConfirmed) {
                updateRecipe(id)
                Swal.fire({
                    title: "Actualizado!",
                    text: "La receta ha sido actualizada.",
                    icon: "success"
                });
            }
        });
    }

    async function updateRecipe(id) {
        let newRecipe = {
            nombre: stateNombre,
            tiempo: stateTiempo,
            dificultad: stateDificultad,
            descripcion: stateDescripcion,
            img: stateImg,
        };
        await axios.put(urlRecipes + "/" + id, newRecipe);
    }

    return (
        <form>
            <input onChange={(e) => setStateNombre(e.target.value)} placeholder="Nombre" type="text" value={stateNombre} />
            <input onChange={(e) => setStateTiempo(e.target.value)} placeholder="Tiempo preparación" type="text" value={stateTiempo} />
            <input onChange={(e) => setStateDificultad(e.target.value)} placeholder="Dificultad" type="text" value={stateDificultad} />
            <input onChange={(e) => setStateDescripcion(e.target.value)} placeholder="Descripcion" type="text" value={stateDescripcion} />
            <input onChange={(e) => setStateImg(e.target.value)} placeholder="urlImg" type="text" value={stateImg} />
            <input onClick={() => confirmUpdate()} type="button" value="Editar Receta" />
        </form>
    )
}

export default UpdateVegetarian