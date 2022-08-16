import Footer from "./componnents/footer";
import Header from "./componnents/header";
import About from "./componnents/about";
import { Routes, Route } from "react-router-dom";
import Home from "./componnents/home";
import SignIn from "./componnents/signin";
import ProtectedRoute from "./componnents/common/protectedrouth";
import DeleteCard from "./componnents/deletecard";
import MyCards from "./componnents/mycard";
import CreateCard from "./componnents/createcard";
import SignUpBiz from "./componnents/signupbiz";
import SignUp from "./componnents/signup";
import LogOut from "./componnents/logout";
import EditCard from "./componnents/edit";

function App() {
  return (
    <div className="App container mt-3 d-flex flex-column min-vh-10">
      <header>
        <Header />
      </header>
      <main className="container flex-fill ">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route
            path="/mycards/delete/:id"
            element={
              <ProtectedRoute isVip>
                <DeleteCard />
              </ProtectedRoute>
            }
          />

          <Route
            path="card/mycards"
            element={
              <ProtectedRoute isVip>
                <MyCards />
              </ProtectedRoute>
            }
          />
          <Route
            path="card/mycards/addCard"
            element={
              <ProtectedRoute isVip>
                <CreateCard />
              </ProtectedRoute>
            }
          />
          <Route path="signupBiz" element={<SignUpBiz redirect="/card/mycards/addCard" />} />
          <Route path="signup" element={<SignUp redirect="/signin" />} />
          <Route path="signin" element={<SignIn redirect="/" />} />
          <Route path="signout" element={<LogOut redirect="/" />} />
        </Routes>
      </main>

      <footer>
        <Footer />
      </footer>
    </div>
  );
}

export default App;
