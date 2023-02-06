import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import _ from "lodash";
import { toast } from "react-toastify";
import { paginate } from "../../../utils/paginate";
import {
  deleteAttribute,
  getAttributes,
} from "../../../services/attrubuteService";
import Pagination from './../../../components/common/pagination';
import AttributeTable from "./attributeTable";
import SearchBox from "../../../components/common/searchBox";


export default function ProductAttribute() {
  const [attributes, setAttributes] = useState([]);
  const [pageSize, setPageSize] = useState(4);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortColumn, setSortColumn] = useState({ path: "name", order: "asc" });

  const fetchData = async () => {
    const { data } = await getAttributes();
    setAttributes(data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDeleteAttribute = async (attribute) => {
    const originalAttributes = attributes;
    const filteredAttributes = originalAttributes.filter(
      (a) => a._id !== attribute._id
    );
    console.log(originalAttributes);
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

  const handleOnSort = (sortColumn) => {
    setSortColumn(sortColumn);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  let filtered = attributes;
  if (searchQuery)
    filtered = attributes.filter((a) =>
      a.name.toLowerCase().startsWith(searchQuery.toLowerCase())
    );

  const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);
  const data = paginate(sorted, currentPage, pageSize);

  return (
    <div className='content-wrapper'>
      <div className='content-header'></div>
      <div className='card'>
        <div className='card-header'>
          <div className='row'>
            <div className='col-sm-5'>
              <h5>
                <i className='fa fa-list-alt' /> Attribute List
              </h5>
            </div>
            <div class='col-sm-7 pull-right'>
              <div class='btn-toolbar float-right'>
                <Link
                  to='/product/attributes/create'
                  class='btn btn-sm btn-success'
                  title='Create new'
                >
                  <span class='fa fa-plus-circle' /> Create
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className='card-body'>
          <div className='row'>
            <div className='col-md-12'>
              <SearchBox value={searchQuery} onChange={handleSearch} />
              <AttributeTable
                onSort={handleOnSort}
                attributes={data}
                sortColumn={sortColumn}
                onDelete={handleDeleteAttribute}
              />
              <Pagination
                totalItemsCount={filtered.length}
                pageSize={pageSize}
                onPageChange={handlePageChange}
                currentPage={currentPage}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
