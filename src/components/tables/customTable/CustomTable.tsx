import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Itable as Props, complex } from "../../../interfaces/Itable";
import Card from "../../UI/card/Card";
import Badge from "../../UI/badge/Badge";
import Modal from "../../UI/modal/Modal";
import { useTranslation } from "react-i18next";
import { Icon } from "@iconify/react";
import classes from "./CustomTable.module.scss";

const CustomTable: React.FC<Props> = (props) => {
  const [showModal, setShowModal] = useState(false);
  function showModalHandler() {
    setShowModal((prev) => !prev);
  }
  function tableBody(item: any, index: number, keys:string[], path?: string) {
      console.log(item);


      return (
        <tr key={index}>
          {keys.map(key => {
                if (key === 'Actions') {
                 return<td  key="actions"  className={classes.actions}>
                    <Icon icon="charm:menu-kebab"/>
                    <div className={classes.actions__box}>
                      <div
                          className={classes.actions__delete}
                          onClick={showModalHandler}
                      >
                        <Icon icon="fluent:delete-24-regular" width="24"/>
                      </div>
                      <div className={classes.actions__edit}>
                        <Link to={`/${path}/${item.id}`}>
                          <Icon icon="fluent:edit-16-regular" width="24"/>
                        </Link>
                      </div>
                    </div>
                  </td>

                } else {
                 return <td key={key}>{item[key]}</td>
                }
              }
          )}
        </tr>
      );
  }

  const initDataShow = () => {
    return props.limit && props.bodyData
        ? props.bodyData.slice(0, Number(props.limit))
        : props.bodyData;
  };

  const [dataShow, setDataShow] = useState(initDataShow);

  let pages = 1;

  let range: number[] = [];

  if (props.limit !== undefined) {
    let page = Math.floor(props.bodyData.length / Number(props.limit));
    pages = props.bodyData.length % Number(props.limit) === 0 ? page : page + 1;
    range = [...Array(pages).keys()];
  }

  const [currPage, setCurrPage] = useState(0);

  const selectPage = (page: number) => {
    const start = Number(props.limit) * page;
    const end = start + Number(props.limit);

    setDataShow(props.bodyData?.slice(start, end));

    setCurrPage(page);
  };

  const { t } = useTranslation();

  return (
    <>
      {/* modal for delete customer and product case*/}
      {showModal ? (
        <Modal
          title={t("deleteCustomer")}
          message={`${t("modalMessage")}`}
          onConfirm={showModalHandler}
        />
      ) : null}

      <div className={classes.container}>
        <Card>
          <div className={classes.wrapper}>
            <div className={classes.table__wrapper}>
              <table
                className={props.limit ? classes.largeTable : classes.table}
              >
                {props.headData ? (
                  <thead>
                    <tr>
                      {props.headData.map((item, index) => (
                        <th key={index}>{t(item)}</th>
                      ))}
                    </tr>
                  </thead>
                ) : null}
                <tbody>
                  {dataShow.map((item, index, keys) => tableBody(item, index, props.headData,props.path))}
                </tbody>
              </table>
            </div>

            {pages > 1 ? (
              <div className={classes.table__pagination}>
                {range.map((item, index) => (
                  <div
                    key={index}
                    className={`${classes.table__pagination_item} ${
                      currPage === index ? classes.active : ""
                    }`}
                    onClick={() => selectPage(index)}
                  >
                    {item + 1}
                  </div>
                ))}
              </div>
            ) : null}
          </div>
        </Card>
      </div>
    </>
  );
};

export default CustomTable;
