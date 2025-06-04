export const getTechs = async (setTechs: Function, setCargando: Function) => {
  setCargando(true);
  const token = localStorage.getItem("token");

  try {
    const response = await fetch("http://localhost:8080/tecnicos", {
      headers: {
        "Authorization": `Bearer ${token}`,
      },
    });

    const data = await response.json();
    console.log("Datos recibidos:", data);

    setTechs(data.responseEntity.body);
  } catch (error) {
    console.error("Error al obtener los datos de los técnicos", error);
  } finally {
    setCargando(false);
  }
};
