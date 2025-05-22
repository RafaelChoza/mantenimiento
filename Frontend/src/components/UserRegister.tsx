

export default function UserRegister() {
  return (
    <div>
        <h1 className="text-4xl font-extrabold text-center mb-8 text-purple-800 uppercase tracking-wide">
            Formulario para Agregar Usuario
        </h1>
        <form className="space-y-6">
            <section className="border-l-4 border-blue-400 bg-white p-6 rounded shadow-sm">
            <h2 className="text-xl font-semibold uppercase mb-4 text-blue-700">Información del Usuario</h2>
            <div className="grid grid-cols-1 gap-4">
                <input
                className="border border-blue-300 p-2 rounded focus:ring-2 focus:ring-blue-400"
                type="email"
                name="username"
                placeholder="Nombre del usuario TIENE QUE SER CORREO ELECTRONICO"
                />
                <input
                className="border border-blue-300 p-2 rounded focus:ring-2 focus:ring-blue-400"
                type="password"
                name="password"
                placeholder="contraseña del usuario"
                />
                <input
                className="border border-blue-300 p-2 rounded focus:ring-2 focus:ring-blue-400"
                type="password"
                name="password_verification"
                placeholder="Vuelva a escribir la contraseña"
                />
                <input
                className="border border-blue-300 p-2 rounded focus:ring-2 focus:ring-blue-400"
                type="text"
                name="firstname"
                placeholder="Nombre del usuario"
                />
                <input
                className="border border-blue-300 p-2 rounded focus:ring-2 focus:ring-blue-400"
                type="text"
                name="lastname"
                placeholder="Apellido del usuario"
                />
                <input
                className="border border-blue-300 p-2 rounded focus:ring-2 focus:ring-blue-400"
                type="text"
                name="country"
                placeholder="Correo electrónico del usuario"
                />
            </div>
            </section>
        </form>
    </div>
  )
}
