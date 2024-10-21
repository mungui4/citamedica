import { collection, getDocs, getDoc, deleteDoc, doc } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { db } from '../../firebase/config'
import { Link, useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2';
import ver from'../../assets/styles/VerRegistro.module.css'


export const VerRegistro = () => {
  const navigate = useNavigate();
  const [citas, setCitas]= useState([]);
  const [loading, setLoading]= useState(true);

  const citasCollection = collection(db,"citas");

  const getCitas = async ()=>{
  const data = await getDocs(citasCollection)
  console.log(data.docs);
  setCitas(
    data.docs.map((d)=>({...d.data(),id:d.id}))
  )
  console.log(citas);
  setLoading(false);
  
   }

   const deleteCitas = async (id) => {

    Swal.fire({
      title: '¿Estás seguro?',
      text: "Esta acción no se puede deshacer",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then(async (result) => {
      if (result.isConfirmed) {
        const citasDoc = doc(db, "citas", id);
        await deleteDoc(citasDoc);
        getCitas();
        Swal.fire(
          'Eliminado',
          'La cita ha sido eliminada con éxito.',
          'success'
        );
      }
    });
  };
  
   

  useEffect(()=>{
getCitas();
  },[])

  return (
    <div>
      <table className={ver.table}>
        <thead >
          <tr>
            <th className={ver.encabezado}>Nombre del Paciente</th>
            <th className={ver.encabezado}>Fecha de Nacimiento</th>
            <th className={ver.encabezado}>Número de Identificación</th>
            <th className={ver.encabezado}>Nombre del Doctor</th>
            <th className={ver.encabezado}>Día de la Cita</th>
            <th className={ver.encabezado}>Hora de la Cita</th>
            <th className={ver.encabezado}>Opciones</th>
          </tr>
        </thead>
        <tbody>
          {
            citas.length > 0 ? citas.map((cita) => (
              <tr key={cita.id} className={ver.tr}>
                <td className={ver.td}>{cita.nombrePaciente}</td>
                <td className={ver.td}>{cita.nacimiento}</td>
                <td className={ver.td}>{cita.dui}</td>
                <td className={ver.td}>{cita.nombreDoctor}</td>
                <td className={ver.td}>{cita.diaCita}</td>
                <td className={ver.td}>{cita.horaCita}</td>
                <button onClick={() => navigate(`/editar-citas/${cita.id}`)}>Editar</button>
                <button onClick={() => deleteCitas(cita.id)}>Borrar</button>
                
              </tr>
            )) : loading ? (
              <tr className={ver.tr}>
                <td colSpan={7}><h1>Loading</h1></td>
              </tr>
            ) : (
              <tr className={ver.tr}>
                <td colSpan={7}><h1>No hay citas</h1></td>
              </tr>
            )
          }
        </tbody>
      </table>
    </div>
  );
  
}