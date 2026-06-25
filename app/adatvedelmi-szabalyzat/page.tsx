"use client";

import Navbar from "@/components/pilistura/Navbar";
import Footer from "@/components/pilistura/Footer";

const SECTIONS = [
  {
    title: "1. Az adatkezelés célja",
    body: "A PilisTúra weboldal a nevezések, felhasználói profilok, eredmények, kapcsolattartás és a szolgáltatás biztonságos működtetése érdekében kezel személyes adatokat.",
  },
  {
    title: "2. Kezelt adatok köre",
    body: "A kezelt adatok közé tartozhat a név, email cím, telefonszám, választott útvonal, teljesítési eredmény, számlázási vagy fizetési információ, valamint a weboldal működéséhez szükséges technikai adatok.",
  },
  {
    title: "3. Jogalap",
    body: "Az adatkezelés jogalapja a felhasználó hozzájárulása, a szerződés teljesítése, jogi kötelezettség teljesítése, illetve a szolgáltató jogos érdeke a weboldal biztonságos üzemeltetéséhez.",
  },
  {
    title: "4. Adattovábbítás és szolgáltatók",
    body: "A szolgáltatás működtetéséhez külső szolgáltatók vehetők igénybe, például tárhely-, levelezési-, fizetési- vagy analitikai szolgáltatók. Az adatokat kizárólag a szükséges mértékben továbbítjuk.",
  },
  {
    title: "5. Megőrzési idő",
    body: "A személyes adatokat csak addig őrizzük meg, amíg az adatkezelés célja fennáll, illetve ameddig jogszabály vagy számviteli kötelezettség ezt előírja.",
  },
  {
    title: "6. Felhasználói jogok",
    body: "A felhasználó kérheti adataihoz való hozzáférést, azok helyesbítését, törlését, kezelésének korlátozását, valamint tiltakozhat az adatkezelés ellen. Hozzájárulás alapján kezelt adatok esetén a hozzájárulás bármikor visszavonható.",
  },
  {
    title: "7. Sütik",
    body: "A weboldal a működéshez szükséges sütiket, valamint a felhasználói élmény javítását szolgáló helyi tárolási megoldásokat használhat. A hozzájárulás elfogadását a böngésző helyi tárhelyében tároljuk.",
  },
  {
    title: "8. Kapcsolat",
    body: "Adatvédelmi kérdés esetén írj az info@pilistura.hu címre. A kérelmekre a jogszabályban meghatározott határidőn belül válaszolunk.",
  },
];

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main className="pt-24">
        <section className="bg-[#f6f0e4] px-4 py-14 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl">
            <p className="mb-3 font-heading text-xs font-bold uppercase tracking-[0.25em] text-accent">
              Adatvédelem
            </p>
            <h1 className="font-heading text-4xl font-bold uppercase tracking-wide sm:text-5xl">
              Adatvédelmi szabályzat
            </h1>
            <p className="mt-5 text-base leading-7 text-muted-foreground">
              Ez a tájékoztató összefoglalja, hogy a PilisTúra weboldal milyen adatokat kezel, milyen célból, és milyen jogok illetik meg a felhasználókat.
            </p>
          </div>
        </section>

        <section className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="space-y-8">
            {SECTIONS.map((section) => (
              <article key={section.title} className="border-b border-border pb-8">
                <h2 className="font-heading text-xl font-bold">{section.title}</h2>
                <p className="mt-3 leading-7 text-muted-foreground">{section.body}</p>
              </article>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
