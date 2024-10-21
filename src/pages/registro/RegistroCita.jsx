import React from 'react'
import reg from'../../assets/styles/RegistroCita.module.css'
import { useForm } from 'react-hook-form'
import { db } from '../../firebase/config'
import { addDoc, collection } from 'firebase/firestore'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2';


export const RegistroCita = () => {
  const {register, handleSubmit, formState:{errors}, reset} = useForm();
  const navigate = useNavigate();


const onSubmit = handleSubmit(async(data)=>{
  try{
    await addDoc(collection(db,'citas'),data)

    Swal.fire({
      position: "top-center",
      icon: "success",
      title: "La cita ha sido creada",
      showConfirmButton: false,
      timer: 1500
    });
    reset();
    navigate('/ver-citas')
    
  }catch(error){
    console.log(error);
    alert(error);
    
  }
  
  
})


  return (
    <>
    <div className={reg.containerForm}>
      <form className={reg.form}  onSubmit={onSubmit}>
      
          <label htmlFor="nombrePaciente">Nombre del paciente: </label>
        <input type="text" name="nombrePaciente" id="nombrePaciente" {...register("nombrePaciente",{required:{
          value:true,
          message: 'Favor ingrese el nombre del paciente'
        }})} />
        {errors.nombrePaciente && <span className={reg.spanAlert}>{errors.nombrePaciente.message}</span>}
    
      
          <label htmlFor="nacimiento">Fecha de nacimiento: </label>
        <input type="date" name="nacimiento" id="nacimiento" {...register("nacimiento",{required:{
          value:true,
          message: 'Favor ingrese la fecha de nacimiento'
        }})}/>
         {errors.nacimiento && <span className={reg.spanAlert}>{errors.nacimiento.message}</span>}
        
      
          <label htmlFor="dui">Número de identificación: </label>
        <input type="number" name="dui" id="dui" {...register("dui")}/>     
      
          <label htmlFor="nombreDoctor">Nombre del doctor: </label>
        <input type="text" name="nombreDoctor" id="nombreDoctor" {...register("nombreDoctor",{required:{
          value:true,
          message: 'Debe ingresar el nombre del médico'
        }})}/>
        {errors.nombreDoctor && <span className={reg.spanAlert}>{errors.nombreDoctor.message}</span>}
        
      
        <label htmlFor="diaCita">Dia de la cita: </label>
        <input type="date" name="diaCita" id="diaCita" {...register("diaCita",{required:{
          value:true,
          message:'Debe ingresar una fecha'
        }})}/>
        {errors.diaCita && <span className={reg.spanAlert}>{errors.diaCita.message}</span>}
        
      
        <label htmlFor="horaCita">Hora de la cita: </label>
        <input type="time" name="horaCita" id="horaCita" {...register("horaCita",{required:{
          value:true,
          message:'Debe ingresar una hora'
        }})}/>
        {errors.horaCita && <span className={reg.spanAlert}>{errors.horaCita.message}</span>}
        
        <button className={reg.buttom} type='submit'>Realizar Cita</button>
        
      </form>
    </div>
    </>
  )
}
