import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTransactions } from "@/hooks/useTransactions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Helmet } from "react-helmet";
import Header from "@/components/Header.jsx";
import { motion } from "framer-motion";
import { ArrowLeft, Save } from "lucide-react";

const AddTransactionPage = () => {
  const navigate = useNavigate();
  const { addTransaction } = useTransactions();
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    type: "expense",
    amount: "",
    category: "",
    date: new Date().toISOString().split("T")[0],
    note: "",
  });

  const [customCategory, setCustomCategory] = useState("");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const incomeCategories = ["Salary", "Freelance", "Gift", "Other"];
  const expenseCategories = [
    "Food",
    "Travel",
    "Rent",
    "Shopping",
    "Bills",
    "Education",
    "Other",
  ];

  const categories =
    formData.type === "income" ? incomeCategories : expenseCategories;

  /* ------------------ VALIDATION ------------------ */

  const validateForm = () => {
    const newErrors = {};

    if (!formData.amount || Number(formData.amount) <= 0) {
      newErrors.amount = "Amount must be greater than 0";
    }

    if (!formData.category) {
      newErrors.category = "Category is required";
    }

    if (formData.category === "Other" && !customCategory.trim()) {
      newErrors.category = "Please enter a custom category";
    }

    if (!formData.date) {
      newErrors.date = "Date is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /* ------------------ SUBMIT ------------------ */

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      toast({
        title: "Validation Error",
        description: "Please fix the errors in the form.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    try {
      await addTransaction({
        type: formData.type,
        amount: Number(formData.amount),
        category:
          formData.category === "Other"
            ? customCategory.trim()
            : formData.category,
        date: formData.date,
        note: formData.note,
      });

      toast({
        title: "Success",
        description: "Transaction added successfully.",
      });

      navigate("/");
    } catch (err) {
      toast({
        title: "Error",
        description: err.message || "Failed to add transaction.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  /* ------------------ UI ------------------ */

  return (
    <>
      <Helmet>
        <title>Add Transaction - FinanceTracker</title>
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        <Header />

        <div className="max-w-2xl mx-auto px-4 py-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Button
              variant="ghost"
              onClick={() => navigate("/")}
              className="mb-6 text-gray-600"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Dashboard
            </Button>

            <div className="bg-white rounded-2xl shadow-2xl p-8 border">
              <h1 className="text-3xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Add Transaction
              </h1>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Type */}
                <div>
                  <Label>Transaction Type</Label>
                  <Select
                    value={formData.type}
                    onValueChange={(value) =>
                      setFormData({
                        ...formData,
                        type: value,
                        category: "",
                      })
                    }
                  >
                    <SelectTrigger className="h-12 bg-gray-50">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="income">Income</SelectItem>
                      <SelectItem value="expense">Expense</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Amount */}
                <div>
                  <Label>Amount (₹)</Label>
                  <Input
                    type="number"
                    min="0.01"
                    step="0.01"
                    value={formData.amount}
                    onChange={(e) =>
                      setFormData({ ...formData, amount: e.target.value })
                    }
                  />
                  {errors.amount && (
                    <p className="text-red-600 text-sm">{errors.amount}</p>
                  )}
                </div>

                {/* Category */}
                <div>
                  <Label>Category</Label>
                  <Select
                    value={formData.category}
                    onValueChange={(value) =>
                      setFormData({ ...formData, category: value })
                    }
                  >
                    <SelectTrigger className="h-12 bg-gray-50">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((cat) => (
                        <SelectItem key={cat} value={cat}>
                          {cat}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.category && (
                    <p className="text-red-600 text-sm">{errors.category}</p>
                  )}
                </div>

                {/* Custom Category */}
                {formData.category === "Other" && (
                  <div>
                    <Label>Custom Category</Label>
                    <Input
                      value={customCategory}
                      onChange={(e) => setCustomCategory(e.target.value)}
                      placeholder="Enter category name"
                    />
                  </div>
                )}

                {/* Date */}
                <div>
                  <Label>Date</Label>
                  <Input
                    type="date"
                    value={formData.date}
                    onChange={(e) =>
                      setFormData({ ...formData, date: e.target.value })
                    }
                  />
                </div>

                {/* Note */}
                <div>
                  <Label>Note (optional)</Label>
                  <Textarea
                    rows={4}
                    value={formData.note}
                    onChange={(e) =>
                      setFormData({ ...formData, note: e.target.value })
                    }
                  />
                </div>

                {/* Buttons */}
                <div className="flex gap-4 pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => navigate("/")}
                    className="flex-1"
                  >
                    Cancel
                  </Button>

                  <Button
                    type="submit"
                    disabled={loading}
                    className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 text-white"
                  >
                    {loading ? "Saving..." : (
                      <>
                        <Save className="w-5 h-5 mr-2" />
                        Save Transaction
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default AddTransactionPage;