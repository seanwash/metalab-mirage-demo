import React from "react";
import DefaultLayout from "../src/layout/Default";
import IndexPage from "./page/index";

function App() {
  return (
    <DefaultLayout>
      {/* TODO: Add React Router */}
      <IndexPage />
    </DefaultLayout>
  );
}

export default App;
