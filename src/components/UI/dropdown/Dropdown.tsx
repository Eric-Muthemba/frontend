import React from "react";
import { useTranslation } from "react-i18next";
import classes from "./Dropdown.module.scss";

type TOptionItem = {
  label: string;
  value: string;
};

interface Props {
  id: string;
  name: string;
  dropdownData: TOptionItem[];
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const Dropdown: React.FC<Props> = (props) => {
  const { t } = useTranslation();

  return (
    <div className={`subTitle ${classes.form__control}`}>
      <select
        name={props.id}
        className={classes.select}
        id={props.id}
        onChange={props.onChange}

      >
        <option value="">{t(props.name)}</option> {/* Default option with no value */}
        {props.dropdownData.map((item, index) => (
          <option key={`${item.label}-${index}`} value={item.value}>
            {t(item.label)}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Dropdown;
