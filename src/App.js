import React from "react";
import { observer, useLocalStore, useObserver } from "mobx-react";

const StoreContext = React.createContext();

const StoreProvider = ({ children }) => {
  const store = useLocalStore(() => ({
    bugs: ["Cricket", "LadyBug"],
    add: (newbug) => {
      store.bugs.push(newbug);
    },
    get bugsCount() {
      return store.bugs.length;
    },
  }));

  return (
    <StoreContext.Provider value={store}>{children} </StoreContext.Provider>
  );
};

// const BugsHeader = () => {
//   const store = React.useContext(StoreContext);
//   return useObserver(() => <h4>I'm aware of {store.bugsCount} bugs</h4>);
// };

// alternatively
const BugsHeader = observer(() => {
  const store = React.useContext(StoreContext);
  return <h4>I'm aware of {store.bugsCount} bugs</h4>;
});

const BugsList = () => {
  const store = React.useContext(StoreContext);
  return useObserver(() => (
    <ul>
      {store.bugs.map((bug) => (
        <li key={bug}>{bug}</li>
      ))}
    </ul>
  ));
};

const BugsInput = () => {
  const store = React.useContext(StoreContext);
  const [bug, setBug] = React.useState("");

  return (
    <>
      <input
        type="text"
        placeholder="add bug..."
        value={bug}
        onChange={(e) => {
          setBug(e.target.value);
        }}
      ></input>
      <button
        onClick={() => {
          store.add(bug);
          setBug("");
        }}
      >
        Submit
      </button>
    </>
  );
};

export default function App() {
  return (
    <StoreProvider>
      <main>
        <h1>Bugs!</h1>
        <BugsHeader />
        <BugsList />
        <BugsInput />
      </main>
    </StoreProvider>
  );
}
