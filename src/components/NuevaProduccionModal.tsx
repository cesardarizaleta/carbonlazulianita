import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import {
  ProduccionForm,
  ProduccionFormData,
} from "@/features/produccion/components/ProduccionForm";
import { useProduccion } from "@/features/produccion/hooks/useProduccion";

interface NuevaProduccionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function NuevaProduccionModal({ isOpen, onClose }: NuevaProduccionModalProps) {
  // Pass enabled: false so we don't fetch the list here, we just want 'create'
  const { create, isCreating } = useProduccion(1, false);

  const handleCreate = async (data: ProduccionFormData) => {
    try {
      await create(data);
      onClose();
    } catch (_e) {
      // Error handled in hook toast
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={open => !open && onClose()}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>Registrar Nueva Producción</DialogTitle>
        </DialogHeader>
        <ProduccionForm onSubmit={handleCreate} isLoading={isCreating} onCancel={onClose} />
      </DialogContent>
    </Dialog>
  );
}
