"use client";

import React, { useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Input,
  Button,
} from "@chakra-ui/react";
import { usePostData } from "@/utils/api";
import { useCustomToast } from "@/utils/toast";

const WA_NUMBER = "6282310702343";

const LeadFormModal = ({
  isOpen,
  onClose,
  productTitle = "",
  categoryName = "",
  productUrl = "",
}) => {
  const { postData } = usePostData();
  const { showToast } = useCustomToast();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [pax, setPax] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  const resetForm = () => {
    setName("");
    setPhone("");
    setPax("");
    setErrors({});
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const validate = () => {
    const newErrors = {};
    if (!name.trim()) newErrors.name = "Nama wajib diisi";
    if (!phone.trim()) newErrors.phone = "No HP wajib diisi";
    if (!pax || parseInt(pax, 10) < 1) newErrors.pax = "Jumlah pax minimal 1";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;

    // iOS fix: buka tab SINKRON di dalam gesture tap user dulu,
    // baru diisi URL WA-nya setelah data tersimpan.
    const waWindow = window.open("", "_blank");

    try {
      setIsSubmitting(true);

      await postData("/customer-lead/add", {
        name: name.trim(),
        phone: phone.trim(),
        pax: parseInt(pax, 10),
        categoryName,
        productUrl,
        productTitle,
      });

      if (typeof window !== "undefined" && typeof window.gtag === "function") {
        window.gtag("event", "conversion", {
          send_to: "AW-11485070277/WOKICKb14MkcEMWHweQq",
          value: parseInt(pax, 10) || 1,
          currency: "IDR",
        });
      }

      const waMessage = encodeURIComponent(
        `Halo, saya tertarik dengan paket tour:\n\n` +
          `${productTitle}\n` +
          `Kategori: ${categoryName}\n` +
          `Nama: ${name.trim()}\n` +
          `No. HP: ${phone.trim()}\n` +
          `Jumlah Pax: ${pax}\n\n` +
          `${productUrl}`
      );

      const waUrl = `https://wa.me/${WA_NUMBER}?text=${waMessage}`;

      if (waWindow) {
        // arahkan tab yang sudah terbuka tadi
        waWindow.location.href = waUrl;
      } else {
        // fallback kalau tab tetap diblokir: pindah di tab yang sama
        window.location.href = waUrl;
      }

      showToast({ message: "Data berhasil dikirim!", type: "success" });
      handleClose();
    } catch (error) {
      // tutup tab kosong kalau proses simpan gagal
      if (waWindow) waWindow.close();
      showToast({
        message: error?.response?.data?.message || "Gagal mengirim data",
        type: "error",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} isCentered size="md">
      <ModalOverlay />
      <ModalContent mx={4}>
        <ModalHeader className="text-[#004FC0]">
          Konsultasi Paket Tour
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody className="space-y-4">
          {productTitle && (
            <p className="text-sm text-gray-600 bg-blue-50 p-3 rounded-lg">
              <span className="font-semibold">{productTitle}</span>
              {categoryName && (
                <span className="block text-xs mt-1">{categoryName}</span>
              )}
            </p>
          )}

          <FormControl isInvalid={!!errors.name}>
            <FormLabel>Nama</FormLabel>
            <Input
              placeholder="Masukkan nama Anda"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            {errors.name && (
              <p className="text-red-500 text-xs mt-1">{errors.name}</p>
            )}
          </FormControl>

          <FormControl isInvalid={!!errors.phone}>
            <FormLabel>No. HP / WhatsApp</FormLabel>
            <Input
              placeholder="08xxxxxxxxxx"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            {errors.phone && (
              <p className="text-red-500 text-xs mt-1">{errors.phone}</p>
            )}
          </FormControl>

          <FormControl isInvalid={!!errors.pax}>
            <FormLabel>Jumlah Pax</FormLabel>
            <Input
              type="number"
              min={1}
              placeholder="Contoh: 2"
              value={pax}
              onChange={(e) => setPax(e.target.value)}
            />
            {errors.pax && (
              <p className="text-red-500 text-xs mt-1">{errors.pax}</p>
            )}
          </FormControl>
        </ModalBody>

        <ModalFooter className="gap-2">
          <Button variant="ghost" onClick={handleClose}>
            Batal
          </Button>
          <Button
            bg="#25D366"
            color="white"
            _hover={{ bg: "#1da851" }}
            onClick={handleSubmit}
            isLoading={isSubmitting}
          >
            Lanjut ke WhatsApp
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default LeadFormModal;