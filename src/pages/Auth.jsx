"use client"

export default function Auth() {
  return (
    <div className="auth-page">
      <h2>Crear cuenta</h2>
      <form>
        <input type="text" placeholder="Nombre" />
        <input type="email" placeholder="Correo electrónico" />
        <input type="password" placeholder="Contraseña" />
        <button type="submit">Registrarme</button>
      </form>
    </div>
  )
}
