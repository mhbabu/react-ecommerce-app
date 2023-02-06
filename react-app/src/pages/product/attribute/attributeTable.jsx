import React,{ useState, useEffect } from "react";
import DataTable from 'react-data-table-component';
import { deleteAttribute, getAttributes} from "../../../services/attrubuteService";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";


export default function AttributeTable() {

  const [attributes, setAttributes] = useState([]);

  const fetchData = async () => {
    const { data } = await getAttributes();
    setAttributes(data);
  };

  useEffect(() => { fetchData(); }, []);

  const handleDeleteAttribute = async (attribute) => {
    const originalAttributes = attributes;
    const filteredAttributes = originalAttributes.filter(
      (a) => a._id !== attribute._id
    );
    setAttributes(filteredAttributes);

    try {
      await deleteAttribute(attribute._id);
      toast("Attribute deleted successfully.");
    } catch (ex) {
      if (ex.response && ex.response.status === 404) console.log("ex");
      toast.error("This attribute has already been deleted.");
      setAttributes(originalAttributes);
    }
  };

  const columns = [
    {
      name: "Name",
      selector: (row) => row?.name,
      sortable: true,
      wrap: true,
      field: "name",
    },
    {
      name: "Status",
      selector: (row) => row?.status,
      sortable: true,
      field: "staus",
      format: (row) => (<span className={`badge badge-${row?.status === "Active" ? `primary` : `danger`} `}>{row?.status}</span>)
    },
    {
      name: "Action",
      selector: (row) => row,
      format: (row) => (
        <>
        <button className="btn btn-primary btn-sm mr-1"> <i className="fa fa-edit"></i> Edit</button>
        <button className="btn btn-danger btn-sm" onClick={()=>handleDeleteAttribute(row)}> <i className="fa fa-trash"></i> Delete</button>
        </>
      ),
    },
  ];


  return (
    <>
    {/* <DataTable columns={columns} data={attributes} /> */}
    </>
  );
}



