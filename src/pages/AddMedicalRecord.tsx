import React, {useContext, useState} from "react";
import { useTranslation } from "react-i18next";
import AddPage from "../components/add/addPage";
import { useNavigate } from "react-router-dom";
import LoginContext from "../store/loginContext";

const patients_url = `${process.env.REACT_APP_BackendURL}/patients`;
const medical_records_url = `${process.env.REACT_APP_BackendURL}/medical_records`;

function AddMedicalRecord() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { token } = useContext(LoginContext);

  const fields = [
    { id: "diagnosis", type: "text", placeholder: "diagnosis ..." },
  ];

  const dropdownField = {
    id: "searchableDropdown",
    placeholder: "Search for patient who this medical record belongs",
    queryUrl: patients_url,
    labelKey: "firstName",
    queryParams: { additionalParam: "value" },
  };

  const handleFormSubmit = async (formData: { [key: string]: string | number }) => {
    try {
      const response = await fetch(`${medical_records_url}/${formData.searchableDropdown}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
                      Authorization: `Bearer ${token}`,

        },
        body: JSON.stringify({ notes: formData.diagnosis }),
      });

      if (!response.ok) {
        throw new Error("Failed to add medical record");
      }

      navigate("/records");
    } catch (error) {
      console.error("Error adding medical record:", error);
      // Handle error state or feedback to user
    }
  };

  return (
    <section>
      <h2 className="title">{t("addMedicalRecord")}</h2>
      <AddPage
        fields={fields}
        submitLabel="upload"
        onSubmit={handleFormSubmit}
        hasDropdown={true}
        selectLabel="Select patient"
        dropdownField={dropdownField}
      />
    </section>
  );
}

export default AddMedicalRecord;
