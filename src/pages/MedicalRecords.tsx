import React from "react";
import { useTranslation } from "react-i18next";
import useFetch from "../hook/useFetch";
import CustomTable from "../components/tables/customTable/CustomTable";
import { ImedicalRecordsTable } from "../interfaces/Itable";
import { medicalRecordsHeader } from "../constants/tables";
import LoadingSpinner from "../components/UI/loadingSpinner/LoadingSpinner";
import {useNavigate} from "react-router-dom";
import {Icon} from "@iconify/react";
const url = "http://localhost:8082/medical_records";
function MedicalRecords() {
  const { t } = useTranslation();
  const { data, error, status } = useFetch<ImedicalRecordsTable>(url);
  let medicalRecordsTable;
  const navigate = useNavigate();

   const handleAddMedicalRecord = () => {
    navigate("/add-medical-record"); // Replace with your actual path
  };

  if (status === "loading") {
    medicalRecordsTable = <LoadingSpinner />;
  }

  if (error) {
   console.log(error)
  }

  if (status === "fetched" && data) {

    medicalRecordsTable = (
      <CustomTable path="records" limit={10} headData={medicalRecordsHeader} bodyData={data.data} />
    );
  }

  return (
      <section>
        <div className="header">
          <h2 className="title">{t("medicalRecords")}</h2>
          <button className="add-button"
                  onClick={handleAddMedicalRecord}
          >
            <Icon icon="fluent:person-add-24-filled"/>
            <span className="button-text">{t("add_medical_record")}</span>
          </button>
        </div>
        {medicalRecordsTable}
      </section>
  );
}

export default MedicalRecords;
