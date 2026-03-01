import React, { useState, useEffect } from "react";
import { useTransactions } from "@/hooks/useTransactions";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Helmet } from "react-helmet";
import Header from "@/components/Header.jsx";
import { motion } from "framer-motion";
import {
  Trash2,
  ArrowUpCircle,
  ArrowDownCircle,
} from "lucide-react";

const TransactionHistoryPage = () => {
  const { fetchTransactions, deleteTransaction } = useTransactions();
  const { toast } = useToast();

  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadTransactions = async () => {
    setLoading(true);
    try {
      const data = await fetchTransactions();
      setTransactions(data);
    } catch {
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
    loadTransactions();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this transaction?")) return;

    try {
      await deleteTransaction(id);
      toast({
        title: "Deleted",
        description: "Transaction removed successfully.",
      });
      loadTransactions();
    } catch {
      toast({
        title: "Error",
        description: "Failed to delete transaction.",
        variant: "destructive",
      });
    }
  };

  const formatDate = (date) =>
    new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });

  const formatAmount = (amount) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
    }).format(amount);

  return (
    <>
      <Helmet>
        <title>Transaction History - FinanceTracker</title>
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        <Header />

        <div className="max-w-6xl mx-auto px-4 py-8">
          <h1 className="text-4xl font-bold mb-8 text-center bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Transaction History
          </h1>

          <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
            {loading ? (
              <div className="flex justify-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600" />
              </div>
            ) : transactions.length === 0 ? (
              <div className="text-center py-12 text-gray-500">
                No transactions yet
              </div>
            ) : (
              <div className="space-y-4">
                {transactions.map((tx) => (
                  <motion.div
                    key={tx._id}
                    whileHover={{ scale: 1.01 }}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border"
                  >
                    <div className="flex items-center gap-3">
                      {tx.type === "income" ? (
                        <ArrowUpCircle className="text-green-600" />
                      ) : (
                        <ArrowDownCircle className="text-red-600" />
                      )}
                      <div>
                        <p className="font-semibold">{tx.category}</p>
                        <p className="text-sm text-gray-500">
                          {formatDate(tx.date)}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <p
                        className={`font-bold ${
                          tx.type === "income"
                            ? "text-green-600"
                            : "text-red-600"
                        }`}
                      >
                        {tx.type === "income" ? "+" : "-"}
                        {formatAmount(tx.amount)}
                      </p>

                      <Button
                        size="sm"
                        variant="ghost"
                        className="text-red-600"
                        onClick={() => handleDelete(tx._id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default TransactionHistoryPage;