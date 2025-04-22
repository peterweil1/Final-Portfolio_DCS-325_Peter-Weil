import Head from "next/head";
import { Geist, Geist_Mono } from "next/font/google";
import ResumeHeader from "@/components/ResumeHeader";
import Experience from "@/components/Experience";
import Education from "@/components/Education";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import ResumeFooter from "@/components/ResumeFooter";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function Home() {
  return (
    <div className={`${geistSans.className} ${geistMono.className}`}>
      <Head>
        <title>Peter Weil | Resume</title>
        <meta
          name="description"
          content="Resume for Peter Weil, Software Engineer"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Skip to content link for keyboard users */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:p-4 focus:bg-primary focus:text-primary-foreground focus:outline-none focus:ring-2 focus:ring-offset-2"
      >
        Skip to content
      </a>

      <div className="container mx-auto py-8 px-4">
        <ResumeHeader />

        <main id="main-content" tabIndex={-1}>
          <div className="row">
            <div className="col-lg-8">
              <Experience />
              <Projects />
            </div>
            <div className="col-lg-4">
              <Education />
              <Skills />
            </div>
          </div>
        </main>

        <ResumeFooter />
      </div>
    </div>
  );
}
