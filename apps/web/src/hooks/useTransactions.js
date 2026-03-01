import { useState, useCallback } from "react";

const API_URL = "http://localhost:5000/api/transactions";

export const useTransactions = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getAuthHeader = () => ({
    Authorization: `Bearer ${localStorage.getItem("token")}`,
    "Content-Type": "application/json",
  });

  const fetchTransactions = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(API_URL, {
        headers: getAuthHeader(),
      });
      if (!res.ok) throw new Error("Failed to fetch transactions");
      return await res.json();
    } finally {
      setLoading(false);
    }
  }, []);

  const addTransaction = useCallback(async (data) => {
    setLoading(true);
    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: getAuthHeader(),
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Failed to add transaction");
      return await res.json();
    } finally {
      setLoading(false);
    }
  }, []);

  const deleteTransaction = useCallback(async (id) => {
    setLoading(true);
    try {
      await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
        headers: getAuthHeader(),
      });
    } finally {
      setLoading(false);
    }
  }, []);

  const calculateTotals = (transactions) => {
    const income = transactions.filter(t => t.type === "income")
      .reduce((s, t) => s + t.amount, 0);
    const expenses = transactions.filter(t => t.type === "expense")
      .reduce((s, t) => s + t.amount, 0);
    return { income, expenses, balance: income - expenses };
  };

  return {
    loading,
    error,
    fetchTransactions,
    addTransaction,
    deleteTransaction,
    calculateTotals,
  };
};