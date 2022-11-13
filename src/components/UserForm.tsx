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

  useEffect(() => {
    console.log("shareAverageData", shareAverageData);
  }, [shareAverageData, setShareAverageData]);

  // const handleChange = (e: any) => {
  //   console.log(e.target.name, e.target.value);
  //   let aa = e.target.name;
  //   setFormData({
  //     ...formData,
  //     [aa]: e.target.value,
  //   });
  // };

  // const renderFormFields = () => {
  //   return (
  //     userFormConstants?.length &&
  //     userFormConstants?.map((field) => {
  //       return (
  //         <div className="form-group" key={field.key}>
  //           <label htmlFor="exampleInputEmail1">{field?.label}</label>
  //           <input
  //             type={field?.type}
  //             className="form-control"
  //             name={field?.key}
  //             id="exampleInputEmail1"
  //             aria-describedby="emailHelp"
  //             placeholder={`Enter ${field?.label}`}
  //             onChange={(e) => handleChange(e)}
  //           />
  //           {field.key === "email" && (
  //             <small id="emailHelp" className="form-text text-muted">
  //               We'll never share your email with anyone else.
  //             </small>
  //           )}
  //         </div>
  //       );
  //     })
  //   );
  // };

  const handleChangeShareAverage = (e: any, param: string) => {
    if (param === "First") {
      let tempShareAverageData = shareAverageData;
      tempShareAverageData[0][e.target.name] = Number(e.target.value);
      setShareAverageData(tempShareAverageData);
      console.log("tempShareAverageData", tempShareAverageData);
    } else {
      let tempShareAverageData = shareAverageData;
      tempShareAverageData[1][e.target.name] = Number(e.target.value);
      setShareAverageData(tempShareAverageData);
    }
  };

  const mapShareAverageValues = (item: string, param: string) => {
    // console.log(item, shareAverageData[0][item]);
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
      shareAverageData?.[0]?.share_price + shareAverageData?.[1]?.share_price;
    console.log("totalUnits", totalUnits, averagePrice);
    return (
      <div>
        <p>Total Units : {totalUnits}</p>
        <p>Average Price : {averagePrice}</p>
        <p>Total Amount : {totalAmount}</p>
      </div>
    );
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

  const shareButtonDisabledCondition = useCallback(() => {
    let tempShareAverageKeys: any = [];

    console.log("inside", shareAverageData, shareAverageData?.length);
    if (shareAverageData?.length) {
      shareAverageData?.forEach(
        (item: object) =>
          // tempShareAverageKeys.push(...Object.values(item))
          (tempShareAverageKeys = [
            ...tempShareAverageKeys,
            ...Object.values(item),
          ])
      );
    }
    console.log("tempShareAverageKeys", tempShareAverageKeys);
    if (
      tempShareAverageKeys?.length &&
      tempShareAverageKeys?.find((item: any) => item === "")
    ) {
      return false;
    }

    return true;
  }, [shareAverageData]);

  return (
    <div className="container">
      {/* <form className="mt-5">
        <>
          {renderFormFields()}
          <button type="submit" className="btn btn-primary mt-2">
            Submit
          </button>
        </>
      </form> */}
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
                // disabled={shareButtonDisabledCondition()}
                disabled={false}
                onClick={() => {
                  calculateAveragePrice();
                }}
              >
                Submit
              </button>
            </div>
          </div>
          <div>{calculateAveragePrice()}</div>
        </>
      </div>
    </div>
  );
};

export default UserForm;
