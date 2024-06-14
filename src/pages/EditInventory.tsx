import React from "react";
import { useTranslation } from "react-i18next";
import useFetch from "../hook/useFetch";
import { useParams } from "react-router-dom";
import EditPage from "../components/edit/editPage";
import { IinventoryTable } from "../interfaces/Itable";
import LoadingSpinner from "../components/UI/loadingSpinner/LoadingSpinner";

const url = `${process.env.REACT_APP_BackendURL}/inventory`;

function EditInventory() {
  const { t } = useTranslation();
  const params = useParams();
  let { inventoryId } = params;
  let patient;
  const { data, error, status } = useFetch<IinventoryTable>(`${url}?id=${inventoryId}`);

  if (status === "loading") {
    patient = <LoadingSpinner />;
  }

  if (error) {
   console.log(error)
  }

    const handleFormSubmit = async (formData: { [key: string]: string | number }) => {
    console.log("Form Data:", formData);
    console.log(formData)

  };


  if (status === "fetched" && data) {
        const fields = [
                          { id: "name", type: "text", value: data.data[0].name },
                          { id: "description", type: "text", value: data.data[0].description },
                          { id: "quantity", type: "number", value: data.data[0].quantity },
                          { id: "price", type: "number", value: data.data[0].price }
                       ];


    patient = <EditPage
                fields={fields}
                submitLabel="Update"
                onSubmit={handleFormSubmit} />
  }


  return (
      <section>
        <h2 className="title">{t("editInventory")}</h2>
          {patient}
      </section>

  );
}

export default EditInventory;