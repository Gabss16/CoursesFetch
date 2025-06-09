import React, { useState } from "react";
import { url } from "../../utils/apiUrl";
import { toast } from "react-hot-toast";

const useCourseAction = (getCourses) => {
  const [courseToEdit, setCourseToEdit] = useState(null);

  const deleteCourse = async (id) => {
    try {
      const response = await fetch(`${url}/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Failed to delete course");
      toast.success("Curso eliminado correctamente");
    } catch (error) {
      console.error("Error al eliminar el curso:", error);
      toast.error("No se pudo eliminar el curso");
    } finally {
      getCourses();
    }
  };

  const createCourse = async (courseData) => {
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(courseData),
      });
      if (!response.ok) throw new Error("Failed to create course");
      toast.success("Curso creado correctamente");
      getCourses();
    } catch (error) {
      console.error("Error al crear el curso:", error);
      toast.error("No se pudo crear el curso");
    }
  };

  const updateCourse = async (id, courseData) => {
    try {
      const response = await fetch(`${url}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(courseData),
      });
      if (!response.ok) throw new Error("Failed to update course");
      toast.success("Curso actualizado correctamente");
      getCourses();
    } catch (error) {
      console.error("Error al actualizar el curso:", error);
      toast.error("No se pudo actualizar el curso");
    }
  };

  const handleEditCourse = (course) => {
    setCourseToEdit(course);
  };

  const clearCourseToEdit = () => setCourseToEdit(null);

  return {
    deleteCourse,
    createCourse,
    updateCourse,
    handleEditCourse,
    courseToEdit,
    clearCourseToEdit,
  };
};

export default useCourseAction;
