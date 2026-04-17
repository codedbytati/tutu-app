"use client";

import { useState } from "react";
import { data } from "@/utils/data";

export type NewTransactionInput = {
  id: number;
  description: string;
  type: "EXPENSE" | "INCOME";
  amount: string;
  date: string;
};

const amountConverter = (value: string) => {
  return Number(value.replace(",", ".").replace(/[^\d.-]/g, "")) || 0;
};

const toSignedAmount = (type: NewTransactionInput["type"], amount: string) => {
  const parsedAmount = amountConverter(amount);

  return type === "INCOME" ? parsedAmount : -parsedAmount;
};

export const useTransactions = () => {
  const [mode, setMode] = useState<"none" | "add" | "edit" | "delete">("none");
  const [extracts, setExtracts] = useState(data.extract);
  const [balance, setBalance] = useState(data.balance);

  const handleDeleteTransaction = (id: number) => {
    setExtracts((current) => {
      const deletedItem = current.find((item) => item.id === id);
      if (deletedItem) {
        const parsed = amountConverter(deletedItem.amount);
        setBalance((current) => {
          const currentAmount = amountConverter(current);
          const updatedBalance =
            deletedItem.type === "INCOME"
              ? currentAmount - parsed
              : currentAmount + parsed;

          return updatedBalance.toFixed(2);
        });
      }
      return current.filter((item) => item.id !== id);
    });
  };

  const handleAddTransaction = (transaction: NewTransactionInput) => {
    const amount = amountConverter(transaction.amount);

    setExtracts((current) => {
      const nextId =
        current.length > 0
          ? Math.max(...current.map((item) => item.id)) + 1
          : 1;

      return [
        { ...transaction, id: nextId, amount: amount.toFixed(2) },
        ...current,
      ];
    });

    setBalance((current) => {
      const currentAmount = amountConverter(current);
      const updatedBalance =
        transaction.type === "INCOME"
          ? currentAmount + amount
          : currentAmount - amount;

      return updatedBalance.toFixed(2);
    });
  };

  const formatDate = (rawDate: string) => {
    const [year, month, day] = rawDate.split("-");

    if (!year || !month || !day) {
      return rawDate;
    }

    return `${day}/${month}/${year}`;
  };

  const handleEditTransaction = (transaction: NewTransactionInput) => {
    const normalizedTransaction = {
      ...transaction,
      description: transaction.description.trim(),
      amount: transaction.amount.trim(),
      date: formatDate(transaction.date),
    };

    const nextSignedAmount = toSignedAmount(normalizedTransaction.type, normalizedTransaction.amount);

    setExtracts((current) => {
      const previousTransaction = current.find((item) => item.id === normalizedTransaction.id);

      if (!previousTransaction) {
        return current;
      }

      const previousSignedAmount = toSignedAmount(previousTransaction.type, previousTransaction.amount);

      setBalance((currentBalance) => {
        const currentAmount = amountConverter(currentBalance);
        const updatedBalance = currentAmount - previousSignedAmount + nextSignedAmount;

        return updatedBalance.toFixed(2);
      });

      return current.map((item) => {
        if (item.id !== normalizedTransaction.id) {
          return item;
        }

        return {
          ...item,
          ...normalizedTransaction,
          amount: amountConverter(normalizedTransaction.amount).toFixed(2),
        };
      });
    });

    handleClose();
  };

  const [transaction, setTransaction] = useState<NewTransactionInput>({
    id: 0,
    description: "",
    type: "EXPENSE",
    amount: "",
    date: "",
  });

  const resetForm = () => {
    setTransaction({
      id: 0,
      description: "",
      type: "EXPENSE",
      amount: "",
      date: "",
    });
  };

  const handleClose = () => {
    setMode("none");
    resetForm();
  };

  const handleSave = () => {
    if (
      !transaction.date ||
      !transaction.type ||
      !transaction.description.trim() ||
      !transaction.amount.trim()
    ) {
      return;
    }

    handleAddTransaction({
      id: 0,
      date: formatDate(transaction.date),
      type: transaction.type,
      description: transaction.description.trim(),
      amount: transaction.amount.trim(),
    });

    handleClose();
  };

  return {
    onOpenEdit: () => setMode("edit"),
    onOpenDelete: () => setMode("delete"),
    onAddTransactionProps: {
      transaction,
      setTransaction,
      open: mode === "add",
      onOpen: () => setMode("add"),
      onAdd: handleSave,
      onClose: handleClose,
    },
    mode,
    extracts,
    balance: balance,
    onDelete: handleDeleteTransaction,
    onEdit: handleEditTransaction,
    onAdd: handleSave,
    onClose: handleClose,
  };
};
