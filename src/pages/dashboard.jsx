import { useState } from "react";
import Layout from "../components/moleculs/layout";

function Dashboard() {
  const [loading, setLoading] = useState(true);

  return (
    <Layout>
      <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 py-8"></div>
    </Layout>
  );
}

export default Dashboard;
