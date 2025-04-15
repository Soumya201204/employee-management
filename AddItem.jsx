import { useNavigate } from 'react-router-dom'
import '../styles/additem.css'
import {useState} from 'react'

import axios from 'axios'

const AddItem = ()=>{
    let [name, setName] = useState()
    let [description, setDescription] = useState()
    let [price, setPrice] = useState()
    let [category, setCategory] = useState()
    let [image, setImage] = useState()

    let navigate = useNavigate()


    const submitData = (e)=>{
        e.preventDefault()
        console.log(name, description, price, category, image)
        axios.post('http://localhost:5050/api/addFoodItem', {name, description, price, category, image})
        .then(function(result){
            console.log(result)
            if(result.data.message === "Inserted data successfully")
            {
                alert(result.data.message)
                navigate('/menu')
            }

        })
        .catch(function(error){
            alert("Some error while adding food item")
        })

    }


   return(
    <div id="add-food-item">
         <div className="food-form-container">
        <h1 className="form-title">Add New Dish</h1>
        <form>
            <div className="form-group">
                <input type="text" id="food-name" required onChange={(e)=>{setName(e.target.value)}} />
                <label className="floating-label" for="food-name">Dish Name</label>
            </div>

            <div className="form-group">
            <input type="text" id="food-name" required onChange={(e)=>{setDescription(e.target.value)}} />
                <label className="floating-label" for="description">Description</label>
            </div>

            <div className="form-group">
                <input type="number" id="price" step="0.01" onChange={(e)=>{setPrice(e.target.value)}} required />
                <label className="floating-label" for="price">Price ($)</label>
            </div>

            <div className="form-group">
                <input type="text" id="image" onChange={(e)=>{setImage(e.target.value)}} required />
                <label className="floating-label" for="image">Image Url</label>
            </div>
            
           
            
            <div className="form-group">
                <input type="text" id="category" onChange={(e)=>{setCategory(e.target.value)}} required />
                <label className="floating-label" for="category">Category</label>
            </div>
            

            <button  className="submit-btn" onClick={submitData}>Add Dish</button>
        </form>
    </div>

</div>
   )
}

export default AddItem