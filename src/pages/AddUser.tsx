import React, {useContext} from "react";
import { useTranslation } from "react-i18next";
import AddPage from "../components/add/addPage";
import {useNavigate} from "react-router-dom";
import LoginContext from "../store/loginContext";

const user_url = `${process.env.REACT_APP_BackendURL}/management/users`;



   const fields = [
                  { id: "name", type: "text", placeholder: "Name" },
                  { id: "email", type: "email", placeholder: "Email" },
                  { id: "phone_number", type: "phone", placeholder: "Phone number" },
                  ];

    const roles = [
                  { id: "ADMIN", role: "Admin"},
                  { id: "PHARMACIST", role: "Pharmacist"},
                  { id: "DOCTOR", role: "Doctor"},
                  { id: "NURSE", role: "Nurse"},
                  { id: "CASHIER", role: "Cashier"},
                  { id: "LABTECH", role: "Lab Technician"},
    ];


  const dropdownField = {
    id: "searchableDropdown",
    placeholder: "Search for role",
    labelKey: "role",
    list: roles,
  };

function AddUser() {
  const { t } = useTranslation();
      const { token } = useContext(LoginContext);

   const navigate = useNavigate();

  const handleFormSubmit = async (formData: { [key: string]: string | number }) => {
    console.log("Form Data:", formData);

    console.log(formData)


try {
      const response = await fetch(`${user_url}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,

        },
        body: JSON.stringify(
            {
                email: formData.email,
                name: formData.name,
                phone_number: formData.phone_number,
                roles: [formData.searchableDropdown]
            }
        ),
      });

      if (!response.ok) {
        throw new Error("Failed to add user");
      }

      navigate("/team_management");
    } catch (error) {
      console.error("Error adding user", error);
      // Handle error state or feedback to user
    }

  };



  return (
    <section>
      <h2 className="title">{t("addUser")}</h2>
       <AddPage
          fields={fields}
          submitLabel="Create User"
          onSubmit={handleFormSubmit}
          hasDropdown={true}
          selectLabel="Role"
          dropdownField={dropdownField}
        />
    </section>
  );
}

export default AddUser;
