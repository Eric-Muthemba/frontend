import React from "react";
import { useTranslation } from "react-i18next";
import useFetch from "../hook/useFetch";
import CustomTable from "../components/tables/customTable/CustomTable";
import { IprescriptionsTable } from "../interfaces/Itable";
import { prescriptionsHeader } from "../constants/tables";
import LoadingSpinner from "../components/UI/loadingSpinner/LoadingSpinner";
const url = "http://localhost:8082/prescriptions";
function Prescriptions() {
  const { t } = useTranslation();
  const { data, error, status } = useFetch<IprescriptionsTable>(url);
  let prescriptionsTable;

  if (status === "loading") {
    prescriptionsTable = <LoadingSpinner />;
  }

  if (error) {
   console.log(error)
  }

  if (status === "fetched" && data) {

    prescriptionsTable = (
      <CustomTable limit={10} headData={prescriptionsHeader} bodyData={data.data} />
    );
  }

  return (
    <section>
      <h2 className="title">{t("prescriptions")}</h2>
      {prescriptionsTable}
    </section>
  );
}

export default Prescriptions;
