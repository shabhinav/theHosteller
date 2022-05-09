import React, { useEffect, useState } from "react";
import SimpleTable from "../Table/Table";

function createData(name, value, fat, carbs, protein) {
  return { name, value, fat, carbs, protein };
}

const loginRows = [
  createData("MOBILE NUMBER", "+91 - 9850555551"),
  createData("EMAIL ID", "abhi3578@gmail.com"),
  createData("PASSWORD", "....."),
];

function LoginDetails({ data }) {
  const [loginData, setLoginData] = useState([]);
  useEffect(() => {
    if (data) {
      const loginRows = [
        { name: "MOBILE NUMBER", value: data.mobile },
        { name: "EMAIL ID", value: data.email },
        { name: "PASSWORD", value: "............" },
      ];
      setLoginData(loginRows);
    }
  }, [data]);
  return (
    <div className="mt-16 user_profile_container">
      <div className="pr-4 mt-5">
        <div className="w-full flex justify-between items-center">
          <div>
            <h5
              id="login"
              className="font-semibold text-blackShade "
            >
              Login Details
            </h5>
            <p className="text-lightgrey mt-1">
              Manage your email address mobile number and password
            </p>
          </div>
        </div>
      </div>
      <div className="mt-5">
        <SimpleTable rows={loginData} />
      </div>
    </div>
  );
}

export default LoginDetails;
