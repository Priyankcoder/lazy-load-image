import "./styles.css";
import LazyLoadHook, { Image } from "./LazyLoadHook";

export default function App() {
  LazyLoadHook();
  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <h2>Start editing to see some magic happen!</h2>
      {[...new Array(10)].map((_, idx) => (
        <Image src="https://picsum.photos/200" key={idx} alt="image" />
      ))}
    </div>
  );
}
