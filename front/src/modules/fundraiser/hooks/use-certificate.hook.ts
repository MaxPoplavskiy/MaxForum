import type React from "react";
import { useCallback, useState } from "react";
import { pdfService } from "../../../services/pdf/pdf.service";

type Return = {
  isDialogOpen: boolean;
  close: () => void;
  open: () => void;
  getCertificate: () => void;
};

export const useCertificate = (
  ref: React.RefObject<HTMLDivElement>,
  certificateOpen?: boolean
): Return => {
  const [isDialogOpen, setIsDialogOpen] = useState(Boolean(certificateOpen));

  function close(): void {
    setIsDialogOpen(false);
  }

  function open(): void {
    setIsDialogOpen(true);
  }

  const getCertificate = useCallback((): void => {
    if (ref.current) {
      pdfService.getCertificate(ref.current);
    }
  }, [ref]);

  return {
    isDialogOpen,
    close,
    open,
    getCertificate,
  };
};
