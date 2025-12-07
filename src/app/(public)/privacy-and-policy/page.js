import Hero from "@/components/Hero";
import Packages from "@/views/home/Packages";

import Image from "next/image";
import { FaWhatsapp } from "react-icons/fa";
import { RiArrowRightLine, RiMailLine } from "react-icons/ri";

export const metadata = {
  title: "Hobi Holidays : Career",
  description:
    "Wujudkan mimpimu berkunjung ke negeri asing bersama Hobi Holidays",
};

export default function PrivacyAndPolicy() {
  const items = [
    { value: "a", title: "First Item", text: "Some value 1..." },
    { value: "b", title: "Second Item", text: "Some value 2..." },
    { value: "c", title: "Third Item", text: "Some value 3..." },
  ];

  return (
    <div className="flex flex-col gap-y-24 w-full">
      <Hero title="Privacy Policy" image={"/t&c.png"} />

      <div className="lg:px-24 md:px-12 px-4 flex flex-col gap-6">
        <h3 className="lg:text-3xl text-2xl font-bold text-blue-700">
          Informasi Pribadi yang Terkumpul
        </h3>
        <p className=" leading-loose">
          Hobi Holidays mengerti dan menghormati pentingnya privasi Anda. Dalam
          Kebijakan Privasi ini, kami akan menjelaskan bagaimana kami
          mendapatkan data tentang Anda dan rekam jejak Anda saat menggunakan
          website kami. Bagaimana cara kami mengolah data tersebut, kepada siapa
          data tersebut mungkin dikirim, dan bagaimana Anda bisa mengubah data
          yang sudah Anda berikan pada kami.
        </p>
        <p className=" leading-loose">
          Website www.hobiholidays.com mengumpulkan data pribadi Anda seperti
          nama, alamat, email, nomor telepon, dan nomor KTP. Informasi ini
          dibutuhkan untuk membuat, memproses, dan menyelesaikan pemesanan Anda.
        </p>
        <p className=" leading-loose">
          www.hobiholidays.com mungkin juga memproses data tentang perangkat
          komputer Anda, misalnya alamat IP, tipe browser, Unique Device
          Identifier (bagi pengguna yang mengakses layanan kami melalui ponsel),
          sistem operasi, versi aplikasi, dan garis lintang atau bujur lokasi
          Anda. Data ini biasanya bersifat anonim, tapi tetap saja dianggap data
          pribadi, baik secara tersendiri ataupun dikombinasikan bersama.
        </p>
        <p className=" leading-loose">
          Kami memerlukan data pribadi Anda dalam berbagai situasi dan
          ketentuan: Saat Anda mulai melakukan reservasi atau membeli sesuatu
          dari website kami serta melalui tim layanan pelanggan, antara lain via
          email, surat, faks, dan telepon. Saat Anda turut serta dalam survey
          untuk memberikan kami umpan balik.
        </p>
        <h5 className="text-xl text-blue-700">Penggunaan Data Pribadi</h5>
        <p className=" leading-loose">
          Hobi Holidays memastikan penggunaan informasi pribadi pengguna dan
          lokasinya adalah untuk mengoperasikan, mempertahankan, dan menyediakan
          kemudahan bagi pengguna dalam memaksimalkan fitur dan fungsi website
          serta layanan kami.
        </p>
        <p className=" leading-loose">
          Kami mungkin akan menggunakan data Anda untuk keperluan sebagai
          berikut:
        </p>
        <ul className="list-disc pl-6 space-y-2 ">
          <li>
            Untuk menyediakan layanan berkualitas tertinggi dan membantu Anda
            mengoptimalkan fungsi website kami.
          </li>
          <li>
            Untuk menyelesaikan proses pemesanan dan pembelian yang Anda buat
            melalui website kami, dan permintaan lain yang kami dapatkan dari
            Anda.
          </li>
          <li>
            Untuk menghubungi Anda apabila terdapat perubahan dalam dokumen
            perjalanan Anda, seperti perubahan jadwal terbang, penundaan, atau
            informasi penting lainnya mengenai perjalanan Anda.
          </li>
          <li>
            Untuk memberitahu Anda mengenai produk dan layanan kami, penawaran
            spesial, promosi, serta penawaran lainnya yang sekiranya menarik
            untuk Anda. Meskipun layanan ini mungkin memuat produk dari pihak
            ketiga dari waktu ke waktu, tapi pihak ketiga ini tidak akan
            menghubungi Anda langsung (kecuali Anda sendiri yang menghendaki).
          </li>
          <li>
            Dalam kasus di mana Anda membuat pemesanan dan kemudian membatalkan
            pesanan tersebut setelah memasukkan data pribadi, kami akan
            mengirimkan email kepada Anda untuk menyarankan Anda menghubungi
            pihak yang berwenang dalam masalah teknis. Atau untuk menyelesaikan
            pemesanan Anda, Anda dapat segera menghentikan informasi dalam email
            tersebut dengan mengeklik tautan berhenti berlangganan yang berada
            di bagian paling bawah email Anda.
          </li>
          <li>
            Untuk keperluan administrasi lainnya dan untuk analisis internal.
          </li>
          <li>
            Untuk berpartisipasi dalam survei kami dengan tujuan untuk
            mendapatkan umpan balik.
          </li>
        </ul>

        <h5 className="text-xl text-blue-700">
          Pilihan Anda Sehubungan dengan Pengumpulan dan Penggunaan Informasi
          Anda
        </h5>

        <p className=" leading-loose">
          Saat Anda melakukan reservasi perjalanan atau memilih untuk mengakses
          layanan yang kami sediakan, informasi yang bersifat wajib dan penting
          akan ditandai. Seperti yang dibahas di atas, Anda dapat memilih untuk
          tidak memberikan informasi yang diminta, tetapi akibatnya Anda mungkin
          tidak dapat menyelesaikan pemesanan atau mengakses layanan tersebut.
        </p>
        <p className=" leading-loose">
          Harap dicatat bahwa kami berhak untuk mengirimi Anda komunikasi lain,
          termasuk pengumuman layanan, pembaruan program loyalitas, pesan
          administratif, dan survei yang berkaitan dengan akun Anda atau
          transaksi Anda di website ini, tanpa menawarkan Anda kesempatan untuk
          tidak menerimanya.{" "}
        </p>
        <p className=" leading-loose">
          Bagian Bantuan (Help) yang terdapat pada browser Anda akan memberi
          tahu cara mencegah browser Anda menerima cookie baru, cara agar
          browser Anda memberi notifikasi saat Anda menerima cookie baru, atau
          cara menonaktifkan cookie. Harap dicatat bahwa jika Anda menolak untuk
          menerima cookie dari website ini, Anda tidak akan dapat mengakses
          bagian dari website kami.{" "}
        </p>

        <h5 className="text-xl text-blue-700">Kebijakan Cookies</h5>

        <p className=" leading-loose">
          www.hobiholidays.com menggunakan komponen yang sama dengan website
          sejenis untuk mengoperasikan Situs dan Layanannya. Kami menggunakan
          dua macam cookies, yaitu yang berbasis sekali pakai dalam satu sesi,
          dan cookies persisten, yang akan segera mengenali Anda sebagai
          pengguna situs Hobi Holidays dan Layanannya. Beberapa fitur dan fungsi
          layanan di website www.hobiholidays.com, memerlukan beberapa
          ketentuan, salah satunya browser Anda bisa menerima cookies.
        </p>

        <p className=" leading-loose">
          Sistem cookies berbasis sesi sekali pakai pada dasarnya bersifat
          temporer, dan akan terhapus begitu browser ditutup; sementara sistem
          cookies yang persisten akan terus mengingat data Anda kapan pun Anda
          mengunjungi website Hobi Holidays. Anda dapat mengatur browser untuk
          menolak cookies, atau mengindentifikasi cookies.{" "}
        </p>
        <p className=" leading-loose">
          Website www.hobiholidays.com juga menggunakan servernya untuk merekam
          berbagai informasi unik yang memungkinkan sistem mengenali browser
          yang digunakan pengguna. Sistem server akan mengumpulkan data, antara
          lain informasi yang berhubungan dengan apa yang Anda akses melalui
          web, alamat Internet Protocol (IP), halaman yang dilihat dan waktu
          yang digunakan selama mengakses, tipe browser dan bahasanya, jumlah
          klik, dan juga cookies yang mengindentifikasi browser Anda. Informasi
          ini hanya akan kami gunakan untuk keperluan analisa mengenai trend
          yang tengah berlangsung, dan tidak akan dihubungkan ke data informasi
          pribadi dalam bentuk apapun.{" "}
        </p>

        <h5 className="text-xl text-blue-700">Penggunaan Situs</h5>
        <p className=" leading-loose">
          Hobi Holidays mengontrol akses ke website dan memiliki hak penuh untuk
          sewaktu-waktu mengubah, memodifkasi, mengganti, menukar, menahan atau
          menghapus; untuk kepentingan keamanan atau dalam keadaan mendesak atau
          force majeure; tanpa pemberitahuan sebelumnya; serta memiliki
          kewajiban untuk mengganti kerugian atau membayar kompensasi kepada
          pengguna.
        </p>

        <p className=" leading-loose">
          Seorang pengguna hanya dapat menggunakan website kami untuk melakukan
          kegiatan yang legal dan sah dalam hal membuat pemesanan atau
          bertransaksi untuk diri sendiri dan atau orang lain yang memiliki
          kuasa untuk bertindak secara legal di mata hukum.{" "}
        </p>

        <p className=" leading-loose">
          Anak di bawah usia 18 tahun tidak memenuhi syarat untuk menggunakan
          layanan apapun di website kami.{" "}
        </p>

        <p className=" leading-loose">
          Pengguna dapat mengunduh salinan isi konten website ini untuk
          keperluan pribadi.{" "}
        </p>
        <p className=" leading-loose">
          Pengguna tidak boleh menghapus atau menghilangkan merk dagang, hak
          cipta, atau identitas kepemilikan lainnya.{" "}
        </p>
        <p className=" leading-loose">
          Pengguna tidak diperkenankan mengunduh, menyalin ulang, memodifikasi,
          menjual, memasarkan, atau mendistribusikan salah satu bagian atau
          seluruh konten yang ada di website www.hobiholidays.com tanpa
          persetujuan tertulis dari kami.{" "}
        </p>

        <p className=" leading-loose">Anda juga tidak diperkenankan untuk: </p>

        <ul className="list-disc pl-6 space-y-2 ">
          <li>
            Mengunggah, mengirim, atau mendistribusikan informasi apapun di
            website ini yang merupakan konten vulgar, merusak, illegal, bersifat
            menghina, dan melanggar hak orang lain.
          </li>
          <li>
            Melakukan percobaan pemalsuan atau penipuan dalam membuat pemesanan
            dan melakukan transaksi keuangan tak berizin.
          </li>
          <li>
            Menggunakan dalam bentuk apapun; perangkat lunak, peralatan atau
            melakukan percobaan pengunggahan file dengan data perusak dan/atau
            mengandung virus yang akan mengganggu operasional atau fungsi dari
            website, atau merusak tatanan tampilan website ini secara
            keseluruhan.
          </li>
          <li>
            Hobi Holidays memegang hak penuh untuk menolak akses menuju website
            dan/atau membatalkan pemesanan kapan saja dan dimana saja, jika ada
            pengguna yang mencoba untuk melanggar batas ketentuan yang telah
            ditetapkan dalam kebijakan ini.
          </li>
        </ul>

        <h5 className="text-xl text-blue-700">Perubahan Kebijakan</h5>

        <p className=" leading-loose">
          Kami berhak kapan saja untuk mengubah bagaimana kami menggunakan
          cookie dan bagaimana kami mengumpulkan, meneruskan, dan memproses data
          pribadi Anda serta informasi serupa lain yang kami anggap penting.
          Karena itu kebijakan ini bisa diubah dari waktu ke waktu untuk
          mencerminkan perubahan terakhirnya.
        </p>

        <h5 className="text-xl text-blue-700">Pertanyaan</h5>

        <p className=" leading-loose">
          Jika terdapat pertanyaan silakan hubungi kami pada kontak yang tertera
          di bawah ini.
        </p>
      </div>
    </div>
  );
}
