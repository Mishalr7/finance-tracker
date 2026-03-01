import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTransactions } from "@/hooks/useTransactions";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Helmet } from "react-helmet";
import Header from "@/components/Header.jsx";
import TransactionCard from "@/components/TransactionCard.jsx";
import { motion } from "framer-motion";
import {
  Plus,
  TrendingUp,
  TrendingDown,
  Wallet,
  ArrowRight,
} from "lucide-react";

const HomePage = () => {
  const navigate = useNavigate();
  const { fetchTransactions, calculateTotals } = useTransactions();
  const { toast } = useToast();

  const [transactions, setTransactions] = useState([]);
  const [recentTransactions, setRecentTransactions] = useState([]);
  const [totals, setTotals] = useState({
    income: 0,
    expenses: 0,
    balance: 0,
  });
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    setLoading(true);
    try {
      const data = await fetchTransactions();

      setTransactions(data);
      setRecentTransactions(data.slice(0, 5));
      setTotals(calculateTotals(data));
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load transactions.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const formatAmount = (amount) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 2,
    }).format(amount);
  };

  const StatCard = ({ title, amount, icon: Icon, color }) => (
    <motion.div
      whileHover={{ scale: 1.02, y: -4 }}
      transition={{ duration: 0.2 }}
      className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100"
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-gray-600 font-medium">{title}</h3>
        <div
          className={`p-3 rounded-xl ${
            color === "green"
              ? "bg-green-100"
              : color === "red"
              ? "bg-red-100"
              : "bg-blue-100"
          }`}
        >
          <Icon
            className={`w-6 h-6 ${
              color === "green"
                ? "text-green-600"
                : color === "red"
                ? "text-red-600"
                : "text-blue-600"
            }`}
          />
        </div>
      </div>
      <p
        className={`text-3xl font-bold ${
          color === "green"
            ? "text-green-600"
            : color === "red"
            ? "text-red-600"
            : totals.balance >= 0
            ? "text-green-600"
            : "text-red-600"
        }`}
      >
        {formatAmount(amount)}
      </p>
    </motion.div>
  );

  return (
    <>
      <Helmet>
        <title>Dashboard - FinanceTracker</title>
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        <Header />

        <div className="max-w-7xl mx-auto px-4 py-8">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-12 text-center"
          >
            <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent mb-4">
              Your Financial Dashboard
            </h1>
            <p className="text-gray-600 text-lg">
              Track, manage, and grow your wealth
            </p>
          </motion.div>

          {loading ? (
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
          ) : (
            <>
              {/* Stats */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                <StatCard
                  title="Total Balance"
                  amount={totals.balance}
                  icon={Wallet}
                  color={totals.balance >= 0 ? "green" : "red"}
                />
                <StatCard
                  title="Total Income"
                  amount={totals.income}
                  icon={TrendingUp}
                  color="green"
                />
                <StatCard
                  title="Total Expenses"
                  amount={totals.expenses}
                  icon={TrendingDown}
                  color="red"
                />
              </div>

              {/* Recent Transactions */}
              <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">
                Recent Transactions
               </h2>

              <Button
               onClick={() => navigate('/add-transaction')}
                 className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg"
                >
                 + Add Transaction
                </Button>
               </div>

                {recentTransactions.length === 0 ? (
                  <div className="text-center py-12">
                    <Wallet className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500 text-lg mb-4">
                      No transactions yet
                    </p>
                    <Button
                      onClick={() => navigate("/add-transaction")}
                      className="bg-gradient-to-r from-blue-600 to-indigo-600"
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Add Your First Transaction
                    </Button>
                  </div>
                ) : (
                  <>
                    <div className="space-y-4 mb-6">
                      {recentTransactions.map((transaction) => (
                        <TransactionCard
                          key={transaction._id}
                          transaction={transaction}
                        />
                      ))}
                    </div>

                    {transactions.length > 5 && (
                      <div className="text-center pt-4 border-t border-gray-200">
                        <Button
                          onClick={() => navigate("/history")}
                          variant="outline"
                          className="text-blue-600 border-blue-200 hover:bg-blue-50"
                        >
                          View All Transactions
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                      </div>
                    )}
                  </>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default HomePage;