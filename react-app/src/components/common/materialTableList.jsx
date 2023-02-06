import React, { useState } from "react";
import MaterialTable from "material-table";
import { ThemeProvider, createTheme } from "@mui/material";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

export default function MaterialTableList() {
  const defaultMaterialTheme = createTheme();

  const [tableData, setTableData] = useState([
    { name: "Mahadi Hassan Babu", email: "mahadihassan.cse@gmail.com", phone: "01795232590", age: null, gender: "M", city: "Dhaka", fee: 200 },
    { name: "Hasan Al Tarek", email: "tarek.cse@gmail.com", age: 25, gender: "M", city: "Narayongonj", fee: 2000 },
    { name: "Omor Faruk", email: "omorfaruk.cse@gmail.com", age: 14, gender: "M", city: "Rajshahi", fee: 500 },
    { name: "Roton Ali", email: "roton.cse@gmail.com", age: 24, gender: "M", city: "Khulna", fee: 400 },
    { name: "Juwel", email: "juwel.cse@gmail.com", age: 24, gender: "M", city: "Comilla", fee: 700 },
    { name: "Ahsan Habib", email: "habib.cse@gmail.com", age: 10, gender: "M", city: "Dhaka", fee: 900 },
    { name: "Sadhin", email: "shadin.cse@gmail.com", age: null, gender: "M", city: "Pabna", fee: 1000 },
    { name: "Rity", email: "rity.cse@gmail.com", age: 12, gender: "F", city: "Khulna", fee: 2020 },
    { name: "Rinky", email: "rinky.cse@gmail.com",  age: 18, gender: "F", city: "Pabna", fee: 2000 },
  ]);

  const columns = [
    { title: "Name", field: "name" },
    { title: "Email", field: "email", filterPlaceholder: 'Filter by Email' },
    { title: "Age", field: "age", emptyValue:() => <em> null </em>, defaultSort: 'asc', searchable: false },
    { title: "Gender", field: "gender", lookup: { M: "Male", F: "Female" } },
    { title: "City", field: "city", export:false },
    { title: "School Fee", field: "fee", type: "currency", currencySetting: { currencyCode: "BDT", minimumFractionDigits: 0 } },
    { title: "Action", field: "action", lookup: { delete: "DIcon", Edit: "DIcon" }} ,
  ];

  return (
    <div className='content-wrapper'>
      <div className='content-header'></div>
      <ThemeProvider theme={defaultMaterialTheme}>
        <MaterialTable
          columns={columns}
          data={tableData}
          title='Demo Table List'
          editable={{
            onRowAdd: (newRow) =>
              new Promise((resolve, reject) => {
                setTableData([...tableData, newRow]);
                setTimeout(() => resolve(), 500);
              }),

            onRowUpdate: (newRow, oldRow) =>
              new Promise((resolve, reject) => {
                const updateData = [...tableData];
                const index = updateData.indexOf(oldRow);
                updateData[index] = { ...newRow };
                setTableData(updateData);
                setTimeout(() => resolve(), 500);
              }),

            onRowDelete: (selectedRow) =>
              new Promise((resolve, reject) => {
                const updateData = [...tableData];
                const index = updateData.indexOf(selectedRow);
                updateData.splice(index, 1);
                setTableData(updateData);
                setTimeout(() => resolve(), 500);
              }),
          }}
          options={{
            sorting: true,
            search: true,
            // filtering: true,
            searchFieldVariant: "standard",
            paging: true,
            pageSizeOptions: [5, 10, 25, 50, 100],
            paginationType: 'stepped',
            exportButton: true,
            exportAllData: true,
            exportFileName: "DemoData",
            addRowPosition: "first",
            actionsColumnIndex: -1,
            selection: true,
            showSelectAllCheckbox: false,
            showTextRowsSelected: false,
            selectionProps:(rowData) =>({
              disabled: rowData.name === 'Sadhin',
              color:'primary'
            }),
            // grouping: true,
            columnsButton: true,
            rowStyle:(data, index) => index % 2 === 0 ? {background: 'f5f5f5'} : null,
            headerStyle: {background: 'green'}
          }}
          actions={[
            {
              icon: () => <button>Click Me</button>,
              tooltip: "Crete New",
              onClick: (e, data) => console.log(data),
              isFreeAction: true,
            },
          ]}
        />
      </ThemeProvider>
    </div>
  );
}