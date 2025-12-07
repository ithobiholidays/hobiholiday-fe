import Hero from "@/components/Hero";
import Packages from "@/views/home/Packages";
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
} from "@chakra-ui/react";

import Image from "next/image";
import { FaWhatsapp } from "react-icons/fa";
import { RiArrowRightLine, RiMailLine } from "react-icons/ri";

export const metadata = {
  title: "Hobi Holidays : Terms And Conditions",
  description:
    "Wujudkan mimpimu berkunjung ke negeri asing bersama Hobi Holidays",
};

export default function TermsAndConditions() {
  const items = [
    { title: "Penyedia Layanan Perjalanan Pihak Ketiga", content: "" },
    { title: "Kebijakan Privasi", content: "" },
    { title: "Penggunaan Situs", content: "" },
    { title: "Tidak Ada Penjaminan", content: "" },
    { title: "Pembatasan dan Pertanggungjawaban", content: "" },
    { title: "Harga Layanan", content: "" },
    { title: "Biaya Tambahan Hotel", content: "" },
    { title: "Mata Uang", content: "" },
    { title: "Pembatalan", content: "" },
    { title: "Ganti Rugi", content: "" },
    { title: "Permintaan Khusus", content: "" },
    { title: "Perubahan Pemesanan dan Pembelian", content: "" },
    { title: "Syarat dan Kondisi Produk dan Layanan", content: "" },
    { title: "Paspor, Visa dan Informasi Kesehatan", content: "" },
    { title: "Force Majeure", content: "" },
    { title: "Modifikasi dan Perubahan Ketentuan Kerahasiaan", content: "" },
  ];

  return (
    <div className="flex flex-col gap-y-24 w-full">
      <Hero title="Terms And Conditions" image={"/t&c.png"} />

      <div className="lg:px-24 md:px-12 px-4 flex flex-col gap-6">
        <h3 className="lg:text-3xl text-2xl font-bold text-blue-700">
          Syarat dan Ketentuan
        </h3>
        <p className=" leading-loose">
          www.hobiholidays.com (untuk selanjutnya disebut “Web”) dimiliki dan
          dioperasikan oleh PT Semesta Hobi Wisata (untuk selanjutnya disebut
          “Perusahaan”). Web merupakan layanan yang memberikan informasi secara
          umum dan khusus kepada masyarakat yang menggunakan jasa dan/atau
          mengakses Web (untuk selanjutnya disebut “Pelanggan”) dan menjadi aset
          Perusahaan yang terpenting adalah menjaga hubungan Perusahaan dengan
          Pelanggan, demikian berkaitan dengan informasi-informasi pribadi yang
          Pelanggan berikan (untuk selanjutnya disebut “Data Pribadi”).
          Berkaitan dengan Data Pribadi tersebut, berikut Perusahaan jelaskan
          bagaimana pengumpulan, penggunaan, serta pemrosesan informasi yang
          Perusahaan kumpulkan tentang Data Pribadi yang dapat diidentifikasi
          secara pribadi terkait dengan layanan yang tersedia melalui Web.
        </p>
        <p className=" leading-loose">
          Dengan memberikan dan memasukan Data Pribadi ke dalam Web, Pelanggan
          secara sadar telah setuju untuk memberikan Data Pribadi kepada
          Perusahaan untuk digunakan demi kepentingan dan tujuan Pelanggan dalam
          menggunakan Web. Persetujuan yang diberikan Pelanggan dimaksud
          merupakan persetujuan yang diberikan secara tegas yang disampaikan
          secara elektronik.
        </p>
        <p className=" leading-loose">
          Kami tidak dapat menjamin bahwa harga pemesanan yang tertera dalam
          situs ini tidak akan terdapat gangguan atau kesalahan sistem yang
          menyebabkan harga pemesanan tersebut tidak akurat atau tidak sesuai
          dengan harga yang wajar dan menyebabkan ada kekeliruan pengguna saat
          melakukan pemesanan dengan harga tidak wajar tersebut, dan jika hal
          tersebut terjadi dan pengguna sudah melakukan pembayaran, maka kami
          tetap berhak untuk melakukan pembatalan sepihak dan hanya menjamin
          pengembalian dana (refund) kepada pengguna situs ini.
        </p>

        <Accordion defaultIndex={[0]} allowMultiple>
          {items.map((item) => (
            <AccordionItem key={item.title}>
              <h2>
                <AccordionButton>
                  <Box
                    as="span"
                    flex="1"
                    textAlign="left"
                    className="text-blue-700 text-lg"
                  >
                    {item.title}
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4}>{item.content}</AccordionPanel>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
}
