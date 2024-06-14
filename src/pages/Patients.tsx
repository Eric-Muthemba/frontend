import React from "react";
import { useTranslation } from "react-i18next";
import useFetch from "../hook/useFetch";
import CustomTable from "../components/tables/customTable/CustomTable";
import { IpatientsTable } from "../interfaces/Itable";
import { patientsHeader } from "../constants/tables";
import LoadingSpinner from "../components/UI/loadingSpinner/LoadingSpinner";
import { Icon } from '@iconify/react';
import {useNavigate} from "react-router-dom";

const url = "http://localhost:8082/patients";

function Patients() {
  const { t } = useTranslation();
  const { data, error, status } = useFetch<IpatientsTable>(url);
  let patientsTable;
  const navigate = useNavigate();

   const handleAddPatient = () => {
    navigate("/add-patient"); // Replace with your actual path
  };


  if (status === "loading") {
    patientsTable = <LoadingSpinner />;
  }

  if (error) {
   console.log(error)
  }

  if (status === "fetched" && data) {

    patientsTable = (
      <CustomTable path="patients" limit={10} headData={patientsHeader} bodyData={data.data} />
    );
  }

  return (
    <section>
        <div className="header">
          <h2 className="title">{t("patients")}</h2>
          <button className="add-button"
onClick={handleAddPatient}
          >
            <Icon icon="fluent:person-add-24-filled"/>
            <span className="button-text">{t("add_patient")}</span>
          </button>
        </div>
      {patientsTable}
    </section>
  );
}

export default Patients;
