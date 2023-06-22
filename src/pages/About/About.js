import "./About.css";
import Banner from "../../components/Banner/Banner";
import logo from "../../utils/assets/logo.png";
import Footer from "../../components/Footer/Footer";
import Navbar from "../../components/Navbar/Navbar";
import SupportEngine from "../../SupportEngine";
import image from "../../utils/assets/about-image.png"

const About = () => {
  const isLoged = localStorage.getItem("isLoged");

  return (
    <div className="about">
      <Navbar />
      <Banner image={image}/>
      <div className="aboutContent">
        <img src={logo} alt="" className="aboutLogo" />
        <div className="aboutText">
          <p>
            Uptown Gown adalah sebuah perusahaan keluarga yang berdomisili di
            Medan, Sumatera Utara yang bergerak di bidang rental dan custom
            dress. Didirikan oleh ibu dan kedua anak perempuannya, Uptown Gown
            berdiri sejak tahun 2020 atas motivasi dari hobi pemilik Uptown Gown
            sendiri, yang merupakan designer profesional yang telah menempuh
            bidang ini selama bertahun-tahun dan juga berpengalaman besar dalam
            pembelajaran bidang fashion design yang juga tentunya akan membantu
            Anda semua dalam memilih design, bakal kain dan semua proses hingga
            dress siap untuk dipakai.
          </p>
          <p>
            Melayani dan menjadi bagian dari hari penting Anda adalah
            kebahagiaan bagi kami. Kami sangat senang apabila kami dapat
            memperkenalkan dress sampai cheongsam Uptown Gown dan melihat Anda
            memakainya di hari bahagia Anda.
          </p>
        </div>
      </div>
      <div class="faq-grid-container">
        <div>
          <p>
            <b>Kapan Uptown Gown buka?</b>
          </p>
          <p>
            Uptown Gown buka jam 11 siang sampai 5 sore setiap hari senin-sabtu
            dan jam 2 siang sampai 6 sore setiap hari minggu.
          </p>
        </div>
        <div>
          <p>
            <b>Kapan saya harus membuat appointment?</b>
          </p>
          <p>
            Kami menerima reservasi berbulan-bulan sebelumnya, jadi kami
            menyarankan untuk membuat appointment lebih awal!
          </p>
        </div>
        <div>
          <p>
            <b>
              Apakah saya harus membersihkan gaun yang di-rent setelah acara?
            </b>
          </p>
          <p>
            Kamu tidak perlu membersihkan gaunnya! Kami membersihkan setiap gaun
            setelah setiap penyewaan dengan sangat hati-hati sehingga siap
            dipakai untuk penyewaan berikutnya.
          </p>
        </div>
        <div>
          <p>
            <b>
              Kapan saya akan mendapatkan kembali deposit yang saya berikan?
            </b>
          </p>
          <p>
            Kami akan mengembalikan deposit kamu pada saat yang sama ketika gaun
            itu dikembalikan ke toko kami dengan tepat waktu dan dalam kondisi
            baik.
          </p>
        </div>
        <div>
          <p>
            <b>Apa yang terjadi jika gaun rusak?</b>
          </p>
          <p>
            Jika kamu merusak gaun rent, kami akan membuat perkiraan nilai
            kerusakan dan membebankan biaya kerusakan dari uang deposit sewa.
          </p>
        </div>
        <div>
          <p>
            <b>
              Jika desain gaun custom yang saya pesan kurang memuaskan, apakah
              saya bisa mengubahnya?
            </b>
          </p>
          <p>
            Selama proses pengerjaan gaun custom, kamu diperbolehkan mengajukan
            perubahan kami akan melakukan revisi sesuai permintaan kamu,. Namun
            jika perubahan telah dilakukan 3 kali, maka revisi selanjutnya akan
            dikenakan denda.
          </p>
        </div>
      </div>
      <iframe
        title="map"
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3981.986671869443!2d98.63903637483689!3d3.590531396383605!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30312f4bb66d1b39%3A0x9bc4d57f13ef496a!2sUpTownGown!5e0!3m2!1sen!2sid!4v1683898314236!5m2!1sen!2sid"
        width="100%"
        height="600"
        style={{ border: 0 }}
        allowfullscreen=""
        loading="lazy"
        referrerpolicy="no-referrer-when-downgrade"
      ></iframe>
      <Footer />
      {isLoged === "true" ? <SupportEngine /> : ""}
    </div>
  );
};

export default About;
