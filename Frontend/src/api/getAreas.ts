export const getAreas = async (setAreas: Function, setCargando: Function) => {
    setCargando(true)
    try {
      const response = await fetch("http://localhost:8080/areas", {
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const data = await response.json()
      setAreas(data.responseEntity.body)
    } catch (error) {
      console.error("Error al obtener los datos", error)
    } finally {
      setCargando(false)
    }
  }