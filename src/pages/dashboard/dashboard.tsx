import { AuthContext } from '@/context/AuthContext';
import React from 'react'

export default function Dashboard() {

    const { logOut } = React.useContext(AuthContext);

    const handleLogOut = async () => {
        await logOut();
    }
    
    return (
        <div className="p-8">
            <h1 className="text-2xl font-bold">Dashboard</h1>
            <p>¡Bienvenido al dashboard!</p>
            {/* logout button */}
            <button className="mt-4 px-4 py-2 bg-red-500 text-white rounded" onClick={handleLogOut}>
                Cerrar sesión
            </button>
        </div>
    )
}
