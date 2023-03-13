import React, { useState, useContext } from "react";
import { TableRow } from "./TableRow";
import { StoreOFDataCotext } from "../context/StoreOfDataContext";

export const Table = () => {
  const [tableItems, SetTableItems] = useState([]);
  //state to  genrate id for every item to control it later in all program
  const [itemId, setItemId] = useState(0);
  const { logedUser, disabled } = useContext(StoreOFDataCotext);

  const handelConfirmItem = () => {
    const currentConfirmedItem = {
      id: Math.floor(Math.random() * 98100013005433),
      selectedItem: "",
      quantity: 1,
      totalPrice: "",
      totalVat: "",
      totalAMount: "",
    };
    setItemId(currentConfirmedItem.id);
    logedUser.items.push(currentConfirmedItem);
  };
  console.log(logedUser.totalAmount);
  return (
    <div className="table-wrapper">
      <div className="add-btn ">
        <button
          className="btn"
          onClick={() => {
            SetTableItems((prev) => {
              return [...prev, itemId];
            });
            handelConfirmItem();
          }}
          disabled={!disabled}
        >
          Add item
        </button>
      </div>
      <table className="fl-table">
        <thead>
          <tr>
            <th>Product name</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Sales amount</th>
            <th>Vat</th>
            <th>Vat amount</th>
            <th>Total amount</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {tableItems.map((_, i) => {
            return <TableRow key={i} id={itemId} />;
          })}
       {!disabled&&   <>
         
         <tr className="total">
           <td colSpan="9">total sales = {logedUser.totalAmount}</td>
         </tr>
         <tr className="total">
           <td colSpan="9">total vat = {logedUser.totalVat}</td>
         </tr>
         <tr className="total">
           <td colSpan="9"> total amount = {logedUser.totalPrice}</td>
         </tr> 
         
       </>}
        </tbody>
      </table>
    </div>
  );
};
