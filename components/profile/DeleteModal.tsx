"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

interface DeleteAccountModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDelete: () => Promise<void>;
}

const DeleteAccountModal = ({
  isOpen,
  onClose,
  onDelete,
}: DeleteAccountModalProps) => {
  //   const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    setLoading(true);
    await onDelete();
    setLoading(false);
    onClose();
    // setIsOpen(false);
  };
  // if (!open) return null;
  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-lg">
            <h3 className="mb-4 text-lg font-bold text-destructive">
              Confirm Account Deletion
            </h3>
            <p className="mb-6 text-sm text-muted-foreground">
              Are you sure you want to delete your account? This action cannot
              be undone.
            </p>
            <div className="flex justify-end gap-4">
              <Button variant="outline" onClick={onClose} disabled={loading}>
                Cancel
              </Button>
              <Button
                variant="destructive"
                onClick={handleDelete}
                disabled={loading}
              >
                {loading ? "Deleting..." : "Delete"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DeleteAccountModal;
