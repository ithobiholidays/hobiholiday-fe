import Hero from "@/components/Hero";
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
} from "@chakra-ui/react";

export default function Faq() {
  const items = [
    { title: "Tour", content: "" },
    { title: "Hotel", content: "" },
    { title: "Flights", content: "" },
    { title: "Dokumen", content: "" },
  ];

  return (
    <div className="flex flex-col gap-y-24 w-full">
      <Hero title="Frequently Asked Question" image={"/faq.png"} />

      <div className="lg:px-24 md:px-12 px-4 flex flex-col gap-6">
        <h5 className="text-2xl text-[#004FC0] font-medium">General</h5>

        <div className="space-y-6">
          {/* Question 1 */}
          <div>
            <p className="font-semibold text-lg">
              Q : Dimana saya bisa melakukan pemesanan produk Hobi Holidays
              Tour?
            </p>
            <p className="mt-1">
              <span className="font-semibold">A :</span> <br /> Anda dapat
              melakukan pemesanan produk kami melalui website Hobi Holidays
              untuk diteruskan ke whatsapp. Anda juga dapat datang ke Kantor
              pusat dan kantor cabang Hobi Holidays Tour. Alamat Kantor pusat
              dan kantor cabang Hobi Holidays Tour dapat anda lihat di bawah.
            </p>
          </div>

          {/* Question 2 */}
          <div>
            <p className="font-semibold text-lg">
              Q : Apakah saya bisa melakukan pemesanan tanpa menggunakan email?
            </p>
            <p className="mt-1">
              <span className="font-semibold">A :</span> <br /> Anda dapat
              melakukan pemesanan secara langsung dengan datang ke Kantor pusat
              dan kantor cabang Hobi Holidays Tour. Alamat Kantor pusat dan
              kantor cabang Hobi Holidays Tour dapat anda lihat di bawah.
            </p>
          </div>

          {/* Question 3 */}
          <div>
            <p className="font-semibold text-lg">
              Q : Metode pembayaran apa saja yang tersedia di Hobi Holidays
              Tour?
            </p>
            <p className="mt-1">
              <span className="font-semibold">A :</span> <br /> Anda dapat
              melakukan pembayaran dengan berbagai metode di Hobi Holidays Tour,
              baik melalui website ataupun datang secara langsung ke Kantor Hobi
              Holidays Tour.
            </p>
          </div>
        </div>

        <Accordion defaultIndex={[0]} allowMultiple gap={4}>
          {items.map((item) => (
            <AccordionItem key={item.title}>
              <h2>
                <AccordionButton className="border-none">
                  <Box
                    as="span"
                    flex="1"
                    textAlign="left"
                    className="text-[#004FC0] text-lg"
                  >
                    {item.title}
                  </Box>
                  <AccordionIcon color="#004FC0" />
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
