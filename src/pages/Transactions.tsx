import React from "react";
import { useTranslation } from "react-i18next";
import useFetch from "../hook/useFetch";
import CustomTable from "../components/tables/customTable/CustomTable";
import { ItransactionsTable } from "../interfaces/Itable";
import { transactionsHeader } from "../constants/tables";
import LoadingSpinner from "../components/UI/loadingSpinner/LoadingSpinner";
const url = `${process.env.REACT_APP_BackendURL}/transactions`;
function Transactions() {
  const { t } = useTranslation();
  const { data, error, status } = useFetch<ItransactionsTable>(url);
  let transactionsTable;

  if (status === "loading") {
    transactionsTable = <LoadingSpinner />;
  }

  if (error) {
   console.log(error)
  }

  if (status === "fetched" && data) {

    transactionsTable = (
      <CustomTable limit={10} headData={transactionsHeader} bodyData={data.data} />
    );
  }

  return (
    <section>
      <h2 className="title">{t("transactions")}</h2>
      {transactionsTable}
    </section>
  );
}

export default Transactions;
