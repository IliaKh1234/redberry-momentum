import { useState } from "react";

const useTaskValidation = () => {
  const [errors, setErrors] = useState({});
  const [labelColors, setLabelColors] = useState({
    title: "#6C757D",
    titleMinLength: "#6C757D",
    titleMaxLength: "#6C757D",
    description: "#6C757D",
    descriptionMinLength: "#6C757D",
    descriptionMaxLength: "#6C757D",
    department: "#6C757D",
    employee: "#6C757D",
    deadLine: "#6C757D",
  });

  // Validation function for each field
  const validate = (id, value) => {
    switch (id) {
      case "taskTitle":
        if (value.length < 3) {
          setErrors((prev) => ({ ...prev, taskTitle: "Title must be at least 3 characters" }));
          setLabelColors((prevState) => ({ ...prevState, titleMinLength: "red" }));
        } else {
          setErrors((prev) => ({ ...prev, taskTitle: "" }));
          setLabelColors((prevState) => ({ ...prevState, titleMinLength: "green" }));
        }

        if (value.length > 255) {
          setErrors((prev) => ({ ...prev, taskTitle: "Title cannot exceed 255 characters" }));
          setLabelColors((prevState) => ({ ...prevState, titleMaxLength: "red" }));
        } else {
          setErrors((prev) => ({ ...prev, taskTitle: "" }));
          setLabelColors((prevState) => ({ ...prevState, titleMaxLength: "green" }));
        }
        break;

      case "taskDescription":
        if (value.length < 4) {
          setErrors((prev) => ({ ...prev, taskDescription: "Description must be at least 4 characters" }));
          setLabelColors((prevState) => ({ ...prevState, descriptionMinLength: "red" }));
        } else {
          setErrors((prev) => ({ ...prev, taskDescription: "" }));
          setLabelColors((prevState) => ({ ...prevState, descriptionMinLength: "green" }));
        }

        if (value.length > 255) {
          setErrors((prev) => ({ ...prev, taskDescription: "Description cannot exceed 255 characters" }));
          setLabelColors((prevState) => ({ ...prevState, descriptionMaxLength: "red" }));
        } else {
          setErrors((prev) => ({ ...prev, taskDescription: "" }));
          setLabelColors((prevState) => ({ ...prevState, descriptionMaxLength: "green" }));
        }
        break;

      case "chooseDepartment":
        if (!value) {
          setErrors((prev) => ({ ...prev, department: "Department is required" }));
          setLabelColors((prevState) => ({ ...prevState, department: "red" }));
        } else {
          setErrors((prev) => ({ ...prev, department: "" }));
          setLabelColors((prevState) => ({ ...prevState, department: "green" }));
        }
        break;

      case "chooseEmployeeFor":
        if (!value) {
          setErrors((prev) => ({ ...prev, employee: "Employee is required" }));
          setLabelColors((prevState) => ({ ...prevState, employee: "red" }));
        } else {
          setErrors((prev) => ({ ...prev, employee: "" }));
          setLabelColors((prevState) => ({ ...prevState, employee: "green" }));
        }
        break;

      case "deadLine":
        if (!value) {
          setErrors((prev) => ({ ...prev, deadLine: "Deadline is required" }));
          setLabelColors((prevState) => ({ ...prevState, deadLine: "red" }));
        } else {
          setErrors((prev) => ({ ...prev, deadLine: "" }));
          setLabelColors((prevState) => ({ ...prevState, deadLine: "green" }));
        }
        break;

      default:
        break;
    }
  };

  return { errors, labelColors, validate };
};

export default useTaskValidation;
