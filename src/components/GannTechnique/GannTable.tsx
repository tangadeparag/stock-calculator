import { useState, useEffect } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const GannTable = () => {
  const [sharePrice, setSharePrice] = useState(0);
  const [resistancePrice, setResistancePrice] = useState([]);
  const [supportPrice, setSupportPrice] = useState([]);

  // Get values from the degrees
  const getFactorFromDegree = (degree: number) => {
    switch (degree) {
      case 45:
        return 0.25;
      case 90:
        return 0.5;
      case 120:
        return 0.66;
      case 135:
        return 0.75;
      case 180:
        return 1;
      case 225:
        return 1.25;
      case 240:
        return 1.33;
      case 270:
        return 1.5;
      case 315:
        return 1.75;
      case 360:
        return 2;
      default:
        return 0;
    }
  };

  // Constants for all degrees
  const degreeConstants = [45, 90, 120, 135, 180, 225, 240, 270, 315, 360];

  // Find resistance
  const generateResistance = () => {
    const resistanceValues: any = [];
    const res = degreeConstants?.map((degree) => {
      const resistance = Math.round(
        Math.pow(Math.sqrt(sharePrice) + getFactorFromDegree(degree), 2)
      );
      resistanceValues.push({ degree: degree, resistance: resistance });
    });
    setResistancePrice(resistanceValues);
  };

  // Find support
  const generateSupport = () => {
    const suppportValues: any = [];
    const res = degreeConstants?.map((degree) => {
      const support = Math.round(
        Math.pow(Math.sqrt(sharePrice) - getFactorFromDegree(degree), 2)
      );
      suppportValues.push({ degree: degree, support: support });
    });
    setSupportPrice(suppportValues);
  };

  // Call support and resistance function whenever share price changes
  useEffect(() => {
    setTimeout(() => {
      generateResistance();
      generateSupport();
    }, 500);
  }, [sharePrice]);

  // Map support value in table
  const renderSupport = (degree: number) => {
    return supportPrice?.map(({ degree: supportDegree, support }) => {
      if (degree === supportDegree) {
        return support;
      }
    });
  };

  const onCopyText = (e: any, param: string) => {
    toast(`${param} copied ${e}`);
  };

  // Map table rows
  const renderTableRows = () => {
    const returnRow = resistancePrice?.map(({ degree, resistance }) => {
      return (
        <>
          <tr key={degree}>
            <th scope="row" className="text-center">
              {degree}
            </th>

            <CopyToClipboard
              text={resistance}
              onCopy={(e) => onCopyText(e, "Resistance")}
            >
              <th
                scope="row"
                className="text-center text-primary"
                onCopy={(e) => onCopyText(e, "Resistance")}
              >
                {resistance}
              </th>
            </CopyToClipboard>
            <CopyToClipboard
              text={renderSupport(degree)?.toString()?.replaceAll(",", "")}
              onCopy={(e) => onCopyText(e, "Support")}
            >
              <th scope="row" className="text-center text-danger">
                {renderSupport(degree)}
              </th>
            </CopyToClipboard>
          </tr>
          <ToastContainer />
        </>
      );
    });

    return returnRow;
  };

  // Render table
  const renderSupportResistanceTable = () => {
    return (
      <table className="table table-bordered table-striped">
        <thead className="table-dark">
          <tr>
            <th scope="col" className="text-center">
              Degree's
            </th>
            <th scope="col" className="text-center">
              Resistance
            </th>
            <th scope="col" className="text-center">
              Support
            </th>
          </tr>
        </thead>
        <tbody>{renderTableRows()}</tbody>
      </table>
    );
  };

  return (
    <div className="container mt-5">
      <h3 className="text-center mb-5">Gann Calculator</h3>
      <div className="mb-3">
        <label htmlFor="share-price" className="form-label">
          Share Price
        </label>
        <input
          type="number"
          name="share-price"
          className="form-control mb-3"
          id="share-price"
          placeholder="Enter Share Price"
          onChange={(e: any) => {
            setSharePrice(e.target.value);
          }}
        />
        {/* <button
          type="submit"
          className="btn btn-primary mb-3"
          onClick={() => generateResistance(45)}
        >
          Confirm
        </button> */}
      </div>
      {sharePrice ? (
        <>
          <h3 className="text-center mt-5 mb-4">
            Support and resistance table for price{" "}
            <span className="bg-warning p-1">{sharePrice}</span>
          </h3>
          {renderSupportResistanceTable()}
        </>
      ) : (
        ""
      )}
    </div>
  );
};
