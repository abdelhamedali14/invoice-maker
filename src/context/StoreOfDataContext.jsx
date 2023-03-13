import { createContext, useState, useEffect } from "react";

export const StoreOFDataCotext = createContext();

export const StoreOFDataCotextProvider = ({ children }) => {
  //state to detect the current user and contain all related data about the user
  const [logedUser, setLogedUser] = useState({});
  //state to mange the button
  const[disabled,setDisapled]=useState(true)

  useEffect(() => {
    // if we have dataBase of users we assign here the current user to the logedin user
    const currentUser = {
      invoiceDate: "",
      country: "",
      city: "",
      address: "",
      items: [],
      totalPrice: 0,
      totalVat: 0,
      totalAmount: 0,
    };
    setLogedUser(currentUser);

    return () => {
      setLogedUser({});
    };
  }, []);
  //Fn to calc the total of all items
  const getTotal = () => {
    logedUser.items?.forEach((element) => {
      setLogedUser((prev) => {
        prev.totalAmount = prev.totalAmount + element.totalAMount;
        prev.totalVat = prev.totalVat + element.totalVat;
        prev.totalPrice = prev.totalPrice + element.totalPrice;
        return {
          ...prev,
        };
      });
    });
  };
  console.log(logedUser);
  return (
    <StoreOFDataCotext.Provider
      value={{
        logedUser,
        setLogedUser,
        getTotal,
        disabled,setDisapled
      }}
    >
      {children}
    </StoreOFDataCotext.Provider>
  );
};
