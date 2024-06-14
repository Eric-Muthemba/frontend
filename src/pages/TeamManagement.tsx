import React from "react";
import { useTranslation } from "react-i18next";
import useFetch from "../hook/useFetch";
import CustomTable from "../components/tables/customTable/CustomTable";
import { IusersTable } from "../interfaces/Itable";
import { usersHeader } from "../constants/tables";
import LoadingSpinner from "../components/UI/loadingSpinner/LoadingSpinner";
import { Icon } from '@iconify/react';
import {useNavigate} from "react-router-dom";

const url = `${process.env.REACT_APP_BackendURL}/management/users`;

function TeamManagement() {
  const { t } = useTranslation();
  const { data, error, status } = useFetch<IusersTable>(url);
  let TeamManagementTable;
  const navigate = useNavigate();

   const handleAddUser = () => {
    navigate("/add-user"); // Replace with your actual path
  };


  if (status === "loading") {
    TeamManagementTable = <LoadingSpinner />;
  }

  if (error) {
   console.log(error)
  }

  if (status === "fetched" && data) {

    TeamManagementTable = (
      <CustomTable limit={10} headData={usersHeader} bodyData={data.data} />
    );
  }

  return (
    <section>
        <div className="header">
          <h2 className="title">{t("users")}</h2>
          <button className="add-button"
          onClick={handleAddUser}
          >
            <Icon icon="fluent:person-add-24-filled"/>
            <span className="button-text">{t("add_user")}</span>
          </button>
        </div>
      {TeamManagementTable}
    </section>
  );
}

export default TeamManagement;
