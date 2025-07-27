import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Register from "./pages/auth/Register";
import Login from "./pages/auth/Login";
import ForgotPassword from "./pages/auth/ForgotPassword";
import PageNotFound from "./pages/PageNotFound";
import Contact from "./pages/Contact";
import AdminDash from "./pages/admin/AdminDash";
import CreateCategory from "./pages/admin/crop/CreateCatagory";
import Crops from "./pages/admin/crop/Crops";
import UpdateCrop from "./pages/admin/crop/UpdateCrop";
import CreateCrop from "./pages/admin/crop/CreateCrop";
import Private from "./routes/Private";
import AdminRoute from "./routes/AdminRoute";
import Crop from "./pages/infra/crop/Crop";
import Seed from "./pages/infra/seed/Seed";
import Soil from "./pages/infra/soil/Soil";
import AdvanceEqp from "./pages/infra/advanceEqp/AdvanceEqp";
import Greenhouse from "./pages/infra/greenhouse/Greenhouse";
import Stubble from "./pages/infra/stubble/Stubble";
import Fertilizer from "./pages/infra/fertilizer/Fertilizer";
import OrganicFertilizer from "./pages/infra/fertilizer/OrganicFertilizer";
import OrganicFertiAdmin from "./pages/admin/OrganicFertiAdmin";
import GreenHouseAdmin from "./pages/admin/GreenHouseAdmin";
import StubbleAdmin from "./pages/admin/StubbleAdmin";
import SeedAdmin from "./pages/admin/SeedAdmin";
import SoilAdmin from "./pages/admin/SoilAdmin";
import AdvEqpAdmin from "./pages/admin/AdvEqpAdmin";
import NewsAdmin from "./pages/admin/NewsAdmin";
import Community from "./pages/community/Community";
import CropDetails from "./pages/infra/crop/CropDetails";
import RedirectIfAuthenticated from "./routes/RedirectIfAuthenticated";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />

      <Route
        path="/sign-up"
        element={
          <RedirectIfAuthenticated>
            <Register />
          </RedirectIfAuthenticated>
        }
      />
      <Route
        path="/sign-in"
        element={
          <RedirectIfAuthenticated>
            <Login />
          </RedirectIfAuthenticated>
        }
      />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />

      {/* modules */}
      <Route path="/crop" element={<Crop />} />
      <Route path="/crop-details/:slug" element={<CropDetails />} />
      <Route path="/seed" element={<Seed />} />
      <Route path="/soil" element={<Soil />} />
      <Route path="/advanceEqp" element={<AdvanceEqp />} />
      <Route path="/greenhouse" element={<Greenhouse />} />
      <Route path="/stubble" element={<Stubble />} />
      <Route path="/fertilizer" element={<Fertilizer />} />
      <Route path="/organic-fertilizer" element={<OrganicFertilizer />} />

      {/* user */}
      <Route path="/dashboard" element={<Private />}>
        <Route path="community" element={<Community />} />
      </Route>
      {/* admin  */}
      <Route path="/dashboard" element={<AdminRoute />}>
        <Route path="admin" element={<AdminDash />} />
        {/* crops */}
        <Route path="createCategory" element={<CreateCategory />} />
        <Route path="createCrop" element={<CreateCrop />} />
        <Route path="crops" element={<Crops />} />
        <Route path="crops/updateCrop/:slug" element={<UpdateCrop />} />
        {/* news */}
        <Route path="news" element={<NewsAdmin />} />
        {/* organicFerti */}
        <Route path="organicFerti" element={<OrganicFertiAdmin />} />
        {/* greenhouse */}
        <Route path="greenhouse" element={<GreenHouseAdmin />} />
        {/* stubble */}
        <Route path="stubble" element={<StubbleAdmin />} />
        {/* seed */}
        <Route path="seed-store" element={<SeedAdmin />} />
        {/* soil */}
        <Route path="soil-testing" element={<SoilAdmin />} />
        {/* Advance eqp */}
        <Route path="advance-eqp" element={<AdvEqpAdmin />} />
      </Route>

      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
}
