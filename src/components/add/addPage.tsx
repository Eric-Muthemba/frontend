import React, { useState, useEffect } from "react";
import Card from "../UI/card/Card";
import { useTranslation } from "react-i18next";
import classes from "./addPage.module.scss";
import Button from "../UI/button/Button";
import Input from "../UI/input/Input";
import useFetch from "../../hook/useFetch";
import Dropdown from "../UI/dropdown/Dropdown";

interface AddPageProps {
  fields: Array<{ id: string; type: string; placeholder?: string }>;
  submitLabel: string;
  onSubmit: (formData: { [key: string]: string | number }) => void;
  hasDropdown?: boolean;
  selectLabel?: string;
  dropdownField?: {
    id: string;
    placeholder: string;
    queryUrl?: string;
    queryParams?: any;
    labelKey: string;
    list?: Array<any>;
  };
}

const AddPage: React.FC<AddPageProps> = ({
  fields,
  submitLabel,
  onSubmit,
  hasDropdown = false,
  selectLabel = "",
  dropdownField,
}) => {
  const { t } = useTranslation();
  const [selectedOption, setSelectedOption] = useState<{
    label: string;
    value: string;
  } | null>(null);

  const [dropdownOptions, setDropdownOptions] = useState<Array<{ label: string; value: string }>>([]);

  const { data, error, status } = useFetch<{
    success: boolean;
    message: string;
    data: Array<any>;
  }>(
    hasDropdown && dropdownField?.queryUrl ? dropdownField.queryUrl : undefined,
    {
      method: "GET",
    },
    [] // Dependency array to re-fetch when needed
  );

  useEffect(() => {
    if (dropdownField?.list) {
      const options = dropdownField.list.map(item => ({
        value: item.id,
        label: `${item[dropdownField.labelKey]}`
      }));
      setDropdownOptions(options);
    } else if (data && status === "fetched") {
      const options = data.data.map(item => ({
        value: item.id,
        label: `${item[dropdownField?.labelKey || "id"]}`
      }));
      setDropdownOptions(options);
    }
  }, [data, status, dropdownField]);

  const handleDropdownChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = e.target.value;
    const selectedOption = dropdownOptions.find(option => option.value === selectedValue);
    setSelectedOption(selectedOption || null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData: { [key: string]: string | number } = {};
    fields.forEach((field) => {
      const element = (e.target as HTMLFormElement).elements.namedItem(field.id) as HTMLInputElement;
      if (element) {
        formData[field.id] = field.type === "number" ? Number(element.value) : element.value;
      }
    });
    if (hasDropdown && selectedOption && dropdownField) {
      formData[dropdownField.id] = selectedOption.value;
    }
    onSubmit(formData);
  };

  return (
    <div className={classes.edit__container}>
      <div className={classes.edit__right}>
        <Card>
          <div className={classes.product__edit}>
            <form onSubmit={handleSubmit}>
              {hasDropdown && dropdownField && (
                <Dropdown
                  id={dropdownField.id}
                  name={selectLabel}
                  dropdownData={dropdownOptions}
                  onChange={handleDropdownChange}
                />
              )}

              {fields.map((field) => (
                <Input
                  key={field.id}
                  id={field.id}
                  type={field.type}
                  placeholder={field.placeholder}
                />
              ))}

              <div className={classes.btn__wrapper}>
                <Button type="submit">{t(submitLabel)}</Button>
              </div>
            </form>
            {error && <div className={classes.error}>{error.message}</div>}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default AddPage;
