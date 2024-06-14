import React from "react";
import { useTranslation } from "react-i18next";
import useFetch from "../hook/useFetch";
import { useParams } from "react-router-dom";
import EditPage from "../components/edit/editPage";
import { ImedicalRecordsTable } from "../interfaces/Itable";
import LoadingSpinner from "../components/UI/loadingSpinner/LoadingSpinner";

const url = "http://localhost:8082/medical_records";

function EditMedicalRecord() {
  const { t } = useTranslation();
  const params = useParams();
  let { medicalRecordId } = params;
  let patient;
  const { data, error, status } = useFetch<ImedicalRecordsTable>(`${url}?id=${medicalRecordId}`);

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
                          { id: "notes", type: "text", value: data.data[0].notes },
                       ];


    patient = <EditPage
                fields={fields}
                submitLabel="Update"
                onSubmit={handleFormSubmit} />
  }


  return (
      <section>
        <h2 className="title">{t("editMedicalRecord")}</h2>
          {patient}
      </section>

  );
}

export default EditMedicalRecord;