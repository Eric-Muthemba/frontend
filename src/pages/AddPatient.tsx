import React, {useContext} from "react";
import { useTranslation } from "react-i18next";
import AddPage from "../components/add/addPage";
import {useNavigate} from "react-router-dom";
import LoginContext from "../store/loginContext";
const patients_url = "http://localhost:8082/patients";


function AddPatient() {
  const { t } = useTranslation();
      const { token } = useContext(LoginContext);

   const navigate = useNavigate();


  const fields = [
  { id: "firstName", type: "text", placeholder: "First Name" },
  { id: "lastName", type: "text", placeholder: "Last Name" },
  { id: "DOB", type: "text", placeholder: "Date of Birth" },
  { id: "gender", type: "text", placeholder: "Gender" },
  { id: "phoneNumber", type: "text", placeholder: "Phone Number" }
];

  const handleFormSubmit = async (formData: { [key: string]: string | number }) => {
    console.log("Form Data:", formData);

    console.log(formData)
try {
      const response = await fetch(`${patients_url}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
                      Authorization: `Bearer ${token}`,

        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to add patient");
      }

      navigate("/patients");
    } catch (error) {
      console.error("Error adding patient", error);
      // Handle error state or feedback to user
    }

  };




  return (
    <section>
      <h2 className="title">{t("addPatient")}</h2>
       <AddPage
          fields={fields}
          submitLabel="upload"
          onSubmit={handleFormSubmit}
        />
    </section>
  );
}

export default AddPatient;
