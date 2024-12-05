// app/textos/NoDisponible.js
import Header from "../../components/header";
import Footer from "../../components/footer";

export default function NoDisponible() {
  return (
    <div
      className="min-h-screen flex flex-col bg-cover bg-center"
      style={{
        backgroundImage: "url('/libr4.jpg')",
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundAttachment: "fixed",
      }}
    >
      <Header />

      <main className="flex-grow flex flex-col items-center justify-center px-4 md:px-8">
        <h1 className="text-4xl font-semibold text-white my-8">
          El libro no se encuentra disponible
        </h1>
        <p className="text-lg text-white">
          Lamentamos la inconveniencia, pero el PDF del libro no está disponible en este momento.
        </p>
      </main>

      <Footer />
    </div>
  );
}
