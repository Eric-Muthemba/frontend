import React from "react";
import { useTranslation } from "react-i18next";
import useFetch from "../hook/useFetch";
import CustomTable from "../components/tables/customTable/CustomTable";
import { IinventoryTable } from "../interfaces/Itable";
import { inventoryHeader } from "../constants/tables";
import LoadingSpinner from "../components/UI/loadingSpinner/LoadingSpinner";
import {Icon} from "@iconify/react";
import {useNavigate} from "react-router-dom";
const url = `${process.env.REACT_APP_BackendURL}/inventory`;
function Inventory() {
  const { t } = useTranslation();
  const { data, error, status } = useFetch<IinventoryTable>(url);
  let inventoryTable;
  const navigate = useNavigate();

   const handleAddInventory = () => {
    navigate("/add_inventory"); // Replace with your actual path
  };

  if (status === "loading") {
    inventoryTable = <LoadingSpinner />;
  }

  if (error) {
   console.log(error)
  }

  if (status === "fetched" && data) {

    inventoryTable = (
      <CustomTable path="inventory" limit={10} headData={inventoryHeader} bodyData={data.data} />
    );
  }

  return (
      <section>
        <div className="header">
          <h2 className="title">{t("inventory")}</h2>
          <button className="add-button"
                  onClick={handleAddInventory}
          >
            <Icon icon="fluent:person-add-24-filled"/>
            <span className="button-text">{t("add_inventory")}</span>
          </button>
        </div>
        {inventoryTable}
      </section>
  );
}

export default Inventory;
