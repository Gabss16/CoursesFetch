import { useEffect, useState } from "react";
import { url } from "../../utils/apiUrl"; // URL de la API de cursos
import { toast } from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import useFetchCourse from "../../hooks/cursos/useFetchCourse"; // Cambiar al nuevo hook

const useDataCourse = (methods) => {
  const [dataCourse, setDataCourse] = useState([]);
  const { getCourseById, getCourses } = useFetchCourse();
  const { id } = useParams();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = methods;

  const navigate = useNavigate();

  // Guardar curso (POST)
  const saveCourseForm = async (dataForm) => {
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataForm),
      });
      if (!response.ok) {
        toast.error("No se pudo agregar el curso");
        throw new Error("Failed to add course");
      }
      toast.success("Curso guardado exitosamente");
      navigate("/home");
    } catch (error) {
      console.log("Error al guardar curso:", error);
    } finally {
      reset();
      getCourses(); // Refrescar lista de cursos
    }
  };

  // Editar curso (PUT)
  const editCourse = async (dataForm) => {
    try {
      const response = await fetch(`${url}/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataForm),
      });
      if (!response.ok) {
        toast.error("No se pudo actualizar el curso");
        throw new Error("Failed to update course");
      }
      toast.success("Curso actualizado exitosamente");
      navigate("/home");
    } catch (error) {
      console.error("Error al actualizar curso:", error);
    } finally {
      reset();
      getCourses();
    }
  };

  // Decidir si guardar o editar curso
  const handleCourseAction = (dataForm) => {
    if (id) {
      editCourse(dataForm);
    } else {
      saveCourseForm(dataForm);
    }
  };

  // Redirigir a edición
  const handleUpdateCourse = (id) => {
    navigate(`/courses/${id}`);
  };

  // Cargar curso por id
  const loadCourse = async () => {
    if (id) {
      const course = await getCourseById(id);
      if (course) {
        reset({
          curso: course?.curso,
          tematica: course?.tematica,
          instructor: course?.instructor,
          descripcion: course?.descripcion,
        });
      }
    }
  };

  useEffect(() => {
    loadCourse();
  }, [id]);

  return {
    dataCourse,
    setDataCourse,
    register,
    handleSubmit: handleSubmit(handleCourseAction),
    errors,
    getCourseById,
    handleUpdateCourse,
    loadCourse,
    reset,
  };
};

export default useDataCourse;
