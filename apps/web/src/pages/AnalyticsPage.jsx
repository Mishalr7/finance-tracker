import React, { useState, useEffect } from "react";
import { useTransactions } from "@/hooks/useTransactions";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Helmet } from "react-helmet";
import Header from "@/components/Header.jsx";
import { motion } from "framer-motion";
import { BarChart3, PieChart } from "lucide-react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar, Pie } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const AnalyticsPage = () => {
  const { fetchTransactions } = useTransactions();
  const { toast } = useToast();

  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  const [dateRange, setDateRange] = useState({
    from: new Date(new Date().getFullYear(), new Date().getMonth(), 1)
      .toISOString()
      .split("T")[0],
    to: new Date().toISOString().split("T")[0],
  });

  const loadTransactions = async () => {
    setLoading(true);
    try {
      const data = await fetchTransactions();

      const filtered = data.filter((tx) => {
        const txDate = new Date(tx.date);
        const from = new Date(dateRange.from);
        const to = new Date(dateRange.to);
        return txDate >= from && txDate <= to;
      });

      setTransactions(filtered);
    } catch {
      toast({
        title: "Error",
        description: "Failed to load analytics data.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTransactions();
  }, [dateRange]);

  /* ------------------ DATA TRANSFORMS ------------------ */

  const getMonthlyChartData = () => {
    const income = {};
    const expense = {};

    transactions.forEach((tx) => {
      const date = new Date(tx.date);
      const label = `${date.toLocaleString("default", {
        month: "short",
      })} ${date.getFullYear()}`;

      if (tx.type === "income") {
        income[label] = (income[label] || 0) + tx.amount;
      } else {
        expense[label] = (expense[label] || 0) + tx.amount;
      }
    });

    const labels = [...new Set([...Object.keys(income), ...Object.keys(expense)])];

    return {
      labels,
      datasets: [
        {
          label: "Income",
          data: labels.map((l) => income[l] || 0),
          backgroundColor: "rgba(34,197,94,0.8)",
        },
        {
          label: "Expenses",
          data: labels.map((l) => expense[l] || 0),
          backgroundColor: "rgba(239,68,68,0.8)",
        },
      ],
    };
  };

  const getCategoryChartData = () => {
    const categories = {};

    transactions
      .filter((t) => t.type === "expense")
      .forEach((tx) => {
        categories[tx.category] =
          (categories[tx.category] || 0) + tx.amount;
      });

    return {
      labels: Object.keys(categories),
      datasets: [
        {
          data: Object.values(categories),
          backgroundColor: [
            "#3b82f6",
            "#ef4444",
            "#22c55e",
            "#f59e0b",
            "#a855f7",
            "#ec4899",
            "#0ea5e9",
          ],
        },
      ],
    };
  };

  /* ------------------ CHART OPTIONS ------------------ */

  const barOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      title: {
        display: true,
        text: "Monthly Income vs Expenses",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: (v) => "₹" + v.toLocaleString("en-IN"),
        },
      },
    },
  };

  const pieOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: "right" },
    },
  };

  return (
    <>
      <Helmet>
        <title>Analytics - FinanceTracker</title>
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        <Header />

        <div className="max-w-7xl mx-auto px-4 py-8">
          <h1 className="text-4xl font-bold mb-8 text-center bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Analytics
          </h1>

          {/* Date Filters */}
          <div className="bg-white rounded-2xl shadow-xl p-6 mb-6 border">
            <h2 className="text-lg font-semibold mb-4">Date Range</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label>From</Label>
                <Input
                  type="date"
                  value={dateRange.from}
                  onChange={(e) =>
                    setDateRange({ ...dateRange, from: e.target.value })
                  }
                />
              </div>
              <div>
                <Label>To</Label>
                <Input
                  type="date"
                  value={dateRange.to}
                  onChange={(e) =>
                    setDateRange({ ...dateRange, to: e.target.value })
                  }
                />
              </div>
            </div>
          </div>

          {/* Content */}
          {loading ? (
            <div className="flex justify-center py-12">
              <div className="animate-spin h-12 w-12 border-b-2 border-blue-600 rounded-full" />
            </div>
          ) : transactions.length === 0 ? (
            <div className="bg-white rounded-2xl shadow-xl p-12 text-center">
              No data for selected range
            </div>
          ) : (
            <div className="space-y-6">
              <div className="bg-white rounded-2xl shadow-xl p-6 h-96">
                <div className="flex items-center gap-2 mb-4">
                  <BarChart3 className="text-blue-600" />
                  <h2 className="text-xl font-semibold">
                    Monthly Overview
                  </h2>
                </div>
                <Bar data={getMonthlyChartData()} options={barOptions} />
              </div>

              <div className="bg-white rounded-2xl shadow-xl p-6 h-96">
                <div className="flex items-center gap-2 mb-4">
                  <PieChart className="text-blue-600" />
                  <h2 className="text-xl font-semibold">
                    Expense Breakdown
                  </h2>
                </div>
                <Pie data={getCategoryChartData()} options={pieOptions} />
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default AnalyticsPage;