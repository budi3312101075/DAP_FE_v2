import { AlertCircle, RefreshCw } from "lucide-react";

const ErrorMassage = (props) => {
  return (
    <div className="flex justify-center ">
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-xl w-full mx-auto">
        <div className="flex items-center justify-center w-16 h-16 mx-auto bg-red-100 rounded-full mb-4">
          <AlertCircle className="w-8 h-8 text-red-600" />
        </div>
        <h3 className="text-xl font-bold text-gray-900 text-center mb-2">
          Error Loading Data
        </h3>
        <p className="text-gray-600 text-center mb-6">{props.error}</p>
        <button
          onClick={props.fetchMonthlyTrend}
          className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition flex items-center justify-center gap-2"
        >
          <RefreshCw className="w-4 h-4" />
          Retry
        </button>
      </div>
    </div>
  );
};

export default ErrorMassage;
