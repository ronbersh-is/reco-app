import React, { useState, useEffect } from "react";
import AppsModel from "./AppsModel";

interface TableAppsProps {
  appsData: AppsModel[];
}

export const TableApps: React.FC<TableAppsProps> = ({ appsData }) => {
  return (
    <>
      <div className="table-apps">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Catagory</th>
              <th>Connector</th>
            </tr>
          </thead>
          <tbody>
            {appsData.map((app: any, index: number) => {
              return (
                <tr key={index}>
                  <td>{app?.appName}</td>
                  <td>{app?.category}</td>
                  <td>
                    {app.appSources.length > 0 ? app.appSources.join(", ") : ""}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};
