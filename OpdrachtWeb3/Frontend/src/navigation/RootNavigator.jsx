import React from "react";
import {Routes, Route} from "react-router-dom";
import Student from "../screens/Student";
import Login from "../screens/Login";
import RapportStudent from "../components/RapportStudent";
import Host from "../screens/Host";
import RapportHost from "../components/RapportHost";
import Admin from "../screens/Admin";

const RootNavigator = () => {
  return (
    <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/host" element={<Host/>} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/student/:id" element={<Student />} />      
        <Route path="/student/:id/rapport/:opdrachtElementId" element={<RapportStudent />} />
        <Route path="/host/rapport/:opdrachtElementId" element={<RapportHost />} />
    </Routes>
  )
}

export default RootNavigator