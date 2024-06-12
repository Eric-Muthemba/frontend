import React from "react";
import { useTranslation } from "react-i18next";
import AddPage from "../components/add/addPage";
import {useNavigate} from "react-router-dom";

function AddPrescription() {
  const { t } = useTranslation();
   const navigate = useNavigate();



  const fields = [
  { id: "name", type: "text", placeholder: "Name" },
  { id: "description", type: "text", placeholder: "Description" },
  { id: "quantity", type: "number", placeholder: "Quantity" },
  { id: "price", type: "number", placeholder: "Price" }
  ];

  const handleFormSubmit = (formData: { [key: string]: string | number }) => {
    console.log("Form Data:", formData);
    // handle form submission logic here
    navigate("/prescriptions");
  };




  return (
    <section>
      <h2 className="title">{t("addPrescription")}</h2>
       <AddPage
          fields={fields}
          submitLabel="upload"
          onSubmit={handleFormSubmit}
        />
    </section>
  );
}

export default AddPrescription;
