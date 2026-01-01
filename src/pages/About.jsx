import StackedCards from "../components/StackedCards";

export default function About() {
  return (
    <section
      id="about"
      className="
      bg-black
        relative
        min-h-screen
        flex
        items-start
        justify-center
        overflow-hidden
        pt-24 md:pt-32
      "
    >
      <StackedCards />
    </section>
  );
}
