import { useEffect, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';

import Loader from './common/Loader';
import PageTitle from './components/PageTitle';
import SignIn from './pages/SignIn';
import SignUp from './pages/Authentication/SignUp';
import Calendar from './pages/Calendar';
import Chart from './pages/Chart';
import ECommerce from './pages/Dashboard/ECommerce';
import FormElements from './pages/Form/FormElements';
import FormLayout from './pages/Form/FormLayout';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import Tables from './pages/Tables';
import Alerts from './pages/UiElements/Alerts';
import Buttons from './pages/UiElements/Buttons';
import DefaultLayout from './layout/DefaultLayout';
import AddProduct from './pages/Products/Add';
import AllProducts from './pages/Products/All';
import AddCategory from './pages/Category/Add';
import AllCategory from './pages/Category/All';
import EditProduct from './pages/Products/Edit';
import EditCategoryPage from './pages/Category/Edit';
import AddBlogCategoryPage from './pages/Blog/Category/Add';
import EditBlogCategoryPage from './pages/Blog/Category/Edit';
import AllBlogCategoriesPage from './pages/Blog/Category/All';

function App() {
  const [loading, setLoading] = useState<boolean>(true);
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <PageTitle title="iFeelShy Dashboard" />
              <SignIn />
            </>
          }
        />

        <Route
          element={<DefaultLayout />}
        >
          <Route
            path="/dashboard"
            element={
              <>
                <PageTitle title="Dashboard | iFeelShy" />
                <ECommerce />
              </>
            }
          />
          <Route
            path="/add-product"
            element={
              <>
                <PageTitle title="Add New Product | iFeelShy" />
                <AddProduct />
              </>
            }
          />

          <Route
            path="/all-products"
            element={
              <>
                <PageTitle title="All Products | iFeelShy" />
                <AllProducts />
              </>
            }
          />

          <Route
            path="/products/edit/:id"
            element={
              <>
                <PageTitle title="Edit Product | iFeelShy" />
                <EditProduct />
              </>
            }
          />

          <Route
            path="/add-category"
            element={
              <>
                <PageTitle title="Add New Category | iFeelShy" />
                <AddCategory />
              </>
            }
          />

          <Route
            path="/all-categories"
            element={
              <>
                <PageTitle title="All Categories | iFeelShy" />
                <AllCategory />
              </>
            }
          />

          <Route
            path="/categories/edit/:id"
            element={
              <>
                <PageTitle title="Edit Category | iFeelShy" />
                <EditCategoryPage />
              </>
            }
          />

          <Route
            path="/blog/all-categories"
            element={
              <>
                <PageTitle title="All Categories | iFeelShy" />
                <AllBlogCategoriesPage />
              </>
            }
          />
          <Route
            path="/blog/add-category"
            element={
              <>
                <PageTitle title="Add New Category | iFeelShy" />
                <AddBlogCategoryPage />
              </>
            }
          />
          <Route
            path="/blog/edit-category/:categoryId"
            element={
              <>
                <PageTitle title="Edit Category | iFeelShy" />
                <EditBlogCategoryPage />
              </>
            }
          />


          <Route
            path="/calendar"
            element={
              <>
                <PageTitle title="Calendar | TailAdmin - Tailwind CSS Admin Dashboard Template" />
                <Calendar />
              </>
            }
          />
          <Route
            path="/profile"
            element={
              <>
                <PageTitle title="Profile | TailAdmin - Tailwind CSS Admin Dashboard Template" />
                <Profile />
              </>
            }
          />
          <Route
            path="/forms/form-elements"
            element={
              <>
                <PageTitle title="Form Elements | TailAdmin - Tailwind CSS Admin Dashboard Template" />
                <FormElements />
              </>
            }
          />
          <Route
            path="/forms/form-layout"
            element={
              <>
                <PageTitle title="Form Layout | TailAdmin - Tailwind CSS Admin Dashboard Template" />
                <FormLayout />
              </>
            }
          />
          <Route
            path="/tables"
            element={
              <>
                <PageTitle title="Tables | TailAdmin - Tailwind CSS Admin Dashboard Template" />
                <Tables />
              </>
            }
          />
          <Route
            path="/settings"
            element={
              <>
                <PageTitle title="Settings | TailAdmin - Tailwind CSS Admin Dashboard Template" />
                <Settings />
              </>
            }
          />
          <Route
            path="/chart"
            element={
              <>
                <PageTitle title="Basic Chart | TailAdmin - Tailwind CSS Admin Dashboard Template" />
                <Chart />
              </>
            }
          />
          <Route
            path="/ui/alerts"
            element={
              <>
                <PageTitle title="Alerts | TailAdmin - Tailwind CSS Admin Dashboard Template" />
                <Alerts />
              </>
            }
          />
          <Route
            path="/ui/buttons"
            element={
              <>
                <PageTitle title="Buttons | TailAdmin - Tailwind CSS Admin Dashboard Template" />
                <Buttons />
              </>
            }
          />
          <Route
            path="/auth/signin"
            element={
              <>
                <PageTitle title="Signin | TailAdmin - Tailwind CSS Admin Dashboard Template" />
                <SignIn />
              </>
            }
          />
          <Route
            path="/auth/signup"
            element={
              <>
                <PageTitle title="Signup | TailAdmin - Tailwind CSS Admin Dashboard Template" />
                <SignUp />
              </>
            }
          />
        </Route>
      </Routes>
    </>
  );
}

export default App;
