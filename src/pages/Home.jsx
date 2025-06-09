import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import Titulo from "../components/Titulos";
import Button from "../components/Button";
import ButtonDelete from "../components/ButtonDelete";
import InputText from "../components/InputText";
import SelectInput from "../components/SelectInput";
import { optionSelect } from "../utils/apiUrl";

import useFetchCourse from "../hooks/cursos/useFetchCourse";
import useCourseAction from "../hooks/cursos/useCourseAction";

const CoursesDashboard = () => {
  const { dataCourse, getCourses } = useFetchCourse();
  const { deleteCourse, createCourse, updateCourse } = useCourseAction(getCourses);
  const methods = useForm();
  const { register, handleSubmit, reset, formState: { errors } } = methods;

  const [selectedCourse, setSelectedCourse] = useState(null);

  useEffect(() => {
    if (selectedCourse) {
      reset({
        curso: selectedCourse.curso,
        tematica: selectedCourse.tematica,
        instructor: selectedCourse.instructor,
        descripcion: selectedCourse.descripcion
      });
    } else {
      reset({
        curso: "",
        tematica: "",
        instructor: "",
        descripcion: ""
      });
    }
  }, [selectedCourse, reset]);

  const onSubmit = (data) => {
    if (selectedCourse) {
      updateCourse(selectedCourse.id, data);
    } else {
      createCourse(data);
    }

    setSelectedCourse(null);
    reset();
  };

  return (
    <div className="flex flex-col lg:flex-row max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 gap-8">

      {/* Tabla de cursos */}
      <div className="w-full lg:w-[70%]">
        <Titulo titulo="Listado de Cursos" />
        <div className="overflow-x-auto bg-white rounded shadow">
          <table className="min-w-full text-sm text-gray-700">
            <thead className="bg-gray-100 text-left">
              <tr>
                <th className="px-4 py-2 border-b">Nombre del Curso</th>
                <th className="px-4 py-2 border-b">Temática</th>
                <th className="px-4 py-2 border-b">Instructor</th>
                <th className="px-4 py-2 border-b">Descripción</th>
                <th className="px-4 py-2 border-b">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {dataCourse.length === 0 ? (
                <tr>
                  <td colSpan={5} className="text-center py-4">
                    No hay cursos disponibles.
                  </td>
                </tr>
              ) : (
                dataCourse.map((curso) => (
                  <tr
                    key={curso.id}
                    className="border-b hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-4 py-2">{curso.curso}</td>
                    <td className="px-4 py-2">{curso.tematica}</td>
                    <td className="px-4 py-2">{curso.instructor}</td>
                    <td className="px-4 py-2">{curso.descripcion}</td>
                    <td className="px-4 py-2 flex gap-2 flex-wrap">
                      <Button
                        text="Editar"
                        onClick={() => setSelectedCourse(curso)}
                      />
                      <ButtonDelete
                        text="Eliminar"
                        onClick={() => deleteCourse(curso.id)}
                      />
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Formulario */}
      <div className="w-full lg:w-[30%] bg-white rounded shadow p-6">
        <Titulo titulo={selectedCourse ? "Editar Curso" : "Agregar Curso"} />
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 mt-4">
          <InputText
            type="text"
            name="curso"
            label="Nombre del Curso"
            placeholder="Ej: React Básico"
            register={register}
            error={errors.curso?.message}
          />

          <SelectInput
            label="Temática"
            name="tematica"
            options={optionSelect}
            register={register}
            error={errors.tematica?.message}
          />

          <InputText
            type="text"
            name="instructor"
            label="Instructor"
            placeholder="Nombre del instructor"
            register={register}
            error={errors.instructor?.message}
          />

          <InputText
            type="text"
            name="descripcion"
            label="Descripción"
            placeholder="Breve descripción del curso"
            register={register}
            error={errors.descripcion?.message}
          />

          <div className="flex gap-4">
            <Button type="submit" text={selectedCourse ? "Actualizar" : "Guardar"} />
            {selectedCourse && (
              <button
                type="button"
                onClick={() => setSelectedCourse(null)}
                className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400"
              >
                Cancelar
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default CoursesDashboard;
