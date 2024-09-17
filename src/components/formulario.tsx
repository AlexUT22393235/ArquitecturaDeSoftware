import React, { useState } from "react";

interface Usuario {
    nombre: string;
    edad: number;
    esEstudiante: boolean;
    direccion: string
};

const FormularioUsuarios: React.FC = () => {
    const [nombre, setNombre] = useState<string>("");
    const [edad, setEdad] = useState<number>(0);
    const [esEstudiante, setEsEstudiante] = useState<boolean>(false);
    const [direccion, setDireccion] = useState<string>("");
    const [usuarios, setUsuarios] = useState<Usuario[]>([]);
    //Inicialización de gestión de errores al enviar datos vaciós.
    const [error, setError] = useState<string | null>(null); 

    //Manejador del envio de formulario
    const agregarUsuario = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        //Manejar datos vacíos en el formulario;

        //Condicional para verificar datos nulos
        if (nombre === "" || edad <= 0 || direccion === "") {
            setError('Los campos indicados "*" deben ser completados');
            return;
        }
        //Cambiar estado de alerta en caso de que los campos requeridos hayan sido llenados;
        setError(null);

        //Crear nuevo usuario
        const nuevoUsuario: Usuario = { nombre, edad, esEstudiante, direccion };
        //Agregar el usuario al array de usuarios
        setUsuarios([...usuarios, nuevoUsuario]);

        //Limpiar el formulario
        setNombre("");
        setEdad(0);
        setEsEstudiante(false);
        setDireccion("");
    };

    const clearData = () => {
        setUsuarios([])
    }

    //PINTAR
    return (
        <>
            <div className="min-h-screen flex justify-center bg-black">
                <div className="bg-black p-4 w-80 border-2 border-white">
                    <div className="flex flex-col">
                        
                        <h1 className="text-2xl mb-4 text-white text-center">Formulario</h1>
                        {error && <p className="text-red-500">{error}</p>}


                        <form onSubmit={agregarUsuario}>
                            <label className="text-white block">Nombre*:</label>
                            <input
                                type="text"
                                
                                value={nombre}
                                onChange={(e) => setNombre(e.target.value)}
                                className="border-b-2 p-2 mb-2 text-white bg-black w-full"
                            />
                            <label className="text-white block">Edad*:</label>
                            <input
                                type="number"
                                value={edad}
                                onChange={(e) => setEdad(Number(e.target.value))}
                                className="border-b-2 p-2 mb-2 text-white bg-black w-full"
                            />

                            <label className="mb-2 text-white block">
                            Marque la casilla si es estudiante
                            </label>
                            <input
                                type="checkbox"
                                checked={esEstudiante}
                                onChange={(e) => setEsEstudiante(e.target.checked)}
                            />
                            <label className="mb-2 text-white block">
                            Dirección*:
                            </label>
                            <input
                                type="text"
                                value={direccion}
                                onChange={(e) => setDireccion(e.target.value)}
                                className="border-b-2 p-2 mb-2 text-white bg-black w-full"
                            />
                            <button type="submit" className="block bg-black text-white p-2 mt-4 border-white border-2 w-full">Agregar Usuario</button>
                        </form>
                        <button onClick={clearData} className="bg-red-500 text-white p-2 mt-4 w-auto">Limpiar Usuarios</button>
                    </div>
                    {/* Si el formulario le hace falta algun campo, no renderizar la lista
                    Si no tiene datos, no renderizar la lista */}
                    {/* Mostrar la lista de usuarios */}
                    {usuarios.length!=0 &&
                    <div className="bg-black mt-4 h-max">
                    <h2 className="text-xl text-white">Lista de Usuarios</h2>
                    <ul>
                        {usuarios.map((usuario, index) => (
                            <li key={index} className="border p-2 mt-2">
                                <p className="text-white">Nombre: {usuario.nombre}</p>
                                <p className="text-white">Edad: {usuario.edad}</p>
                                <p className="text-white">Estudiante: {usuario.esEstudiante ? "Sí" : "No"}</p>
                                <p className="text-white">Dirección: {usuario.direccion}</p>
                            </li>
                        ))}
                    </ul>
                </div> }
                    
                </div>
            </div>
        </>
    );
}


export default FormularioUsuarios;
