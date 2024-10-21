import React, { useEffect } from 'react';
import reg from '../../assets/styles/RegistroCita.module.css';
import { useForm } from 'react-hook-form';
import { db } from '../../firebase/config';
import { getDoc, updateDoc, doc } from 'firebase/firestore';
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';

export const Edit = () => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const { id } = useParams();
    const navigate = useNavigate();

    const getCitasId = async (id) => {
        const cita = await getDoc(doc(db, "citas", id));
        if (cita.exists()) {
            reset(cita.data()); // Prellena el formulario con los datos de la cita existente
        } else {
            console.log("No existe la cita con este ID");
            alert("No existe la cita con este ID");
        }
    };

    const update = handleSubmit(async (data) => {
        try {
            const citas = doc(db, "citas", id);
            await updateDoc(citas, data);

            Swal.fire({
                position: "top-center",
                icon: "success",
                title: "Se ha editado correctamente",
                showConfirmButton: false,
                timer: 1500
              });
            navigate('/ver-citas');
        } catch (error) {
            console.error("Error actualizando la cita:", error);
            Swal.fire({
                position: "top-center",
                icon: "success",
                title: "Se ha producido un error",
                showConfirmButton: false,
                timer: 1500
              });
        }
    });

    useEffect(() => {
        if (id) {
            getCitasId(id);
        }
    }, [id]);

    return (
        <div className={reg.containerForm}>
            <form className={reg.form} onSubmit={update}>
                <label htmlFor="nombrePaciente">Nombre del paciente: </label>
                <input
                    type="text"
                    name="nombrePaciente"
                    id="nombrePaciente"
                    {...register("nombrePaciente", {
                        required: {
                            value: true,
                            message: 'Favor ingrese el nombre del paciente'
                        }
                    })}
                />
                {errors.nombrePaciente && <span className={reg.spanAlert}>{errors.nombrePaciente.message}</span>}

                <label htmlFor="nacimiento">Fecha de nacimiento: </label>
                <input type="date" name="nacimiento" id="nacimiento" {...register("nacimiento", {required: {value: true, message: 'Favor ingrese la fecha de nacimiento'}})}
                />
                {errors.nacimiento && <span className={reg.spanAlert}>{errors.nacimiento.message}</span>}

                <label htmlFor="dui">Número de identificación: </label>
                <input type="number" name="dui" id="dui"{...register("dui")}/>
                {errors.dui && <span className={reg.spanAlert}>{errors.dui.message}</span>}

                <label htmlFor="nombreDoctor">Nombre del doctor: </label>
                <input type="text" name="nombreDoctor" id="nombreDoctor" {...register("nombreDoctor", {required: {value: true,message: 'Debe ingresar el nombre del médico'}})}/>
                {errors.nombreDoctor && <span className={reg.spanAlert}>{errors.nombreDoctor.message}</span>}

                <label htmlFor="diaCita">Día de la cita: </label>
                <input type="date" name="diaCita" id="diaCita" {...register("diaCita", {required: {value: true,message: 'Debe ingresar una fecha'}})}/>
                {errors.diaCita && <span className={reg.spanAlert}>{errors.diaCita.message}</span>}

                <label htmlFor="horaCita">Hora de la cita: </label>
                <input type="time" name="horaCita" id="horaCita"{...register("horaCita", {required: {value: true, message: 'Debe ingresar una hora'
                        }})}/>
                {errors.horaCita && <span className={reg.spanAlert}>{errors.horaCita.message}</span>}

                <button className={reg.buttom} type='submit'>Actualizar Cita</button>
            </form>
        </div>
    );
}
