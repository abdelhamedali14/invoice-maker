import React, { useRef, useState, useEffect, useContext } from "react";
import { StoreOFDataCotext } from "../context/StoreOfDataContext";
import { product } from "../Data/Data";

export const TableRow = ({ id }) => {
  //state to detect the choosen product from dropDown item
  const [selectValue, setSelectValue] = useState("");
  //state to contain all data info and data values
  const [selectProduct, setSelctedProduct] = useState({
    totalPrice: 0,
    Quantity: 1,
    vat: 0,
    totalVat: 0,
    totalAMount: function () {
      return Math.floor(this.totalPrice + this.totalVat);
    },
  });
//ref to remove items from row
  const deletRow = useRef(false);
  const { logedUser, setLogedUser,disabled } = useContext(StoreOFDataCotext);
//function to detect the current user and handel all related data
  const handelItemInfo = (prod) => {
    const itemIndex = logedUser.items.findIndex((item) => {
      return item.id === id;
    });
    setLogedUser((prev) => {
      let q = +prev.items[itemIndex].quantity;
      prev.items[itemIndex].selectedItem = prod.name;
      prev.items[itemIndex].totalAMount = prod.amount * q;
      prev.items[itemIndex].totalVat = Math.floor(prod.vat * (prod.amount * q));
      prev.items[itemIndex].totalPrice =
        prod.amount * q + prod.vat * (prod.amount * q);

      return {
        ...prev,
      };
    });
  };

  // function to calc the price

  const getPrice = (price, quan) => {
    setSelctedProduct((prev) => {
      return { ...prev, totalPrice: price * quan };
    });
  };
  // function to calc the vat
  const getVat = (price, vat, quan) => {
    setSelctedProduct((prev) => {
      return { ...prev, totalVat: price * vat * quan };
    });
  };
  //function rseponse for detect the change of quantity and update all related values
  const handelChangeQuantity = (e, p) => {
    setSelctedProduct((prev) => {
      return { ...prev, Quantity: e.target.value };
    });
    const itemIndex = logedUser.items.findIndex((item) => {
      return item.id === id;
    });
    setLogedUser((prev) => {
      prev.items[itemIndex].quantity = +e.target.value;
      return { ...prev };
    });

    getPrice(p.price, e.target.value);
    getVat(p.price, p.vat, e.target.value);
    console.log(p);
    handelItemInfo({
      name: p.name,
      amount: p.price,
      vat: p.vat,
      quan: selectProduct.Quantity,
    });
  };
  //function rseponse for detect the change of Vat and update all related values
  const handelChangeVat = (e, p) => {
    setSelctedProduct((prev) => {
      return { ...prev, vat: e.target.value };
    });
    getVat(p.price, e.target.value, p.Quantity);
    handelItemInfo(selectProduct);
  };

  useEffect(() => {
    if (selectProduct.entries) {
      getPrice(selectProduct.price, selectProduct.Quantity);
      getVat(selectProduct.price, selectProduct.vat, selectProduct.Quantity);
      // setVat(selectProduct.vat);
      setSelctedProduct((prev) => {
        return { ...prev, vat: selectProduct.vat };
      });
    }
    return;
  }, []);

  //function to set the selceted item from allitems  to updated to the current product and add it to table
  const handelSelect = (e) => {
    Array.from(e.target.children).forEach((ch) => {
      ch.getAttribute("value") === e.target.value &&
        setSelctedProduct((prev) => {
          return { ...prev, vat: ch.dataset.vat };
        });
    });
    setSelectValue(e.target.value);
    product.filter((prod) => {
      if (prod.name === e.target.value) {
        setSelctedProduct((prev) => {
          return { ...prev, ...prod };
        });
        getPrice(prod.price, selectProduct.Quantity);
        getVat(prod.price, prod.vat, selectProduct.Quantity);
        handelItemInfo({
          name: prod.name,
          amount: prod.price,
          vat: prod.vat,
          quan: selectProduct.Quantity,
        });
      }
    });
  };
  const handelRemove = (item) => {
    const itemIndex = logedUser.items.indexOf(item);
    logedUser.items.splice(itemIndex, 1);
  };
  return (
    <tr ref={deletRow}>
      <td>
        <select
          value={selectValue}
          className="table-input select-country"
          onChange={(e) => {
            handelSelect(e);
          }}
        >
          <option key="select your product" value="select your product">
            select your product
          </option>
          {product?.map((prod, i) => {
            return (
              <option key={prod.name} value={prod.name} data-vat={prod.vat}>
                {prod.name}
              </option>
            );
          })}
        </select>
      </td>
      {selectProduct.price && (
        <React.Fragment>
          <td>{selectProduct.price}</td>
          <td>
            <input
              type="number"
              className="table-input"
              defaultValue={selectProduct.Quantity}
              min={1}
              onChange={(e) => handelChangeQuantity(e, selectProduct)}
            />
          </td>
          <td>{selectProduct.totalPrice}</td>
          <td>
            <input
              type="number"
              className="table-input"
              defaultValue={selectProduct.vat}
              min={0}
              step={0.1}
              max={0.14}
              onChange={(e) => handelChangeVat(e, selectProduct)}
            />
          </td>
          <td>{Math.floor(selectProduct.totalVat)}</td>
          <td>{selectProduct.totalAMount()}</td>
          <td>
            <button
              className="delet-btn"
              disabled={!disabled}
              onClick={() => {
                deletRow.current.remove();
                handelRemove(selectProduct);
              }}
            >
              x
            </button>
          </td>
        </React.Fragment>
      )}
    </tr>
  );
};
