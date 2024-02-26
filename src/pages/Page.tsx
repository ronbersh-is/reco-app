import React, { useState, useEffect } from "react";
import "./apps.scss";
import { TableApps } from "./TableApps";
import AppsModel from "./AppsModel";

export const Page: React.FC = () => {
  const [name, setName] = useState<string>("");
  const appsUrl = "/api/v1/app-service/get-apps";

  //const data for req
  // const body = {
  //   pageNumber: 1,
  //   pageSize: 50,
  // };

  const config = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
  };

  ///add type for apps later with interface
  const [apps, setApps] = useState<AppsModel[]>([]);
  const [rows, setRows] = useState<AppsModel[]>([]);

  const [totalApps, setTotalApps] = useState<number>(0);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(25);
  const [loading, setLoading] = useState<boolean>(false);

  const getApps = async (currentPage: number, pageSizeNumber: number) => {
    try {
      const getBody = {
        pageNumber: currentPage,
        pageSize: pageSizeNumber,
      };
      setLoading(false);
      console.log("body Data", getBody);
      const response = await fetch(appsUrl, {
        ...config,
        body: JSON.stringify(getBody),
      });
      const data = await response.json();
      const { totalCount, appRows } = await data;
      setLoading(true);
      setApps(appRows);
      const rowsData = appRows.length ? appRows : [];
      setRows(rowsData);
      setTotalApps(totalCount);
      console.log("data", appRows);
    } catch (error) {
      console.log("error", error);
      setLoading(true);
    }
  };

  useEffect(() => {
    getApps(pageNumber, pageSize);
  }, []);

  const nextPage = (pageNumber: number): void => {
    if (totalApps / pageSize > pageNumber) {
      console.log("page number", pageNumber);
      setPageNumber(pageNumber + 1);
      getApps(pageNumber, pageSize);
    }
  };

  const prevPage = (pageNumber: number): void => {
    if (pageNumber > 1) {
      console.log("page number", pageNumber);
      setPageNumber(pageNumber - 1);
      getApps(pageNumber, pageSize);
    }
  };

  const changePageSize = (event: React.ChangeEvent<HTMLSelectElement>) => {
    console.log("page size", event.target.value);
    setPageSize(Number(event.target.value));
    //getApps(pageNumber, pageSizeNumber);
  };

  return (
    <>
      <div className="apps-main">
        <h1>App Inventory</h1>
        <div>
          {loading ? (
            <>
              <div>
                <h2>
                  Total Apps: {totalApps} ,size:
                  {pageSize}
                </h2>
                <TableApps appsData={rows} />
                <div className="pageintion">
                  <div className="page-from">
                    <button
                      onClick={() => prevPage(pageNumber)}
                      className="btn"
                    >
                      Previous
                    </button>
                    {pageNumber} - of {Math.ceil(totalApps / pageSize)}
                    <button
                      onClick={() => nextPage(pageNumber)}
                      className="btn"
                    >
                      next
                    </button>
                  </div>
                  <div className="page-amount">
                    <select onChange={changePageSize} value={pageSize}>
                      <option value={25}>25</option>
                      <option value={50}>50</option>
                    </select>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <>
              <h2>Loading...</h2>
            </>
          )}
        </div>
      </div>
    </>
  );
};
