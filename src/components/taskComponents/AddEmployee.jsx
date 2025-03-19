import { useState, useRef, useEffect } from "react";
import useEmpValidation from "../../hooks/useEmpValidation";
import { Check, Trash2, ImagePlus } from "lucide-react";

export default function AddEmployee({ onClose }) {
  const { errors, labelColors, validate } = useEmpValidation();
  const modalRef = useRef(null);
  const [departments, setDepartments] = useState([]);
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    lastName: "",
    avatar: null,
    department: "",
  });

  const avatarInputRef = useRef(null); 

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    validate(name, value);
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    const file = files[0];
    setFormData((prevData) => ({
      ...prevData,
      [name]: file,
    }));
    setAvatarPreview(URL.createObjectURL(file));
    validate(name, files[0]);
  };

  const handleDeleteAvatar = (e) => {
    e.preventDefault(); 
    setFormData((prevData) => ({
      ...prevData,
      avatar: null,
    }));
    setAvatarPreview(null);

    avatarInputRef.current.value = null;
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  useEffect(() => {
    fetch("https://momentum.redberryinternship.ge/api/departments")
      .then((res) => res.json())
      .then((data) => setDepartments(data));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
  
    const formDataToSend = new FormData();
    formDataToSend.append("name", formData.name);
    formDataToSend.append("surname", formData.lastName);
    formDataToSend.append("avatar", formData.avatar); 
    formDataToSend.append("department_id", formData.department);
  
    fetch("https://momentum.redberryinternship.ge/api/employees", {
      method: "POST",
      body: formDataToSend,
      headers: {
        "Authorization": `Bearer 9e685023-d697-49c2-9442-4c707290d2bf`, 
      },
    })
      .then((response) => {
        return response.text(); 

      })
      .then((data) => {
        try {
          const parsedData = JSON.parse(data); 
          console.log("Parsed JSON data:", parsedData);
          onClose()
        } catch (error) {
          console.error("Error parsing response:", error);
        }
      })
      .catch((error) => {
        console.error("Error creating employee:", error);
        alert("გთხოვთ შეავსოთ ფორმა")
      });
  
  };
  

  return (
    <div className="create-employee-parent" ref={modalRef}>
      <h1>თანამშრომლის დამატება</h1>
      <form onSubmit={handleSubmit}>
        <div style={{ display: "flex" }}>
          <div>
            <label htmlFor="name">სახელი*</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
            <label
              htmlFor="name"
              style={{ color: labelColors.nameMinLength }}
            >
              <p>
                <span className="checkIcon">
                  <Check />
                </span>{" "}
                მინიმუმ 2 სიმბოლო
              </p>
            </label>
            <label
              htmlFor="name"
              style={{ color: labelColors.nameMaxLength }}
            >
              <p>
                <span className="checkIcon">
                  <Check />
                </span>{" "}
                მაქსიმუმ 255 სიმბოლო
              </p>
            </label>
          </div>
          <div>
            <label htmlFor="lastName">გვარი*</label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
            />
            <label
              htmlFor="lastName"
              style={{ color: labelColors.lastNameMinLength }}
            >
              <p>
                <span className="checkIcon">
                  <Check />
                </span>{" "}
                მინიმუმ 2 სიმბოლო
              </p>
            </label>

            <label
              htmlFor="lastName"
              style={{ color: labelColors.lastNameMaxLength }}
            >
              <p style={{ fontSize: "14px" }}>
                <span className="checkIcon">
                  <Check />
                </span>{" "}
                მაქსიმუმ 255 სიმბოლო
              </p>
            </label>
          </div>
        </div>

        <div style={{marginBottom: '-40px', marginTop:'50px'}}>
        <label htmlFor="avatar">ავატარი</label>
        </div>
        <div className="add-avatar-parent">
          <label className="labelAvatar" htmlFor="avatar">
            {avatarPreview ? (
              <>
                <img
                  src={avatarPreview}
                  alt="Avatar preview"
                  className="avatar-preview"
                  id="avatarPre"
                />

                  
                  <span 
                  id="deleteAvatar"
                  onClick={handleDeleteAvatar}><Trash2 /></span>
              </>
            ) : (
              <div className="upload-icon">
                <ImagePlus size={24} />
                <p>ათვირთე ფოტო</p>
              </div>
            )}
          </label>
          <input
            type="file"
            name="avatar"
            id="avatar"
            accept="image/*"
            onChange={handleFileChange}
            style={{ display: "none" }} 
            ref={avatarInputRef} 
          />
          {errors.avatar && <span className="error">{errors.avatar}</span>}
        </div>

        <div className="departmentChooseParent">
          <label style={{marginBottom:"10px"}} htmlFor="department">დეპარტამენტი*</label>
          <select
            name="department"
            id="department"
            value={formData.department}
            onChange={handleChange}
          >
            <option value="">აირჩიეთ დეპარტამენტი</option>
            {departments.map((dep) => (
              <option key={dep.id} value={dep.id}>
                {dep.name}
              </option>
            ))}
          </select>
          {errors.department && <span className="error">{errors.department}</span>}
        </div>
        <div className="addEmp-btns">
         
          <button
            id="closeEmp"
            type="button"
            onClick={() => onClose()}
          >
            გაუქმება
          </button>
          <button onClick={() => console.log(formData)} id="addEmp" type="submit">დაამატე თანამშრომელი</button>
        </div>
      </form>
    </div>
  );
}
