import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Joi from "joi-browser";
import Input from "../../../components/common/input";
import Select from "../../../components/common/select";
import { saveAttribute } from "../../../services/attrubuteService";
import { handleSubmit, handleOnChangeData } from "../../../utils/form";

export default function CreateAttribute() {
  const [formData, setFormData] = useState({ name: "", status: "" });
  const [formErrors, setFormErrors] = useState({});
  let navigate = useNavigate();

  const statusData = [
    { _id: "Active", name: "Active" },
    { _id: "Inactive", name: "Inactive" },
  ];

  const dataSchema = {
    name: Joi.string()
      .trim()
      .min(3)
      .max(255)
      .required()
      .label("Attribute Name"),
    status: Joi.string().required().label("Status"),
  };

  const handleOnChange = ({ currentTarget: input }) => {
    const { data, errors } = handleOnChangeData(
      input,
      dataSchema,
      formData,
      formErrors
    );
    setFormData(data);
    setFormErrors(errors);
  };

  const doSubmit = async (e) => {

    const errors = handleSubmit(e, formData, dataSchema);
    setFormErrors(errors || {});
    if (errors) return;

    await saveAttribute(formData);
    setFormData({ name: "", status: "" });
    toast("Attribute created successfully.");
    navigate("/product/attributes");
  };

  return (
    <>
      <div className='content-wrapper'>
        <div className='content-header'></div>
        <div className='card'>
          <div className='card-header'>
            <div className='row'>
              <div className='col-sm-5'>
                <h6>
                  <i className='fa fa-plus' /> Create Attribute
                </h6>
              </div>
            </div>
          </div>
          <form id='taskForm' onSubmit={doSubmit}>
            <div className='card-body'>
              <div className='row'>
                <div className='col-md-6'>
                  <Input
                    type='text'
                    value={formData["name"]}
                    name='name'
                    onChange={handleOnChange}
                    label={"Attribute Name"}
                    errors={formErrors["name"]}
                    placeholder='Attribute name'
                  />
                </div>
                <div className='col-md-6'>
                  <Select
                    value={formData["status"]}
                    name='status'
                    onChange={handleOnChange}
                    label='Status'
                    options={statusData}
                    placeholder='Select Status'
                    errors={formErrors["status"]}
                  />
                </div>
              </div>
            </div>
            <div className='card-footer'>
              <Link to='/product/attributes' class='btn btn-warning'>
                <i class='fa fa-backward'></i> Back
              </Link>
              <button type='submit' class='btn float-right btn-primary'>
                <i class='fa fa-save'></i> Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
