import React, { Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./route/ProtectedRoute";

import MainLayout from "./layout/MainLayout";
import AuthLayout from "./layout/AuthLayout";
import LoadingSpinner from "./components/UI/loadingSpinner/LoadingSpinner";
import "./scss/App.scss";

const Dashboard = React.lazy(() => import("./pages/Dashboard"));
const Patients = React.lazy(() => import("./pages/Patients"));
const AddPatients = React.lazy(() => import("./pages/AddPatient"));

const MedicalRecords = React.lazy(() => import("./pages/MedicalRecords"));
const AddMedicalRecord = React.lazy(() => import("./pages/AddMedicalRecord"));

const Inventory = React.lazy(() => import("./pages/Inventory"));
const AddInventory = React.lazy(() => import("./pages/AddInventory"));


const Prescriptions = React.lazy(() => import("./pages/Prescriptions"));
const Transactions = React.lazy(() => import("./pages/Transactions"));
const Chat = React.lazy(() => import("./pages/BlankPage"));
const Notifications = React.lazy(() => import("./pages/BlankPage"));
const TeamManagement = React.lazy(() => import("./pages/TeamManagement"));
const AddUser= React.lazy(() => import("./pages/AddUser"));
const Audit = React.lazy(() => import("./pages/BlankPage"));
const Settings = React.lazy(() => import("./pages/BlankPage"));
const NotFound = React.lazy(() => import("./pages/NotFound"));
const Login = React.lazy(() => import("./pages/Login"));

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<LoadingSpinner />}>
        <Routes>
          <Route element={<ProtectedRoute />}>
            <Route element={<AuthLayout />}>
                <Route path="/" element={<MainLayout />}>
                <Route index element={<Dashboard />} />
                <Route path="/patients" element={<Patients />} />
                <Route path="/add-patient" element={<AddPatients />} />
                {<Route path="/records" element={<MedicalRecords />} />}
                {<Route path="/add-medical-record" element={<AddMedicalRecord />} />}
                {<Route path="/inventory" element={<Inventory />} />}
                {<Route path="/add_inventory" element={<AddInventory />} />}
                {<Route path="/prescriptions" element={<Prescriptions />} />}
                {<Route path="/transactions" element={<Transactions />} />}
                {<Route path="/chat" element={<Chat />} />}
                {<Route path="/notifications" element={<Notifications />} />}
                {<Route path="/team_management" element={<TeamManagement />} />}
                {<Route path="/add-user" element={<AddUser />} />}
                {<Route path="/audit" element={<Audit />} />}
                {<Route path="/settings" element={<Settings />} />}
              </Route>
            </Route>
          </Route>

          <Route path="/login" element={<Login />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
