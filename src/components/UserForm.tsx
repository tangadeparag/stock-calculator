import { useState, useEffect, useCallback } from "react";

import {
  userFormConstants,
  shareAverageConstants,
} from "../constants/FormConstants";

const UserForm = () => {
  const [formData, setFormData] = useState({});
  const [shareAverageData, setShareAverageData] = useState<any>([
    { key: "First", share_quantity: 0, share_price: 0 },
    { key: "Second", share_quantity: 0, share_price: 0 },
  ]);
  const [shareFinalData, setShareFinalData] = useState<any>({
    totalUnits: null,
    averagePrice: null,
    totalAmount: null,
  });
  const [isButtonDisabled, setisButtonDisabled] = useState(true);

  const submitButtonDisabledCondition = () => {
    const getArray = shareAverageData.map((item: any) => {
      return Object.values(item);
    });
    const containsZero = getArray.flat()?.includes(0);
    if (containsZero) {
      setisButtonDisabled(true);
    } else {
      setisButtonDisabled(false);
    }
  };

  const handleChangeShareAverage = (e: any, param: string) => {
    setShareFinalData({
      totalUnits: 0,
      averagePrice: 0,
      totalAmount: 0,
    });

    if (param === "First") {
      let tempShareAverageData = shareAverageData;
      tempShareAverageData[0][e.target.name] = Number(e.target.value);
      setShareAverageData(tempShareAverageData);
      submitButtonDisabledCondition();
    } else {
      let tempShareAverageData = shareAverageData;
      tempShareAverageData[1][e.target.name] = Number(e.target.value);
      setShareAverageData(tempShareAverageData);
      submitButtonDisabledCondition();
    }
  };

  const mapShareAverageValues = (item: string, param: string) => {
    if (param === "First") {
      return shareAverageData?.[0]?.item;
    } else {
      return shareAverageData?.[1]?.item;
    }
  };

  const calculateAveragePrice = () => {
    const averagePrice =
      (shareAverageData?.[0]?.share_price *
        shareAverageData?.[0]?.share_quantity +
        shareAverageData?.[1]?.share_price *
          shareAverageData?.[1]?.share_quantity) /
      (shareAverageData?.[0]?.share_quantity +
        shareAverageData?.[1]?.share_quantity);

    const totalUnits =
      shareAverageData?.[0]?.share_quantity +
      shareAverageData?.[1]?.share_quantity;
    const totalAmount =
      shareAverageData?.[0]?.share_price *
        shareAverageData?.[0]?.share_quantity +
      shareAverageData?.[1]?.share_price *
        shareAverageData?.[1]?.share_quantity;
    setShareFinalData({
      totalUnits: totalUnits,
      averagePrice: averagePrice,
      totalAmount: totalAmount,
    });
  };

  const renderShareFormFields = (param: string) => {
    return shareAverageConstants?.map((item) => {
      return (
        <form key={item?.key}>
          <div className="form-group">
            <label htmlFor={item?.key}>
              {`${param}
              ${item?.label}`}
            </label>
            <input
              type={item?.type}
              name={`${item?.key}`}
              className="form-control "
              id={item?.key}
              aria-describedby="emailHelp"
              placeholder={item?.label}
              value={mapShareAverageValues(item?.key, param)}
              onChange={(e) => handleChangeShareAverage(e, param)}
              style={{ textAlign: "right", paddingRight: "10px" }}
            />
          </div>
        </form>
      );
    });
  };

  useEffect(() => {
    submitButtonDisabledCondition();
  }, [shareAverageData]);

  return (
    <div className="container">
      <div className="mt-5">
        <>
          <div className="row">
            <div className="col-6">
              {renderShareFormFields("First")}
              <hr />
            </div>
            <div className="col-6">
              {renderShareFormFields("Second")}
              <hr />
            </div>
          </div>
          <div className="row">
            <div className="col-12 text-center">
              <button
                type="submit"
                className="btn btn-primary mt-3"
                disabled={isButtonDisabled}
                onClick={() => {
                  calculateAveragePrice();
                }}
              >
                Submit
              </button>
            </div>
          </div>
          <div>
            {Object.values(shareFinalData)?.filter(Boolean)?.length ? (
              <div>
                <p>Total Units : {shareFinalData?.totalUnits}</p>
                <p>Average Price : {shareFinalData?.averagePrice} </p>
                <p>Total Amount : {shareFinalData?.totalAmount}</p>
              </div>
            ) : (
              ""
            )}
          </div>
        </>
      </div>
    </div>
  );
};

export default UserForm;
