import React, { useEffect, useState } from "react";
import Graph from "../Graph/Graph";
import "./adminDashboard.css";
import Cookies from "js-cookie";

const AdminDashboard = () => {
  const [adminData, setAdminData] = useState({});
  const [selectedValue, setSelectedValue] = useState(null);
  const [price, setPrice] = useState(0);
  const [category7, setCategory7] = useState(0);
  const [category8, setCategory8] = useState(0);
  const [category9, setCategory9] = useState(0);
  const [category10, setCategory10] = useState(0);

  const handleSelectValue = (event) => {
    setSelectedValue(event.target.value);
  };

  const fetchAdminDetails = async () => {
    const id = Cookies.get("dhun_user_id");
    // console.log("ID: ", id);
    const response = await fetch(`https://stg.dhunjam.in/account/admin/${id}`);
    // console.log(response);
    const data = await response.json();

    if (response.ok) {
      //   console.log("Hello", data.data);
      //   console.log("Hello2", data.data.amount);
      setAdminData(data.data);
      if (data.data.charge_customers === true) {
        setSelectedValue("Yes");
      } else {
        setSelectedValue("No");
      }
      setPrice(data.data.amount.category_6);
      setCategory7(data.data.amount.category_7);
      setCategory8(data.data.amount.category_8);
      setCategory9(data.data.amount.category_9);
      setCategory10(data.data.amount.category_10);
    }
  };

  const onSubmitRequest = async (event) => {
    event.preventDefault();
    const id = Cookies.get("dhun_user_id");
    try {
      const categoryDetails = {
        category_6: price,
        category_7: category7,
        category_8: category8,
        category_9: category9,
        category_10: category10,
      };
      console.log("Category details", categoryDetails);
      const options = {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ amount: categoryDetails }),
      };
      const response = await fetch(
        `https://stg.dhunjam.in/account/admin/${id}`,
        options
      );
      console.log(response);
      console.log(await response.json());
      fetchAdminDetails();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchAdminDetails();
  }, []);

  return (
    <React.Fragment>
      <div className="dashboard-container">
        <form onSubmit={onSubmitRequest}>
          <h1>{`${adminData?.name}, ${adminData?.location} on Dhun Jam`}</h1>
          <div className="form-group">
            <label className="label">
              Do you want to charge your customers for requesting songs?
            </label>
            <div className="yes-no-container">
              <label className="radio-classification">
                <input
                  className="radio"
                  type="radio"
                  name="YesNoOption"
                  value="Yes"
                  checked={selectedValue === "Yes"}
                  onChange={handleSelectValue}
                />
                Yes
              </label>
              <label className="radio-classification">
                <input
                  className="radio"
                  type="radio"
                  name="YesNoOption"
                  value="No"
                  onChange={handleSelectValue}
                  checked={selectedValue === "No"}
                />
                No
              </label>
            </div>
          </div>
          <div className="form-group">
            <label className="label">Custom song request amount-</label>
            <input
              type="number"
              className="request-amount-input"
              disabled={selectedValue === "No"}
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label className="label">
              Regular song request amounts, from high to low-
            </label>
            <div className="input-group">
              <input
                className="category"
                type="number"
                name="category7"
                value={category7}
                disabled={selectedValue === "No"}
                onChange={(e) => setCategory7(e.target.value)}
              />
              <input
                className="category"
                type="number"
                name="category8"
                value={category8}
                disabled={selectedValue === "No"}
                onChange={(e) => setCategory8(e.target.value)}
              />
              <input
                className="category"
                type="number"
                name="category9"
                disabled={selectedValue === "No"}
                value={category9}
                onChange={(e) => setCategory9(e.target.value)}
              />
              <input
                className="category"
                type="number"
                name="category10"
                disabled={selectedValue === "No"}
                value={category10}
                onChange={(e) => setCategory10(e.target.value)}
              />
            </div>
          </div>
          <div>
            {selectedValue === "Yes" && (
              <div className="chart-container-inner">
                <div className="rupee-symbol">₹</div>
                <Graph
                  price={price}
                  category7={category7}
                  category8={category8}
                  category9={category9}
                  category10={category10}
                />
              </div>
            )}
          </div>
          <button
            className="save-btn"
            type="submit"
            disabled={
              selectedValue === "No" ||
              price < 99 ||
              category7 < 79 ||
              category8 < 59 ||
              category9 < 39 ||
              category10 < 19
            }
          >
            Save
          </button>
        </form>
      </div>
    </React.Fragment>
  );
};

export default AdminDashboard;
