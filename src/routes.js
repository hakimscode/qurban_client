import React from "react";
import { Redirect } from "react-router-dom";

// Layout Types
import { DefaultLayout } from "./layouts";

// Route Views
import Dashboard from "./views/Dashboard";
import PenerimaQurban from "./views/PenerimaQurban";
import PemberiQurban from "./views/PemberiQurban";
import Kelurahan from "./views/Kelurahan";
import Laporan from "./views/Laporan";

export default [
  {
    path: "/",
    exact: true,
    layout: DefaultLayout,
    component: () => <Redirect to="/dashboard" />
  },
  {
    path: "/dashboard",
    layout: DefaultLayout,
    component: Dashboard
  },
  {
    path: "/penerima-qurban",
    layout: DefaultLayout,
    component: PenerimaQurban
  },
  {
    path: "/pemberi-qurban",
    layout: DefaultLayout,
    component: PemberiQurban
  },
  {
    path: "/kelurahan",
    layout: DefaultLayout,
    component: Kelurahan
  },
  {
    path: "/laporan",
    layout: DefaultLayout,
    component: Laporan
  }
];
