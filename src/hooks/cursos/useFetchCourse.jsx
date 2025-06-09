import { useEffect, useState } from "react";
import { url } from "../../utils/apiUrl";
import { toast } from "react-hot-toast";

// Hook para manejar la lógica de obtención de cursos

const useFetchCourse = () => {
  // State para almacenar los cursos
  const [dataCourse, setDataCourse] = useState([]);

  // Obtener todos los cursos desde la API
  const getCourses = async () => {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        toast.error("No se pudieron obtener los cursos");
        throw new Error("Failed to fetch courses");
      }
      const data = await response.json();
      setDataCourse(data);
    } catch (error) {
      console.error("Error al obtener cursos:", error);
      toast.error("Error al obtener cursos");
    }
  };

  // Obtener un curso por su ID
  const getCourseById = async (id) => {
    try {
      const response = await fetch(`${url}/${id}`);
      if (!response.ok) {
        console.log("No se pudo obtener el curso");
        throw new Error("Failed to fetch course");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error al obtener curso:", error);
      return null;
    }
  };

  // useEffect para cargar cursos al montar el componente
  useEffect(() => {
    getCourses();
  }, []);

  return {
    dataCourse,
    setDataCourse,
    getCourses,
    getCourseById,
  };
};

export default useFetchCourse;
