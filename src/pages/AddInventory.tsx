import React, {useContext} from "react";
import { useTranslation } from "react-i18next";
import AddPage from "../components/add/addPage";
import {useNavigate} from "react-router-dom";
import LoginContext from "../store/loginContext";

const inventory_url = `${process.env.REACT_APP_BackendURL}/inventory`;

function AddInventory() {
  const { t } = useTranslation();
  const { token } = useContext(LoginContext);

  const navigate = useNavigate();

  const fields = [
  { id: "name", type: "text", placeholder: "Name" },
  { id: "description", type: "text", placeholder: "Description" },
  { id: "quantity", type: "number", placeholder: "Quantity" },
  { id: "price", type: "number", placeholder: "Price" }
  ];

  const handleFormSubmit = async (formData: { [key: string]: string | number }) => {
    console.log("Form Data:", formData);

    console.log(formData)
  try {
      const response = await fetch(`${inventory_url}`, {
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

      navigate("/inventory");
    } catch (error) {
      console.error("Error adding patient", error);
      // Handle error state or feedback to user
    }

  };

  return (
    <section>
      <h2 className="title">{t("addInventory")}</h2>
       <AddPage
          fields={fields}
          submitLabel="upload"
          onSubmit={handleFormSubmit}
        />
    </section>
  );
}

export default AddInventory;
