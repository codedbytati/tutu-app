"use client";

import { useState } from 'react'
import { data } from "@/utils/data";
import { ExtractItem } from '@/utils/types';

import { parseMoneyToNumber, formatMoneyForStorage } from "@/utils/money";

const toSignedAmount = (type: ExtractItem["type"], amount: string) => {
  const parsedAmount = parseMoneyToNumber(amount);

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
    const deletedItem = extracts.find((item) => item.id === id);

    if (!deletedItem) {
      return;
    }

    const parsed = parseMoneyToNumber(deletedItem.amount);

    setExtracts((current) => current.filter((item) => item.id !== id));
    setBalance((current) => {
      const currentAmount = parseMoneyToNumber(current);
      const updatedBalance =
        deletedItem.type === "INCOME"
          ? currentAmount - parsed
          : currentAmount + parsed;

      return formatMoneyForStorage(updatedBalance);
    });
  };

  const handleAddTransaction = (transaction: ExtractItem) => {
    const amount = parseMoneyToNumber(transaction.amount);

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
      const currentAmount = parseMoneyToNumber(current);
      const updatedBalance =
        transaction.type === "INCOME"
          ? currentAmount + amount
          : currentAmount - amount;

      return formatMoneyForStorage(updatedBalance);
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

    const previousTransaction = extracts.find((item) => item.id === normalizedTransaction.id);

    if (!previousTransaction) {
      return;
    }

    const nextSignedAmount = toSignedAmount(normalizedTransaction.type, normalizedTransaction.amount);
    const previousSignedAmount = toSignedAmount(previousTransaction.type, previousTransaction.amount);

    setExtracts((current) => {
      return current.map((item) => {
        if (item.id !== normalizedTransaction.id) {
          return item;
        }

        return {
          ...item,
          ...normalizedTransaction,
          amount: formatMoneyForStorage(normalizedTransaction.amount),
        };
      });
    });

    setBalance((currentBalance) => {
      const currentAmount = parseMoneyToNumber(currentBalance);
      const updatedBalance = currentAmount - previousSignedAmount + nextSignedAmount;

      return formatMoneyForStorage(updatedBalance);
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
