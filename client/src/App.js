import { useState } from "react";
import "./App.css";
export default function App() {
  const [prices, setPrices] = useState({
    extreme95: 51.95,
    extreme91: 51.45,
    diesel: 49,
  });

  const [form, setForm] = useState({
    extreme95: { begin: [0, 0, 0, 0], close: [0, 0, 0, 0] },
    extreme91: { begin: [0, 0, 0, 0], close: [0, 0, 0, 0] },
    diesel: { begin: [0, 0, 0, 0], close: [0, 0, 0, 0] },
  });

  const [result, setResult] = useState(null);

  // === Miscellaneous State ===
  const [misc, setMisc] = useState({
    PLB: [""],
    Gcash: [""],
    Pricelocq: [""],
    Card: [""],
    Regasco: [""],
  });

  const handleMiscChange = (type, index, value) => {
    setMisc((prev) => {
      const updated = { ...prev };
      updated[type][index] = value;

      // if last field naay sulod, add new empty input
      if (index === updated[type].length - 1 && value !== "") {
        updated[type].push("");
      }

      return updated;
    });
  };

  const getMiscTotals = () => {
    let totals = {};
    let grand = 0;

    Object.keys(misc).forEach((key) => {
      const sum = misc[key].reduce(
        (acc, v) => acc + (parseFloat(v) || 0),
        0
      );
      totals[key] = sum;
      grand += sum;
    });

    return { totals, grand };
  };

  const handleChange = (type, field, index, value) => {
    const num = parseFloat(value);
    setForm((prev) => {
      const updated = { ...prev };
      updated[type][field][index] = isNaN(num) ? 0 : num;
      return updated;
    });
  };

  const handlePriceChange = (type, value) => {
    const num = parseFloat(value);
    setPrices((prev) => ({
      ...prev,
      [type]: isNaN(num) ? 0 : num,
    }));
  };

  const computeSales = (begin, close, price) => {
    const liters = close.map((c, i) => c - begin[i]);
    const amounts = liters.map((l) => l * price);
    const totalLiters = liters.reduce((a, b) => a + b, 0);
    const totalAmount = amounts.reduce((a, b) => a + b, 0);

    return { liters, amounts, totalLiters, totalAmount };
  };

  const calculate = () => {
    const result95 = computeSales(form.extreme95.begin, form.extreme95.close, prices.extreme95);
    const result91 = computeSales(form.extreme91.begin, form.extreme91.close, prices.extreme91);
    const resultDiesel = computeSales(form.diesel.begin, form.diesel.close, prices.diesel);

    const grandLiters = result95.totalLiters + result91.totalLiters + resultDiesel.totalLiters;
    const grandAmount = result95.totalAmount + result91.totalAmount + resultDiesel.totalAmount;

    setResult({
      extreme95: result95,
      extreme91: result91,
      diesel: resultDiesel,
      grand: { liters: grandLiters, amount: grandAmount },
    });
  };

  const renderTable = (label, data, price, type) => (
    <div className="mb-6 overflow-x-auto">
      <h2 className="text-xl font-bold mb-2">{label} @ ₱{price}</h2>
      <table className="w-full border border-gray-400 text-center min-w-[600px]">
        <thead className="bg-gray-200">
          <tr>
            <th className="p-2">Pump</th>
            <th className="p-2">Beginning</th>
            <th className="p-2">Closing</th>
            <th className="p-2">Sales in Liters</th>
            <th className="p-2">Amount</th>
          </tr>
        </thead>
        <tbody>
          {data.liters.map((lit, i) => (
            <tr key={i} className="border-t">
              <td className="p-2">Pump {i + 1}</td>
              <td className="p-2">{form[type].begin[i]}</td>
              <td className="p-2">{form[type].close[i]}</td>
              <td className="p-2">{lit.toFixed(3)}</td>
              <td className="p-2">₱{data.amounts[i].toFixed(2)}</td>
            </tr>
          ))}
          <tr className="font-bold bg-gray-100 border-t">
            <td colSpan={3} className="p-2">TOTAL</td>
            <td className="p-2">{data.totalLiters.toFixed(3)}</td>
            <td className="p-2">₱{data.totalAmount.toFixed(2)}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );

  const miscTotals = getMiscTotals();

  return (
    <div className="p-4 sm:p-6 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-center">Fuel Sales Inventory</h1>

      {/* Fuel Section */}
      {["extreme95", "extreme91", "diesel"].map((type) => (
        <div key={type} className="mb-6 border p-4 rounded-lg shadow-sm">
          <h2 className="text-lg font-semibold mb-2">{type.toUpperCase()}</h2>

          {/* Editable Price */}
          <div className="mb-3">
            <label className="block font-medium mb-1">Price per Liter:</label>
            <input
              type="number"
              step="0.01"
              value={prices[type]}
              onChange={(e) => handlePriceChange(type, e.target.value)}
              className="border p-2 rounded w-full sm:w-48"
            />
          </div>

          {/* Beginning & Closing */}
          {["begin", "close"].map((field) => (
            <div key={field} className="mb-3">
              <p className="font-medium mb-1">{field.toUpperCase()}:</p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[0, 1, 2, 3].map((i) => (
                  <div key={i} className="flex flex-col">
                    <label className="text-sm mb-1">Pump {i + 1}</label>
                    <input
                      type="number"
                      value={form[type][field][i]}
                      placeholder={`Pump ${i + 1}`}
                      className="border p-2 rounded w-full"
                      onChange={(e) => handleChange(type, field, i, e.target.value)}
                    />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      ))}

      <button
        onClick={calculate}
        className="bg-blue-600 text-white px-6 py-2 rounded-lg w-full sm:w-auto"
      >
        Calculate
      </button>

      {/* Results */}
      {result && (
        <div className="mt-8">
          {renderTable("Extreme 95", result.extreme95, prices.extreme95, "extreme95")}
          {renderTable("Extreme 91", result.extreme91, prices.extreme91, "extreme91")}
          {renderTable("Diesel", result.diesel, prices.diesel, "diesel")}

          <div className="p-4 bg-green-100 rounded-lg mt-6 text-center sm:text-left">
            <h2 className="text-xl font-bold">OVERALL SALES</h2>
            <p>Total Liters: {result.grand.liters.toFixed(3)}</p>
            <p>Total Amount: ₱{result.grand.amount.toFixed(2)}</p>
          </div>
        </div>
      )}

      {/* === Miscellaneous Section === */}
      <div className="mt-10 border p-4 rounded-lg shadow-sm bg-white">
        <h2 className="text-xl font-bold mb-4">Miscellaneous Payments</h2>

        {Object.keys(misc).map((key) => (
          <div key={key} className="mb-4">
            <h3 className="font-semibold mb-2">{key}</h3>
            <div className="flex flex-wrap gap-2">
              {misc[key].map((val, i) => (
                <input
                  key={i}
                  type="number"
                  placeholder={`${key} amount`}
                  value={val}
                  onChange={(e) => handleMiscChange(key, i, e.target.value)}
                  className="border p-2 rounded w-32"
                />
              ))}
            </div>
            <p className="mt-2 font-medium">Total {key}: ₱{miscTotals.totals[key].toFixed(2)}</p>
          </div>
        ))}

        <div className="p-4 bg-green-100 rounded-lg text-center sm:text-left">
          <h2 className="text-lg font-bold">Miscellaneous Total</h2>
          <p>₱{miscTotals.grand.toFixed(2)}</p>
        </div>
      </div>
    </div>
  );
}
