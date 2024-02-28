import React, { useState, useEffect } from "react";
import AppsModel from "../model/AppsModel";

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
                <tr key={app.appId}>
                  <td>
                    {index + 1}. {app?.appName}
                  </td>
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
