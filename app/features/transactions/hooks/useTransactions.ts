"use client";

import { useState } from "react";
import { data } from "@/utils/data";
import { ExtractItem } from '@/utils/types';

const amountConverter = (value: string) => {
  return Number(value.replace(",", ".").replace(/[^\d.-]/g, "")) || 0;
};

const toSignedAmount = (type: ExtractItem["type"], amount: string) => {
  const parsedAmount = amountConverter(amount);

  return type === "INCOME" ? parsedAmount : -parsedAmount;
};

const toInputDate = (date: string) => {
  const [day, month, year] = date.split("/");

  if (!day || !month || !year) {
    return date;
  }

  return `${year}-${month}-${day}`;
};

export const useTransactions = () => {
  const [mode, setMode] = useState<"none" | "add" | "edit" | "delete">("none");
  const [extracts, setExtracts] = useState(data.extract);
  const [balance, setBalance] = useState(data.totalBalance);
  const [selectedTransactionId, setSelectedTransactionId] = useState<number | null>(null);

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

  const handleAddTransaction = (transaction: ExtractItem) => {
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

  const handleEditTransaction = (transaction: ExtractItem) => {
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
  };

  const [transaction, setTransaction] = useState<ExtractItem>({
    id: 0,
    description: "",
    type: "EXPENSE",
    amount: "",
    date: "",
    category: 'Outros',
  });

  const resetForm = () => {
    setTransaction({
      id: 0,
      description: "",
      type: "EXPENSE",
      amount: "",
      date: "",
      category: 'Outros',
    });
  };

  const handleClose = () => {
    setMode("none");
    setSelectedTransactionId(null);
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
      category: transaction.category,
    });

    handleClose();
  };

  const handleOpenEdit = (item: ExtractItem) => {
    setSelectedTransactionId(item.id);
    setTransaction({
      id: item.id,
      category: item.category,
      description: item.description,
      type: item.type,
      amount: item.amount,
      date: toInputDate(item.date),
    });
    setMode("edit");
  };

  const handleOpenDelete = (id: number) => {
    setSelectedTransactionId(id);
    setMode("delete");
  };

  const handleSaveEdit = () => {
    if (
      selectedTransactionId === null ||
      !transaction.date ||
      !transaction.type ||
      !transaction.description.trim() ||
      !transaction.amount.trim()
    ) {
      return;
    }

    handleEditTransaction({
      ...transaction,
      id: selectedTransactionId,
    });

    handleClose();
  };

  const handleConfirmDelete = () => {
    if (selectedTransactionId === null) {
      return;
    }

    handleDeleteTransaction(selectedTransactionId);
    handleClose();
  };

  return {
    onOpenEdit: handleOpenEdit,
    onOpenDelete: handleOpenDelete,
    onAddTransactionProps: {
      transaction,
      setTransaction,
      open: mode === "add",
      onOpen: () => setMode("add"),
      onAdd: handleSave,
      onClose: handleClose,
    },
    onEditTransactionProps: {
      transaction,
      setTransaction,
      open: mode === "edit",
      onAdd: handleSaveEdit,
      onClose: handleClose,
    },
    onDeleteTransactionProps: {
      open: mode === "delete",
      onDelete: handleConfirmDelete,
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
