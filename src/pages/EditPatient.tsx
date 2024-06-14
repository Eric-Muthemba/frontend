import React from "react";
import { useTranslation } from "react-i18next";
import useFetch from "../hook/useFetch";
import { useParams } from "react-router-dom";
import EditPage from "../components/edit/editPage";
import { IpatientsTable } from "../interfaces/Itable";
import { patientsHeader } from "../constants/tables";
import LoadingSpinner from "../components/UI/loadingSpinner/LoadingSpinner";
import CustomTable from "../components/tables/customTable/CustomTable";

const url = "http://localhost:8082/patients";

function EditPatient() {
  const { t } = useTranslation();
  const params = useParams();
  let { patientId } = params;
  let patient;
  const { data, error, status } = useFetch<IpatientsTable>(`${url}?id=${patientId}`);

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
                          { id: "firstName", type: "text", value: data.data[0].firstName },
                          { id: "lastName", type: "text", value: data.data[0].lastName },
                          { id: "DOB", type: "text", value: data.data[0].dob },
                          { id: "gender", type: "text", value: data.data[0].gender},
                          { id: "phoneNumber", type: "text", value: data.data[0].phone }
                       ];

    patient = <EditPage
                fields={fields}
                submitLabel="Update"
                onSubmit={handleFormSubmit} />
  }


  return (
      <section>
        <h2 className="title">{t("editPatient")}</h2>
          {patient}
      </section>

  );
}

export default EditPatient;