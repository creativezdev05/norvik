import Hero from './components/Hero'
import NavBar from './components/Navbar'
import About from './components/About'
import Features from './components/Features'
import Story from "./components/Story";
import Pipeline from "./components/Pipeline";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import ExplodedAnimation from './components/ExplodedAnimation';
const App = () => {
  return (
    <main className="relative min-h-screen w-full overflow-x-hidden">
      <NavBar />
      <Hero />
      <About />
      <Features />
      <Story />
      <Pipeline />
      {/* <ExplodedAnimation /> */}
      <Contact />
      <Footer />
    </main>
  );
};

export default App;
