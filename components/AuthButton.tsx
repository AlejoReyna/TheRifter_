"use client"

import { useSession, signIn, signOut } from "next-auth/react"

export default function AuthButton() {
    const { data: session, status } = useSession()
    const loading = status === "loading"

    if (loading) {
        return <div>Cargando...</div>
    }

    if (session) {
        return (
            <>
                Sesión iniciada como {session.user?.email} <br />
                <button onClick={() => signOut()}>Cerrar sesión</button>
            </>
        )
    }

    return (
        <>
            No has iniciado sesión <br />
            <button onClick={() => signIn()}>Iniciar sesión</button>
        </>
    )
}