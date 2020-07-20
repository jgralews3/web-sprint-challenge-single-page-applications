import React from "react";
import * as yup from "yup";
import axios from "axios";
import "./Form.css";

const Form = () => {
    const defaultState = {
        name: "",
        size: "",
        specs: "",
        pep: false,
        saus: false,
        broc: false,
        corn: false
    }

    const [formState, setFormState] = React.useState(defaultState);
    const [errors, setErrors] = React.useState(defaultState);
    const [order, setOrder] = React.useState([]);
    const [buttonDisabler, setDisabler] = React.useState(true);

    const formSchema = yup.object().shape({
        name: yup.string().required("Please Enter Name").min(2, "Name must be at least two characters"),
        size: yup.string().required("Please Select Size").min(5, "Please pick a size"),
        specs: yup.string(),
        pep: yup.boolean(),
        saus: yup.boolean(),
        broc: yup.boolean(),
        corn: yup.boolean()
    })

    const validateChange = e => {
        e.persist();
        yup
          .reach(formSchema, e.target.name)
          .validate(e.target.value)
          .then(valid =>
            setErrors({
              ...errors,
              [e.target.name]: ""
            })
          )
          .catch(error =>
            setErrors({
              ...errors,
              [e.target.name]: error.errors[0]
            })
          );}

          const changeHandler = (e)=>{
            const value = e.target.type === "checkbox" ? e.target.checked : e.target.value
            setFormState (
                {...formState, [e.target.name]: value}
            )
            validateChange(e);
        }

        const submitHandler = e => {
            e.preventDefault();
            console.log("submitted");
            axios
              .post("https://reqres.in/api/users", formState)
              .then(res => {
                setOrder([...order, res.data])
                console.log(order)
              })
              .catch(err => console.log(err));
          };

          React.useEffect(()=>{
            formSchema.isValid(formState).then(valid => setDisabler(!valid));
        }, [formState])


    return (
        <div>
            <form onSubmit={submitHandler}>
                <label htmlFor="name">Name:<input type="text" name="name" onChange={changeHandler} placeholder="Name"></input>{errors.length !== 0 && <p>{errors.name}</p>}</label>
                <label htmlFor="size">Size of Pizza: <select name="size" onChange={changeHandler}>
                    <option value="null">--Select Size--</option>
                    <option value="Small">Small</option>
                    <option value="Medium">Medium</option>
                    <option value="Large">Large</option>
                </select>{errors.length !== 0 && <p>{errors.size}</p>}</label>
                <label htmlFor="toppings" id="toppings">Choose Toppings:
                <label htmlFor="toppings"><input id="pep" type="checkbox" name="pep" onChange={changeHandler} />Pepperoni </label>
                <label htmlFor="toppings"><input type="checkbox" id="saus" name="saus" onChange={changeHandler} />Sausage </label>
                <label htmlFor="toppings"><input type="checkbox" id="broc" name="broc" onChange={changeHandler} />Broccoli </label>
                <label htmlFor="toppings"><input type="checkbox" id="corn" name="corn" onChange={changeHandler} />Corn</label>
                </label>
                <label className="specs" htmlFor="specs">Special Instructions: <input type="text" name="specs" onChange={changeHandler} placeholder="Special Instructions"></input></label>
                <button name="submit" disabled={buttonDisabler}>Add to Order</button>
            </form>
            {order.length !== 0 && <p id="outputname">Name on Order: {order[0].name}</p>}
            {order.map((order1, index)=>{
                return <div className="orders" key={order1}>
                    <p>Pizza #{index+1}</p>
                    <p>Size: {order1.size}</p>
                    <p>Toppings: 
                        {order1.pep === true && <span className="top">Pepperoni</span>}
                        {order1.saus === true && <span className="top">Sausage</span>}
                        {order1.broc === true && <span className="top">Broccoli</span>}
                        {order1.corn === true && <span className="top">Corn</span>}
                    </p>
                    {order1.specs.length !== 0 && <p>Special Instructions: {order1.specs}</p>}
                    </div>
            })}
        </div>
    )
}

export default Form;